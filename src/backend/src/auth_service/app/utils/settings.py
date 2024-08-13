from pydantic import BaseModel
from yaml import safe_load
from utils.consts import *

CONFIG_PATH = "config.yaml"


class ServiceSettings(BaseModel):
  host: str = None
  port: int = None
  log_level: str = None
  reload: bool = None


class DatabaseSettings(BaseModel):
  user: str = None
  password: str = None
  host: str = None
  port: int = None
  db_name: str = None
  
  
class SettingOptions(BaseModel):
  service: ServiceSettings = ServiceSettings()
  database: DatabaseSettings = DatabaseSettings()


class Settings():
  options: SettingOptions = SettingOptions()

  def __init__(self, config_name: str=CONFIG_PATH):
    with open(config_name, 'r') as f:
      data = safe_load(f)

    try:
      currentServiceData = data[SERVICES][AUTH]
      Settings.options.service.host = currentServiceData[HOST]
      Settings.options.service.port = currentServiceData[PORT]
      Settings.options.service.log_level = currentServiceData[LOG_LEVEL]
      Settings.options.service.reload = currentServiceData[RELOAD]

      currentDatabaseData = data[DATABASES][AUTH+DB_SUFFIX]
      Settings.options.database.user = currentDatabaseData[USER]
      Settings.options.database.password = currentDatabaseData[PASSWORD]
      Settings.options.database.host = currentDatabaseData[HOST]
      Settings.options.database.port = currentDatabaseData[PORT]
      Settings.options.database.db_name = currentDatabaseData[DB_NAME]
    except KeyError as e:
      print(f"SETTINGS: no argument {e}")
    else:
      Settings.__log()
      
  def __log():
    print(f"\n{Settings.options.model_dump_json(indent=2)}\n")
    
    
settings = Settings() # TODO: 2 раза при первом запуске
