from fastapi.testclient import TestClient
from app.test.test_database import app
from app.schemas.users import Token


client = TestClient(app)
client.base_url += "/api/users/"


def test_signup_success():
    response = client.post(
        "signup", 
        json={
            "username": "user1",
            "password": "qwer1234",
            "name": "kimcoco",
            "email": "user1@example.com"
        }
    )
    assert response.status_code == 201
    assert response.json() == {
        "username": "user1",
        "name": "kimcoco",
        "email": "user1@example.com",
        "id": 1
    }


def test_signup_failure():
    response = client.post(
        "signup", 
        json={
            "username": "user1",
            "password": "qwer1234",
            "name": "kimcoco",
        }
    )
    assert response.status_code == 422


def test_login():
    global tokens
    response = client.post(
        "token",
        data={
            "username": "user1",
            "password": "qwer1234"
        }
    )
    assert response.status_code == 200
    assert Token(**response.json())
    tokens = response.json()


def test_refresh_token_success():
    response = client.post(
        "token/refresh",
        json={"refresh_token": tokens["refresh_token"]}
    )
    assert response.status_code == 200
    assert Token(**response.json())


def test_refresh_token_failure():
    response = client.post(
        "token/refresh",
        json={"refresh_token": "invalid token"}
    )
    assert response.status_code == 401


def test_get_user_info_success():
    response = client.get(
        "me",
        headers={
            "Authorization": "Bearer " + tokens["access_token"]
        }
    )
    assert response.status_code == 200
    assert response.json() == {
        "username": "user1",
        "name": "kimcoco",
        "email": "user1@example.com",
        "id": 1
    }


def test_get_user_info_failure():
    response = client.get(
        "me",
        headers={
            "Authorization": "Bearer "
        }
    )
    assert response.status_code == 401
