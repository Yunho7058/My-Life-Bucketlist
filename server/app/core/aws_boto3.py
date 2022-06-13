import boto3
import uuid

from app.core.config import settings



def send_message(url, message):
    sqs_client = boto3.client("sqs")
    response = sqs_client.send_message(
        QueueUrl=url,
        MessageBody=message
    )
    return response


def delete_s3_object_task(key):
    if key:
        send_message(f"{settings.AWS_SQS_URL}/s3_delete_object_queue", key)


def generate_s3_key(image_type, file_name, user_id):
    file_name = file_name[-30:]
    if image_type == "bucketlist":
        return f"{image_type}/{user_id}/{uuid.uuid4().hex}_{file_name}"
    elif image_type == "profile":
        return f"{image_type}/{user_id}/{file_name}"


def generate_presigned_post(image_type, file_name, user_id):
    s3_client = boto3.client("s3")
    key = generate_s3_key(image_type, file_name, user_id)
    conditions = [
      ["content-length-range", 0, 5242880],
      ["starts-with", "$key", image_type],
    ]
    presigned_post = s3_client.generate_presigned_post(Bucket="mylifebucketlist", Key=key, Conditions=conditions, ExpiresIn=180)
    return presigned_post