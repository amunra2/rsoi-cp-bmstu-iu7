from sqlalchemy.orm import Session
from uuid import UUID

from model.user import UserModel
from exceptions.http import NotFoundException, ConflictException
from dto.user import UserCreateDto, UserFilterDto, UserPaginationResponse, UserResponse, UserUpdateDto
from repository.user import UserRepository


class UserService():
  def __init__(self, userRepository: UserRepository, db: Session):
    self._userRepository: UserRepository = userRepository(db)

  async def get_all(
      self,
      filter: UserFilterDto,
      page: int = 1,
      size: int = 100
  ) -> UserPaginationResponse:
    users, totalItems = await self._userRepository.get_all(
      filter=filter,
      offset=(page - 1) * size,
      limit=size,
    )
    
    usersResponse = [UserResponse.model_validate(user, from_attributes=True) for user in users]
  
    return UserPaginationResponse(
      page=page,
      pageSize=size,
      totalElements=totalItems,
      items=usersResponse
    )
  
  async def get_by_uuid(
      self,
      uuid: UUID
  ) -> UserResponse:
    user = await self._userRepository.get_by_uuid(uuid)
    if user is None:
      raise NotFoundException(prefix="get user")
    
    return UserResponse.model_validate(user, from_attributes=True)
  
  async def create(
      self,
      user_create: UserCreateDto,
  ) -> UserResponse:
    user = await self._userRepository.create(
      UserModel(**user_create.model_dump())
    )
    if user is None:
      raise ConflictException(prefix="create user")
    
    return user
  
  async def patch(
      self,
      uuid: UUID,
      user_patch: UserUpdateDto
  ) -> UserResponse:
    user = await self._userRepository.get_by_uuid(uuid)
    if user is None:
      raise NotFoundException(prefix="patch user")
    
    user = await self._userRepository.update(user, user_patch)
    if user is None:
      raise ConflictException(prefix="patch user")
    
    return user
  
  async def delete(
      self,
      uuid: UUID
  ) -> UserResponse:
    user = await self._userRepository.get_by_uuid(uuid)
    if user is None:
      raise NotFoundException(prefix="delete user")
    
    return await self._userRepository.delete(user)
