from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from utils.settings import Settings


def construct_db_url():
  return f"postgresql://{Settings.database.user}:"\
                      f"{Settings.database.password}@"\
                      f"{Settings.database.host}:"\
                      f"{Settings.database.port}/"\
                      f"{Settings.database.db_name}"

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

def create_tables():
  Base.metadata.create_all(bind=Engine)


Engine = create_engine(
  url = construct_db_url()
)

SessionLocal = sessionmaker(
  autocommit=False,
  autoflush=False,
  bind=Engine,
)

Base = declarative_base()
