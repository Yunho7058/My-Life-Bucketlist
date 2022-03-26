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

# 한글 인코딩 설정
# alpine환경에 맞는 locale package 설치
RUN apk --no-cache add wget && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-bin-2.35-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-i18n-2.35-r0.apk && \
    apk add glibc-2.35-r0.apk glibc-bin-2.35-r0.apk glibc-i18n-2.35-r0.apk

# localedef로 locale 생성
RUN /usr/glibc-compat/bin/localedef -i ko_KR -f UTF-8 ko_KR.UTF-8
# 환경변수 등록
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8
# locale 설정 확인
RUN /usr/glibc-compat/bin/locale &&\
    /usr/glibc-compat/bin/locale -a

COPY ./app /server/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
