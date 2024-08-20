import json
from typing import Annotated, List
from uuid import UUID
from fastapi import APIRouter, Body, Depends, Query, Response, status
from pydantic import ValidationError
from sqlalchemy.orm import Session
from fastapi.security import (
  HTTPAuthorizationCredentials,
  HTTPBearer,
  OAuth2PasswordBearer,
)

from exceptions.http import ForbiddenException, NotAuthorizedException, BadRequestException
from service.user import UserService
from repository.user import UserRepository
from schemas.api_responses import ApiResponses
from dto.user import (
  JWKSResponse,
  UserLoginDto,
  UserPaginationResponse,
  UserPayloadDto,
  UserRefreshDto,
  UserResponse,
  UserCreateDto,
  UserUpdateDto,
  UserFilterDto,
  TokenInfo
)
from utils.database import get_db
from schemas.response import CreatedResponse, NoContentResponse
from utils.enums import DomainEnum, RoleEnum

from utils.addons import get_current_user, RoleChecker

def get_user_repository() -> UserRepository:
  return UserRepository

def get_user_service(
  db: Annotated[Session, Depends(get_db)],
  userRepository: Annotated[UserRepository, Depends(get_user_repository)],
) -> UserService:
  return UserService(
    userRepository=userRepository,
    db=db,
  )

controller = APIRouter(
  prefix="/user",
  tags=["User REST API"],
  responses={
    status.HTTP_400_BAD_REQUEST: ApiResponses.invalid_data(DomainEnum.USER),
  },
)

@controller.post(
  path="/login/",
  status_code=status.HTTP_200_OK,
  response_model=TokenInfo,
)
async def auth_user_issue_jwt(
  userService: Annotated[UserService, Depends(get_user_service)],
  login_model: Annotated[UserLoginDto, Body()],
):
  return await userService.auth_user(
    login_dto=login_model,
  )
  
@controller.post(
  path="/register/",
  status_code=status.HTTP_201_CREATED,
  response_model=TokenInfo,
)
async def register_user(
  userService: Annotated[UserService, Depends(get_user_service)],
  user_create: UserCreateDto,
) -> TokenInfo:
  return await userService.register_user(
    user_create=user_create,
  )

@controller.post(
  path="/refresh/",
  status_code=status.HTTP_200_OK,
  response_model=TokenInfo,
)
async def refresh_user_token(
  userService: Annotated[UserService, Depends(get_user_service)],
  user_refresh: Annotated[UserRefreshDto, Body()],
) -> TokenInfo:
  return await userService.refresh_user_token(
    refresh_token=user_refresh.refresh_token,
    scope=user_refresh.scope,
  )
  
@controller.get(
  path="/.well-known/jwks.json", # принято использовать такой урл,
  status_code=status.HTTP_200_OK,
  response_model=JWKSResponse,
)
async def get_jwks(
  user_service: Annotated[UserService, Depends(get_user_service)],
):
  return await user_service.get_jwks()
  
@controller.get(
  path="/me/",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def get_me(
  userService: Annotated[UserService, Depends(get_user_service)],
  user: UserPayloadDto = Depends(get_current_user),
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.USER, RoleEnum.MODERATOR])),
) -> UserResponse:
  return await userService.get_by_uuid(
    uuid=user.sub,
  )
  
@controller.patch(
  path="/me/",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def update_me(
  userService: Annotated[UserService, Depends(get_user_service)],
  user_patch: UserUpdateDto,
  user: UserPayloadDto = Depends(get_current_user),
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.USER, RoleEnum.MODERATOR])),
) -> UserResponse:
  return await userService.patch(
    uuid=user.sub,
    user_patch=user_patch,
  )

@controller.get(
  path="/",
  status_code=status.HTTP_200_OK,
  response_model=UserPaginationResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.get_all(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  }
)
async def get_all_users(
  userService: Annotated[UserService, Depends(get_user_service)],
  filter: UserFilterDto = Depends(),
  page: Annotated[int, Query(ge=1)] = 1,
  size: Annotated[int, Query(ge=1)] = 100,
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.MODERATOR])),
) -> UserPaginationResponse:
  return await userService.get_all(
    filter=filter,
    page=page,
    size=size,
  )

@controller.get(
  path="/{uuid}",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.get_by_uuid(DomainEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def get_user_by_uuid(
  userService: Annotated[UserService, Depends(get_user_service)],
  uuid: UUID,
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.MODERATOR]))
) -> UserResponse:
  return await userService.get_by_uuid(
    uuid=uuid,
  )

@controller.post(
  path="/",
  status_code=status.HTTP_201_CREATED,
  response_class=Response,
  responses={
    status.HTTP_201_CREATED: ApiResponses.create(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def create_user(
  userService: Annotated[UserService, Depends(get_user_service)],
  user_create: UserCreateDto,
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.ADMIN])),
) -> UserResponse:
  user = await userService.create(
    user_create=user_create,
  )
  return CreatedResponse(
    domain=DomainEnum.USER,
    id=user.uuid,
  )

@controller.patch(
  path="/{uuid}",
  status_code=status.HTTP_200_OK,
  response_model=UserResponse,
  responses={
    status.HTTP_200_OK: ApiResponses.patch(DomainEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def update_user(
  userService: Annotated[UserService, Depends(get_user_service)],
  uuid: UUID,
  user_patch: UserUpdateDto,
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.ADMIN])),
) -> UserResponse:
  return await userService.patch(
    uuid=uuid,
    user_patch=user_patch,
  )
  
@controller.delete(
  path="/{uuid}",
  status_code=status.HTTP_204_NO_CONTENT,
  response_class=Response,
  responses={
    status.HTTP_204_NO_CONTENT: ApiResponses.delete(DomainEnum.USER),
    status.HTTP_404_NOT_FOUND: ApiResponses.not_found(DomainEnum.USER),
    status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.USER),
    status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.USER),
  },
)
async def delete_user(
  userService: Annotated[UserService, Depends(get_user_service)],
  uuid: UUID,
  _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.ADMIN])),
) -> None:
  await userService.delete(
    uuid=uuid,
  )

  return NoContentResponse()
