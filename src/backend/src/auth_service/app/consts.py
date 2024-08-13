# Prefix/Suffix
from enum import Enum


DB_SUFFIX="_db"

# Settings
SERVICES="services"
AUTH="auth"
HOST="host"
PORT="port"
LOG_LEVEL="log_level"
RELOAD="reload"
DATABASES="databases"
USER="user"
PASSWORD="password"
DB_NAME="db"

# Domain
class DomainsEnum(Enum):
  USER="User"
  
  @classmethod
  def has_value(cls, value):
      return value in cls._value2member_map_
