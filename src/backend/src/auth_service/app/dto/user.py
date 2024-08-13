from typing import Annotated, List
from uuid import UUID
from fastapi import Query
from pydantic import BaseModel, ConfigDict, conint, constr, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber

PhoneNumber.phone_format = 'E164' # чтобы не было в возврате приписки 'tel:'

class UserBaseDto(BaseModel):
  login: Annotated[str, constr(max_length=255)]
  email: EmailStr
  phone: PhoneNumber

class UserFilterDto(UserBaseDto):
  login: Annotated[str, Query(max_length=255)] | None = None
  email: Annotated[str, Query(max_length=255)] | None = None
  phone: Annotated[str, Query(max_length=64)] | None = None

class UserCreateDto(UserBaseDto):
  login: Annotated[str, constr(max_length=255)] | None = None
  email: EmailStr | None = None
  phone: PhoneNumber | None = None

class UserUpdateDto(UserBaseDto):
  login: Annotated[str, constr(max_length=255)] | None = None
  email: EmailStr | None = None
  phone: PhoneNumber | None = None

class UserDto(UserBaseDto):
  id: Annotated[int, conint(ge=1)]
  uuid: UUID

class UserResponse(UserBaseDto):
  # model_config = ConfigDict(from_attributes=True) зачем-то добавил и забыл зачем ???
  
  uuid: UUID

class UserPaginationResponse(BaseModel):
  page: Annotated[int, conint(ge=1)]
  pageSize: Annotated[int, conint(ge=1)]
  totalElements: Annotated[int, conint(ge=0)]
  items: List[UserResponse]
