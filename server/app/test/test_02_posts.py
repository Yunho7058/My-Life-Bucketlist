from fastapi.testclient import TestClient
from datetime import datetime

from app.test.test_init import app
from app.schemas.users import Token



client = TestClient(app)
client.base_url += "/api/"


def test_get_post_list():
    response = client.get("post")
    assert response.status_code == 200


def test_get_post_detail_success():
    response = client.get(
        "post/1",
        headers={"Authorization": "test"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["nickname"] == "테스트"
    assert data["owner"] == True
    assert data["is_public"] == False
    assert data["bookmark"] == False
    assert data["like"] == False
    assert data["like_count"] == 0
    assert data["updated_at"]
    assert data["bucketlist"] == [
            {
                "content": "첫번째 버킷리스트 등록하기",
                "detail": None,
                "id": 1,
                "image_path": None
            }
        ]
    

def test_update_public_success():
    response = client.patch(
        "post",
        headers={"Authorization": "test"}
    )
    assert response.status_code == 204


def test_update_public_failure():
    response = client.patch(
        "post",
        headers={"Authorization": ""}
    )
    assert response.status_code == 401


def test_create_bucketlist_success():
    response = client.post(
        "bucketlist",
        headers={
            "Authorization": "test"
        },
        json={
            "content": "서핑하기"
        }
    )
    assert response.status_code == 200
    assert response.json().get("id")


def test_create_bucketlist_failure():
    response = client.post(
        "bucketlist",
        json={
            "content": "서핑하기"
        }
    )
    assert response.status_code == 401


def test_update_bucketlist_success():
    response = client.put(
        "bucketlist/1",
        headers={
            "Authorization": "test"
        },
        json={
            "content": "등산하기"
        }
    )
    assert response.status_code == 204


def test_update_bucketlist_failure1():
    response = client.put(
        "bucketlist/1",
        json={
            "content": "등산하기"
        }
    )
    assert response.status_code == 401


def test_update_bucketlist_failure2():
    response = client.put(
        "bucketlist/1",
        headers={
            "Authorization": "test2"
        },
        json={
            "content": "등산하기"
        }
    )
    assert response.status_code == 403


def test_delete_bucketlist_failure1():
    response = client.delete(
        "bucketlist/1",
    )
    assert response.status_code == 401


def test_delete_bucketlist_failure2():
    response = client.delete(
        "bucketlist/100",
        headers={
            "Authorization": "test"
        }
    )
    assert response.status_code == 404


def test_delete_bucketlist_failure3():
    response = client.delete(
        "bucketlist/1",
        headers={
            "Authorization": "test2"
        }
    )
    assert response.status_code == 403


def test_delete_bucketlist_success():
    response = client.delete(
        "bucketlist/1",
        headers={
            "Authorization": "test"
        }
    )
    assert response.status_code == 204


def test_create_comment_success():
    response = client.post(
        "comment/1",
        headers={
            "Authorization": "test"
        },
        json={
            "content": "잘 봤습니다~"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data.get("id") == 1
    assert data.get("updated_at")


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
            "Authorization": "test"
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
    data = response.json()
    assert len(data) == 1
    assert data[0]["content"] == "잘 봤습니다~"
    assert data[0]["id"] == 1
    assert data[0]["updated_at"]
    assert data[0]["user_id"] == 1
    assert data[0]["nickname"] == "테스트"
    assert data[0]["image_path"] == None


def test_update_comment_success():
    response = client.patch(
        "comment/1",
        headers={
            "Authorization": "test"
        },
        json={
            "content": "좋아요~"
        }
    )
    assert response.status_code == 200


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
            "Authorization": "test"
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
            "Authorization": "test"
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
            "Authorization": "test"
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
            "Authorization": "test"
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
            "Authorization": "test"
        }
    )
    assert response.status_code == 404


def test_like_count():
    response = client.get(
        "post/1",
        headers={
            "Authorization": "test"
        }
    )
    data = response.json()
    assert data.get("like_count") == 1
    assert data.get("like") == True
    response = client.put(
        "like/1",
        headers={
            "Authorization": "test"
        }
    )
    assert response.status_code == 204
    response = client.get(
        "post/1",
        headers={
            "Authorization": "test"
        }
    )
    data = response.json()
    assert data.get("like_count") == 0
    assert data.get("like") == False


def test_push_bookmark_success():
    response = client.put(
        "bookmark/1",
        headers={
            "Authorization": "test"
        }
    )
    assert response.status_code == 204


def test_get_bookmarked_post_list_success():
    response = client.get(
        "bookmark",
        headers={
            "Authorization": "test"
        }
    )
    data = response.json()
    assert data[0].get("id") == 1    


def test_push_bookmark_failure1():
    response = client.put(
        "bookmark/100",
        headers={
            "Authorization": "test"
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
            "Authorization": "test"
        }
    )
    assert response.json().get("bookmark") == True
    response = client.put(
        "bookmark/1",
        headers={
            "Authorization": "test"
        }
    )
    assert response.status_code == 204
    response = client.get(
        "post/1",
        headers={
            "Authorization": "test"
        }
    )
    assert response.json().get("bookmark") == False
