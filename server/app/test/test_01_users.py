from fastapi.testclient import TestClient

from app.test.test_init import app
from app.schemas.users import Token


client = TestClient(app)
client.base_url += "/api/"


def test_signup_success1():
    response = client.post(
        "signup",
        json={
            "email": "test@example.com",
            "password": "qwer1234",
            "nickname": "테스트",
        }
    )
    assert response.status_code == 201


def test_signup_success2():
    response = client.post(
        "signup",
        json={
            "email": "test2@example.com",
            "password": "qwer1234",
            "nickname": "테스트2",
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


def test_check_email_code_failure1():
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


def test_check_email_code_failure2():
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


def test_login_failure1():
    response = client.post(
        "login",
        data={
            "username": "test@example.com",
            "password": "1234214234"
        }
    )
    assert response.status_code == 400
    assert response.json().get("detail") == "password"


def test_login_failure2():
    response = client.post(
        "login",
        data={
            "username": "tttt@example.com",
            "password": "qwer1234"
        }
    )
    assert response.status_code == 400
    assert response.json().get("detail") == "email"


def test_logout_success1():
    response = client.get(
        "logout",
        cookies={
            "refresh_token": refresh_token
        }
    )
    assert response.status_code == 204
    assert not response.cookies.get("refresh_token")


def test_logout_success2():
    response = client.get(
        "logout",
    )
    assert response.status_code == 204
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
            "Authorization": "test"
        }
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "email": "test@example.com",
        "nickname": "테스트",
        "domain": None,
        "image_path": None,
        "post_id": 1
    }


def test_get_user_info_failure():
    response = client.get(
        "me",
    )
    assert response.status_code == 401


def test_update_nickname_success():
    response = client.patch(
        "nickname",
        headers={
            "Authorization": "test"
        },
        json={
            "nickname": "테스트"
        }
    )
    assert response.status_code == 204


def test_update_nickname_failure1():
    response = client.patch(
        "nickname",
        headers={
            "Authorization": "test"
        },
        json={
            "nickname": "   "
        }
    )
    assert response.status_code == 400


def test_update_nickname_failure2():
    response = client.patch(
        "nickname",
        json={
            "nickname": "테스트"
        }
    )
    assert response.status_code == 401


def test_update_password_success():
    response = client.patch(
        "password",
        headers={
            "Authorization": "test"
        },
        json={
            "password": "qwer1234",
            "new_password": "test1234"
        }
    )
    assert response.status_code == 204


def test_update_password_failure1():
    response = client.patch(
        "password",
        headers={
            "Authorization": ""
        },
        json={
            "password": "test1234",
            "new_password": "qwer1234"
        }
    )
    assert response.status_code == 401


def test_update_password_failure2():
    response = client.patch(
        "password",
        headers={
            "Authorization": "test"
        },
        json={
            "password": "test1234",
            "new_password": "       "
        }
    )
    assert response.status_code == 400


def test_update_password_failure3():
    response = client.patch(
        "password",
        headers={
            "Authorization": "test"
        },
        json={
            "password": "qwer1234",
            "new_password": "test1234"
        }
    )
    assert response.status_code == 403


def test_update_profile_success1():
    response = client.patch(
        "profile",
        headers={
            "Authorization": "test"
        },
        json={
            "image_path": "test.jpg"
        }
    )
    assert response.status_code == 204


def test_update_profile_success2():
    response = client.patch(
        "profile",
        headers={
            "Authorization": "test"
        },
        json={
            "image_path": ""
        }
    )
    assert response.status_code == 204


def test_update_profile_failure1():
    response = client.patch(
        "profile",
        headers={
            "Authorization": ""
        },
        json={
            "image_path": "test.jpg"
        }
    )
    assert response.status_code == 401


def test_delete_user_info_failure1():
    response = client.post(
        "signup",
        json={
            "email": "test3@example.com",
            "password": "qwer1234",
            "nickname": "테스트3",
        }
    )
    response = client.delete(
        "user",
        json={
            "password": "qwer1234"
        }
    )
    assert response.status_code == 401


def test_delete_user_info_failure2():
    response = client.delete(
        "user",
        headers={
            "Authorization": "test3"
        },
        json={
            "password": "sadfqwer"
        }
    )
    assert response.status_code == 403


def test_delete_user_info_success():
    response = client.delete(
        "user",
        headers={
            "Authorization": "test3"
        },
        json={
            "password": "qwer1234"
        }
    )
    assert response.status_code == 204