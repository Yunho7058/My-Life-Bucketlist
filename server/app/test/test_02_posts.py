from fastapi.testclient import TestClient

from app.test.test_init import app
from app.schemas.users import Token



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
        'is_public': True,
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
            "Authorization": "Bearer"
        },
        json={
            "title": "테스트의 버킷리스트",
            "bucketlist": [
                {
                    "content": "서핑하기",
                    "date": "2022-06-20",
                    "image_path": "images/image1.jpg"
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
        json={
            "title": "테스트의 버킷리스트",
            "bucketlist": [
                {
                    "content": "서핑하기",
                    "date": "2022-06-20",
                    "image_path": "images/image1.jpg"
                },
                {
                    "content": "미국 여행가기"
                },
            ]
        }
    )
    assert response.status_code == 401


def test_update_bucketlist_success():
    response = client.put(
        "bucketlist",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "title": "테스트의 버킷리스트",
            "bucketlist": [
                {
                    "id": 1,
                    "content": "서핑하기",
                    "date": "2023-06-20",
                    "image_path": "images/image1.jpg"
                },
                {
                    "content": "한라산 등산하기"
                },
            ]
        }
    )
    assert response.status_code == 204


def test_delete_bucketlist_success():
    response = client.delete(
        "bucketlist/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204


def test_delete_bucketlist_failure1():
    response = client.delete(
        "bucketlist/2",
    )
    assert response.status_code == 401


def test_delete_bucketlist_failure2():
    response = client.delete(
        "bucketlist/100",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 404


def test_create_comment_success():
    response = client.post(
        "comment/1",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "content": "잘 봤습니다~"
        }
    )
    assert response.status_code == 201


def test_create_comment_failure1():
    response = client.post(
        "comment/1",
        json={
            "content": "잘 봤습니다~"
        }
    )
    assert response.status_code == 401


def test_create_comment_failure2():
    response = client.post(
        "comment/1",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "content": ""
        }
    )
    assert response.status_code == 400


def test_get_comment_list_success():
    response = client.get(
        "comment/1"
    )
    assert response.status_code == 200


def test_update_comment_success():
    response = client.patch(
        "comment/1",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "content": "좋아요~"
        }
    )
    assert response.status_code == 204


def test_update_comment_failure1():
    response = client.patch(
        "comment/1",
        json={
            "content": "좋아요~"
        }
    )
    assert response.status_code == 401


def test_update_comment_failure2():
    response = client.patch(
        "comment/1",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "content": ""
        }
    )
    assert response.status_code == 400


def test_update_comment_failure3():
    response = client.patch(
        "comment/5",
        headers={
            "Authorization": "Bearer"
        },
        json={
            "content": "좋아요~"
        }
    )
    assert response.status_code == 404


def test_delete_comment_success():
    response = client.delete(
        "comment/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204


def test_delete_comment_failure():
    response = client.delete(
        "comment/1",
        headers={
            "Authorization": ""
        }
    )
    assert response.status_code == 401


def test_push_like_success():
    response = client.put(
        "like/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204


def test_push_like_failure1():
    response = client.put(
        "like/1",
    )
    assert response.status_code == 401


def test_push_like_failure2():
    response = client.put(
        "like/100",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 404


def test_like_count():
    response = client.get(
        "post/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    data = response.json()
    assert data.get("like_count") == 1
    assert data.get("like") == True
    response = client.put(
        "like/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204
    response = client.get(
        "post/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    data = response.json()
    assert data.get("like_count") == 0
    assert data.get("like") == False


def test_push_bookmark_success():
    response = client.put(
        "bookmark/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204


def test_get_bookmarked_post_list_success():
    response = client.get(
        "bookmark",
        headers={
            "Authorization": "Bearer"
        }
    )
    data = response.json()
    assert data[0].get("id") == 1    


def test_push_bookmark_failure1():
    response = client.put(
        "bookmark/100",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 404


def test_push_bookmark_failure2():
    response = client.put(
        "bookmark/1",
    )
    assert response.status_code == 401


def test_update_bookmark():
    response = client.get(
        "post/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.json().get("bookmark") == True
    response = client.put(
        "bookmark/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.status_code == 204
    response = client.get(
        "post/1",
        headers={
            "Authorization": "Bearer"
        }
    )
    assert response.json().get("bookmark") == False
