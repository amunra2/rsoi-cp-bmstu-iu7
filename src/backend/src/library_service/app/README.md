# Сервис библиотек

## Задача

1. Работа с библиотеками
2. Работа с книгами
3. Связь книг и библиотек

## Авторизация

Чтобы добавить в этот сервис авторизацию:

1. Создаются следующие файлы (все они, кроме констант, не привязаны к сервису, то есть одинаковы на каждом сервисе):
  * **enums**
    * *enums.py* - необходимые енумы
  * **schemas**
    * *api_response.py* - ответы для документации swagger
      <details>
      <summary> Важное уточнение об изменении </summary>

      > УТОЧНЕНИЕ: данный файл подменяет файл *enums/responses.py* единым классом **ApiResponses** ответов документации.
      > Нужен для упрощения кода, путем замены енумов на один общий класс, которму передается имя домена из енума
      > **DomainEnum** из файла *enums/enums.py*. 
      > 
      > Если нет желания использовать данный класс, то можно в 
      > существующее решение добавить следующие ответы:
      > * *not_authorized* (использовать готовый класс ответа **NotAuthorizedResponse**)
      > * *forbidden* (использовать готовый класс ответа **ForbiddenResponse**)
      >
      > Далее будет описываться с учетом класса **ApiResponses**, но глобально это ни на что не повлияет

      </details>
      <br/>

    * *user.py* - класс пользователя, который получается при декодировании токена авторизации
  * **utils**
    * *addons.py* - вспомогательные функции
    * *api_requests.py* - отправить запросы - есть только гет, больше не нужно (нужен для получения **jwks** из сервиса авторизации)
    * *auth_user.py* - получения пользователя из токена, а также проверка роли
    * *consts.py* - константы, которые используются в файле настроек
    * *jwt.py* - декодирование токена авторизации
    * *validate.py* - отлов ошибок при валидации токена авторизации

2. Изменяются следующие файлы:
  * **enums**
    * *responses.py* (УДАЛЕН) - подробнее выше
  * **exceptions**
    * *http.py* - добавить ошибки:
      * *NotAuthorizedException*
      * *BadRequestException*
      * *ServiceUnavailableException*
      * *InvalidRequestException*
  * **routers**
    * *domain.py* = *library.py* | *book.py* | *library_book.py*:
      1. Обязательные изменения:
          1. Для проверки роли пользователя в каждый метод роутера (контроллера) добавляется в параметрах следующая строка:
          ```python
          _: bool = Depends(RoleChecker(allowed_roles=[RoleEnum.USER, RoleEnum.MODERATOR, ...])),
          ```
          Вызывается класс **RoleChecker**, которому передаются роли, с которыми пользователи могут воспользоваться данным методом, иначе код ответа **403**
          > УТОЧНЕНИЕ: На роль **RoleEnum.ADMIN** проверять не нужно, так как админ по умолчанию имеет доступ ко всему
          
          2. В параметр *responses* переменной **router** передать следующие два ответа для документации swagger (класс **ApiResponses**, смотретьч выше):
          ```python
            status.HTTP_401_UNAUTHORIZED: ApiResponses.not_authorized(DomainEnum.BOOK),
            status.HTTP_403_FORBIDDEN: ApiResponses.forbidden(DomainEnum.BOOK),
          ```

      2. Необязательные изменения (были проведены в данном сервисе, могут быть пропущены):
          1. Заменить все остальные *responses* ответы документации **swagger** на класс **ApiResponses** (обязательно, если было решено использовать его)
          2. Вынести параметры *db* и *domainCRUD* в отдельную функцию и получать непосредственно сервис:
              ```python
              def get_domain_service(
                domain_crud: Annotated[DomainCRUD, Depends(get_domain_crud)],
                db: Annotated[Session, Depends(get_db)],
              ) -> DomainService:
                return DomainService(
                  domainCRUD=domain_crud,
                  db=db,
                )
              ```
              И использовать его в параметрах каждого метода роутера (соответственно, вызывать методы данной переменной):
              ```python
              domain_service: Annotated[DomainService, Depends(get_domain_service)],
              ```
          3. Для декоратора методов контроллера добавить четко *path* для путей
          4. Заменить безымянные респонсы на готовые классы из файла [*schemas/response.py*](./schemas/response.py)
          5. В схемы вынесены параметры фильтрации

  * **schemas**
    * *domain.py* = *library.py* | *book.py* | *library_book.py* (необязательные изменения):
      1. Можно убрать **warnings** от *constr* и *conint*, добавив **Annotated**:
      ```python
      field: Annotated[str, constr(max_length=255)]
      ```
    * *response.py* (необязательные изменения)
        1. Добавлены классы ответов для **return** в методах роутера (контроллера)

  * **utils**
    * *database.py* (необязательные изменения):
      1. Функция получения строки бд перенесена из файла *utils/settings.py* в данный и при этом переписана (переписать ее обязательно, настройки получаются по-другому)

    * *settings.py* (обязательные изменения):
      1. Новые настройки

  * *main.py* (обязательные изменения):
    1. Получение настроек
    ```python
    settings = get_settings()
    ```

    2. Запуск сервиса, получая новые настройки:
    ```python
    uvicorn.run(
      "main:app", 
      host=settings.options.service.host,
      port=settings.options.service.port,
      log_level=settings.options.service.log_level,
      reload=settings.options.service.reload,
    )
    ```

  * *config.yml* (обязательные изменения)Ж
    1. Поле *kid* (айди ключа **jwks**) в настройках сервиса авторизации (будет нужно всем сервисам)

***
[@amunra2](https://t.me/amunra2), 2024
