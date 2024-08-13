from typing import List, Union
from uuid import UUID
from sqlalchemy.orm import Session, Query

from model.user import UserModel
from dto.user import UserFilterDto, UserUpdateDto
from utils.addons import escape_like, ilike_search


class UserRepository:
  def __init__(self, db: Session):
    self._db = db

  async def get_all(
      self,
      filter: UserFilterDto,
      offset: int = 0,
      limit: int = 100,
  ) -> List[Union[List[UserModel], int]]:
    query = self._db.query(UserModel)
    query = await self.__filter_users(query, filter)
    total = query.count()

    return query.offset(offset).limit(limit).all(), total
  
  async def get_by_uuid(self, uuid: UUID) -> UserModel | None:
    return self._db.query(UserModel).filter(UserModel.uuid == uuid).first()
  
  async def create(self, model: UserModel) -> UserModel | None:
    try:
      self._db.add(model)
      self._db.commit()
      self._db.refresh(model)
    except:
      return None
    
    return model
  
  async def update(self, model: UserModel, model_update: UserUpdateDto) -> UserModel | None:
    model_updated_fileds = model_update.model_dump(exclude_unset=True)
    for key, value in model_updated_fileds.items():
      setattr(model, key, value)

    return await self.create(model)
  
  async def delete(self, model: UserModel) -> UserModel:
    self._db.delete(model)
    self._db.commit()
    
    return model

  async def __filter_users(
      self,
      query: Query[UserModel],
      filter: UserFilterDto,
  ) -> Query[UserModel]:
    if filter.login:
      query = query.filter(UserModel.login.ilike(ilike_search(filter.login)))

    if filter.email:
      query = query.filter(UserModel.email.ilike(ilike_search(filter.email)))
    
    if filter.phone:
      query = query.filter(UserModel.phone.ilike(ilike_search(filter.phone)))

    return query
