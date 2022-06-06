import boto3

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