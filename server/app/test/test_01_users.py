from fastapi.testclient import TestClient

from app.test.test_init import app
from app.schemas.users import Token


client = TestClient(app)
client.base_url += "/api/"


def test_signup_success():
    response = client.post(
        "signup",
        json={
            "email": "test@example.com",
            "password": "qwer1234",
            "nickname": "테스트",
        }
    )
    assert response.status_code == 201


def test_signup_failure():
    response = client.post(
        "signup", 
        json={
            "email": "test@example.com",
            "password": "qwer1234",
            "nickname": "테스트",
        }
    )
    assert response.status_code == 400


def test_check_email_success():
    response = client.post(
        "email",
        json={
            "email": "kiung22@naver.com"
        }
    )
    assert response.status_code == 204
    assert response.cookies.get("email_code")


def test_check_email_failure():
    response = client.post(
        "email",
        json={
            "email": "test@example.com"
        }
    )
    assert response.status_code == 400
    assert not response.cookies.get("email_code")


def test_check_email_code_success():
    response = client.post(
        "email/code",
        json={
            "code": "A1B2C3"
        },
        cookies={
            "email_code": "A1B2C3"
        }
    )
    assert response.status_code == 204


def test_check_email_code_failure_1():
    response = client.post(
        "email/code",
        json={
            "code": "A1B3CD"
        },
        cookies={
            "email_code": "A1B2C3"
        }
    )
    assert response.status_code == 400


def test_check_email_code_failure_2():
    response = client.post(
        "email/code",
        json={
            "code": "A1B3CD"
        }
    )
    assert response.status_code == 400


def test_check_nickname_success():
    response = client.post(
        "nickname",
        json={
            "nickname": "두부"
        }
    )
    assert response.status_code == 204


def test_check_nickname_failure():
    response = client.post(
        "nickname",
        json={
            "nickname": "테스트"
        }
    )
    assert response.status_code == 400


def test_login_success():
    global refresh_token
    response = client.post(
        "login",
        data={
            "username": "test@example.com",
            "password": "qwer1234"
        }
    )
    assert response.status_code == 200
    refresh_token = response.cookies.get("refresh_token")
    assert refresh_token
    assert Token(**response.json())


def test_login_failure_1():
    response = client.post(
        "login",
        data={
            "username": "test@example.com",
            "password": "1234214234"
        }
    )
    assert response.status_code == 400
    assert response.json().get("detail") == "password"


def test_login_failure_2():
    response = client.post(
        "login",
        data={
            "username": "tttt@example.com",
            "password": "qwer1234"
        }
    )
    assert response.status_code == 400
    assert response.json().get("detail") == "email"


def test_logout_success():
    response = client.get(
        "logout",
        headers={
            "Authorization": "Bearer"
        },
        cookies={
            "refresh_token": refresh_token
        }
    )
    assert response.status_code == 204
    assert not response.cookies.get("refresh_token")


def test_logout_failure():
    response = client.get(
        "logout",
        cookies={
            "refresh_token": refresh_token
        }
    )
    assert response.status_code == 401
    assert not response.cookies.get("refresh_token")


def test_refresh_token_success():
    response = client.get(
        "refresh",
        cookies={
            "refresh_token": refresh_token
        }
    )
    assert response.status_code == 200
    assert response.cookies.get("refresh_token")
    assert Token(**response.json())


def test_refresh_token_failure():
    response = client.get(
        "refresh",
        cookies={
            "refresh_token": ""
        }
    )
    assert response.status_code == 400


def test_get_user_info_success():
    response = client.get(
        "me",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "email": "test@example.com",
        "nickname": "테스트",
        "domain": None,
        "post_id": 1
    }


def test_get_user_info_failure():
    response = client.get(
        "me",
    )
    assert response.status_code == 401


def test_get_post_id_success():
    response = client.get(
        "user/1/post"
    )
    assert response.json() == {
        "id": 1,
        "is_public": True
    }


def test_get_post_id_failure():
    response = client.get(
        "user/100/post"
    )
    assert response.status_code == 404
