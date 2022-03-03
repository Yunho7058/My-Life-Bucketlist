FROM python:3.10.2-alpine

WORKDIR /server

# mysqlclient 설치를 위한 step
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev libc-dev libffi-dev \
    && apk add --no-cache mariadb-dev

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir -r /server/requirements.txt

# mysqlclient 설치 후 build-deps 삭제
RUN apk del build-deps

COPY ./app /server/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
