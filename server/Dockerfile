FROM python:3.10.2-alpine

WORKDIR /server

# mysqlclient 설치를 위한 step
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev openssl-dev libc-dev libffi-dev py3-cparser \
    && apk add --no-cache mariadb-dev

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir -r /server/requirements.txt

# mysqlclient 설치 후 build-deps 삭제
RUN apk del build-deps

# alembic
COPY ./alembic /server/alembic
COPY ./alembic.ini /server/alembic.ini

# fastapi app
COPY ./app /server/app

COPY ./docker-cmd.sh /server/docker-cmd.sh

CMD ["sh", "docker-cmd.sh"]
