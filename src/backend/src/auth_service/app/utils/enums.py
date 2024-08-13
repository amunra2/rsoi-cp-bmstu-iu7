from enum import Enum

class DomainEnum(Enum):
  USER="User"
  
  @classmethod
  def has_value(cls, value):
    return value in cls._value2member_map_
