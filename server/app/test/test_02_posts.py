from fastapi.testclient import TestClient

from app.test.test_database import app
from app.schemas.users import Token

from app.test.test_01_users import access_token


client = TestClient(app)
client.base_url += "/api/"


def test_get_post_list():
    response = client.get("post")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "nickname": "테스트",
            "title": None,
            "like_count": 0,
            "bucketlist": [],
            "updated_at": None
        }
    ]


def test_get_post_detail_success():
    response = client.get("post/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "nickname": "테스트",
        "owner": False,
        "bookmark": False,
        "like": False,
        "like_count": 0,
        "title": None,
        "updated_at": None,
        "bucketlist": []
    }


def test_create_bucketlist_success():
    response = client.put(
        "bucketlist",
        headers={
            "Authorization": "Bearer " + access_token
        },
        data={
            "title": "테스트의 버킷리스트",
            "bucketlist": [
                {
                    "id": 1,
                    "content": "서핑하기",
                    "date": "2022-06-20",
                    "image_path": "images/image1.jpg"
                },
                {
                    "id": 2,
                    "content": "등산하기",
                    "date": "2022-08-25",
                    "image_path": "images/image2.jpg"
                },
                {
                    "content": "미국 여행가기"
                },
            ]
        }
    )
    assert response.status_code == 204


def test_create_bucketlist_failure():
    response = client.put(
        "bucketlist",
        headers={
            "Authorization": "Bearer "
        },
        data={
            "title": "테스트의 버킷리스트",
            "bucketlist": [
                {
                    "id": 1,
                    "content": "서핑하기",
                    "date": "2022-06-20",
                    "image_path": "images/image1.jpg"
                },
                {
                    "id": 2,
                    "content": "등산하기",
                    "date": "2022-08-25",
                    "image_path": "images/image2.jpg"
                },
                {
                    "content": "미국 여행가기"
                },
            ]
        }
    )
    assert response.status_code == 401


def test_delete_bucketlist_success():
    response = client.delete(
        "bucketlist/1",
        headers={
            "Authorization": "Bearer " + access_token
        }
    )
    assert response.status_code == 204


def test_delete_bucketlist_failure_1():
    response = client.delete(
        "bucketlist/1",
        headers={
            "Authorization": "Bearer "
        }
    )
    assert response.status_code == 401


def test_delete_bucketlist_failure_2():
    response = client.delete(
        "bucketlist/100",
        headers={
            "Authorization": "Bearer " + access_token
        }
    )
    assert response.status_code == 404
