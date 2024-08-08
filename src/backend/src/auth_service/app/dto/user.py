from typing import Annotated
from pydantic import BaseModel, constr, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber


class UserBaseDto(BaseModel):
  login: Annotated[str, constr(max_length=255)]
  email: EmailStr
  phone: PhoneNumber

class UserFilterDto(UserBaseDto):
  login: Annotated[str, constr(max_length=255)] | None = None
  email: EmailStr | None = None
  phone: PhoneNumber | None = None
