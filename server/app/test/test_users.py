from fastapi.testclient import TestClient

from app.test.test_database import app
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


# def test_login():
#     global tokens
#     response = client.post(
#         "token",
#         data={
#             "email": "user1",
#             "password": "qwer1234"
#         }
#     )
#     assert response.status_code == 200
#     assert Token(**response.json())
#     tokens = response.json()


# def test_refresh_token_success():
#     response = client.post(
#         "token/refresh",
#         json={"refresh_token": tokens["refresh_token"]}
#     )
#     assert response.status_code == 200
#     assert Token(**response.json())


# def test_refresh_token_failure():
#     response = client.post(
#         "token/refresh",
#         json={"refresh_token": "invalid token"}
#     )
#     assert response.status_code == 401


# def test_get_user_info_success():
#     response = client.get(
#         "me",
#         headers={
#             "Authorization": "Bearer " + tokens["access_token"]
#         }
#     )
#     assert response.status_code == 200
#     assert response.json() == {
#         "username": "user1",
#         "name": "kimcoco",
#         "email": "user1@example.com",
#         "id": 1
#     }


# def test_get_user_info_failure():
#     response = client.get(
#         "me",
#         headers={
#             "Authorization": "Bearer "
#         }
#     )
#     assert response.status_code == 401
