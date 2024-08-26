FROM python:3.10-alpine

WORKDIR /auth

COPY ./src/auth_service /auth
COPY ../config.yaml /auth
COPY ./src/requirements.txt /auth

RUN pip3.10 install -r requirements.txt

EXPOSE 8888

CMD ["python3", "app/main.py"]
