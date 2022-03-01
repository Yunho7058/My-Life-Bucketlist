# Server

## 시작

- 가상환경 생성

```bash
$ python -m venv/venv
```



- 가상환경 활성화
- Windows

```bash
$ source venv/Scripts/activate
```

- MaxOs

```bash
$ source venv/bin/activate
```



- 패키지 설치

```bash
$ pip install -r requirements.txt
```



- 서버 실행

```bash
$ uvicorn app.main:app --reload
```

