from typing import List
from uuid import UUID
from sqlalchemy.orm import Session, Query

from model.user import UserModel
from dto.user import UserFilterDto
from utils.utils import partialSearch


class UserRepository:
  def __init__(self, db: Session):
    self._db = db

  async def get_all(
      self,
      filter: UserFilterDto,
      offset: int = 0,
      limit: int = 100,
  ) -> List[List[UserModel], int]:
    query = self._db.query(UserModel)
    query = await self.__filter_users(query, filter)
    total = query.count()

    return query.offset(offset).limit(limit).all(), total
  
  async def get_by_uid(self, uuid: UUID) -> UserModel | None:
    return self._db.query(UserModel).filter(UserModel.uuid == uuid).first()

  async def __filter_users(
      self,
      query: Query[UserModel],
      filter: UserFilterDto,
  ) -> Query[UserModel]:
    if filter.login:
      query = query.filter(UserModel.login == partialSearch(filter.login))

    if filter.email:
      query = query.filter(UserModel.email == partialSearch(filter.email))
    
    if filter.phone:
      query = query.filter(UserModel.phone == partialSearch(filter.phone))

    return query
