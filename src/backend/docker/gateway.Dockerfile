FROM python:3.10-alpine

WORKDIR /gateway

COPY ./backend/src/gateway_service /gateway
COPY ./backend/config.yaml /gateway
COPY ./backend/src/requirements.txt /gateway

RUN pip3.10 install -r requirements.txt

EXPOSE 8880

CMD ["python3", "app/main.py"]
