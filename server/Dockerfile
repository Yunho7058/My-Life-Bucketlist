FROM python:3.10.2-alpine

WORKDIR /server

# 한글 출력을 위한 패키지
RUN apt-get install locales
RUN apt-get install -y \
    language-pack-ko && \
    dpkg-reconfigure locales && \
    locale-gen ko_KR.UTF-8 && \
    /usr/sbin/update-locale LANG=ko_KR.UTF-8

# 한글을 출력하기 위해 환경변수 등록
ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR.UTF-8
ENV LC_ALL=ko_KR.UTF-8

# 파이썬에서 한글을 사용할 수 있도록 환경변수 등록
ENV PYTHONIOENCODING=UTF-8

# mysqlclient 설치를 위한 step
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev openssl-dev libc-dev libffi-dev py3-cparser \
    && apk add --no-cache mariadb-dev

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir -r /server/requirements.txt

# mysqlclient 설치 후 build-deps 삭제
RUN apk del build-deps

COPY ./app /server/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
