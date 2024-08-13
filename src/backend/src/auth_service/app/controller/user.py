from typing import Annotated
from uuid import UUID
from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session


from consts import DomainsEnum
from service.user import UserService
from repository.user import UserRepository
from enums.responses import ApiResponses
from dto.user import UserPaginationResponse, UserResponse, UserCreateDto, UserUpdateDto, UserFilterDto
from utils.database import get_db


def get_user_repository() -> UserRepository:
  return UserRepository

controller = APIRouter(
  prefix="/user",
  tags=["User REST API"],
  responses={
    status.HTTP_400_BAD_REQUEST: ApiResponses.invalid_data(DomainsEnum.USER),
  },
)

@controller.get(
  path="/",
  status_code=status.HTTP_200_OK,
  response_model=UserPaginationResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.get_all(DomainsEnum.USER)
  }
)
async def get_all_users(
  db: Annotated[Session, Depends(get_db)],
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
  filter: UserFilterDto = Depends(),
  page: Annotated[int, Query(ge=1)] = 1,
  size: Annotated[int, Query(ge=1)] = 100,
) -> UserPaginationResponse:
  return await UserService(
    userRepository=userRepository,
    db=db,
  ).get_all(
    filter=filter,
    page=page,
    size=size,
  )

@controller.get(
  path="/{uuid}",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.get_by_uuid(DomainsEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainsEnum.USER),
  },
)
async def get_user_by_uuid(
  db: Annotated[Session, Depends(get_db)],
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
  uuid: UUID,
) -> UserResponse:
  return await UserService(
    userRepository=userRepository,
    db=db,
  ).get_by_uuid(
    uuid=uuid,
  )

@controller.post(
  path="/",
  status_code=status.HTTP_201_CREATED,
  response_class=Response,
  responses={
    status.HTTP_201_CREATED: ApiResponses.create(DomainsEnum.USER),
  },
)
async def create_user(
  db: Annotated[Session, Depends(get_db)],
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
  user_create: UserCreateDto,
) -> UserResponse:
  user = await UserService(
    userRepository=userRepository,
    db=db,
  ).create(
    user_create=user_create,
  )

  return Response( # TODO
    status_code=status.HTTP_201_CREATED,
    headers={"Location": f"/api/v1/user/{user.uuid}"}     
  )


@controller.patch(
  path="/{uuid}",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.patch(DomainsEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainsEnum.USER),
  },
)
async def update_user(
  db: Annotated[Session, Depends(get_db)], # TODO
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
  uuid: UUID,
  user_patch: UserUpdateDto,
) -> UserResponse:
  return UserService(
    userRepository=userRepository,
    db=db,
  ).patch(
    uuid=uuid,
    user_patch=user_patch,
  )

@controller.delete(
  path="/{uuid}",
  status_code=status.HTTP_204_NO_CONTENT,
  response_class=Response,
  responses={
    status.HTTP_204_NO_CONTENT: ApiResponses.delete(DomainsEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainsEnum.USER),
  },
)
async def delete_user(
  db: Annotated[Session, Depends(get_db)],
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
  uuid: UUID,
) -> None:
  await UserService(
    userRepository=userRepository,
    db=db,
  ).delete(
    uuid=uuid,
  )

  return Response( # TODO
    status_code=status.HTTP_204_NO_CONTENT,
  )
