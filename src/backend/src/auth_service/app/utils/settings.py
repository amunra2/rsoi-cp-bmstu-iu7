from yaml import safe_load
from consts import *

CONFIG_PATH = "config.yaml"


class ServiceSettings:
  host = None
  port = None
  log_level = None
  reload = None


class DatabaseSettings:
  user = None
  password = None
  host = None
  port = None
  db_name = None


class Settings:
  service: ServiceSettings = ServiceSettings
  database: DatabaseSettings = DatabaseSettings

  @staticmethod
  def log():
     print(f"Setted settings:\
           \n- Service:\
           \n--- {HOST}={Settings.service.host}\
           \n--- {PORT}={Settings.service.port}\
           \n--- {LOG_LEVEL}={Settings.service.log_level}\
           \n--- {RELOAD}={Settings.service.reload}\
           \n- Database:\
           \n--- {HOST}={Settings.database.host}\
           \n--- {PORT}={Settings.database.port}\
           \n--- {USER}={Settings.database.user}\
           \n--- {PASSWORD}={Settings.database.password}\
           \n--- {DB_NAME}={Settings.database.db_name}\
           ")

  @staticmethod
  def set(config_name: str=CONFIG_PATH):
    with open(config_name, 'r') as f:
        data = safe_load(f)

    try:
      currentServiceData = data[SERVICES][AUTH]
      Settings.service.host = currentServiceData[HOST]
      Settings.service.port = currentServiceData[PORT]
      Settings.service.log_level = currentServiceData[LOG_LEVEL]
      Settings.service.reload = currentServiceData[RELOAD]

      currentDatabaseData = data[DATABASES][AUTH+DB_SUFFIX]
      Settings.database.user = currentDatabaseData[USER]
      Settings.database.password = currentDatabaseData[PASSWORD]
      Settings.database.host = currentDatabaseData[HOST]
      Settings.database.port = currentDatabaseData[PORT]
      Settings.database.db_name = currentDatabaseData[DB_NAME]
      
    except KeyError as e:
      print(f"SETTINGS: no argument {e}")
    else:
      Settings.log()
