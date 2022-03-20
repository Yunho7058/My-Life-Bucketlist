import smtplib
from email.mime.text import MIMEText


def send_message(user_id, password, to, subject, message_text):
    message = MIMEText(message_text, _charset="utf-8")
    message["To"] = to
    message["From"] = user_id
    message["Subject"] = subject
    with smtplib.SMTP("smtp.naver.com", 587) as s:
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.login(user_id, password)
        s.send_message(message)
    return


if __name__ == "__main__":
    send_message("kiung22@naver.com", "bang3167.", "kiung22@naver.com", "테스트2", "안녕, 나야")
