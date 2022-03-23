import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
from app.core.config import settings


def generate_email_code():
    population = string.ascii_uppercase + string.digits
    weights = [2]*26 + [5]*10
    return "".join(random.choices(population, weights=weights, k=6))


def get_email_code_html(code):
    html = f"""
    <html>
      <head></head>
      <body>
        <h1>이메일 인증 안내입니다.</h1><br>
        <p>안녕하세요. mylifebucketlist 입니다.</p>
        <p>아래의 인증코드를 진행중인 이메일 인증 화면에 입력해 주세요.</p>
        <p>인증코드는 메일이 발송된 시점부터 10분간만 유효합니다.</p><br>
        <h2>{code}</h2><br>
        <p>감사합니다.</p>
      </body>
    </html>
    """
    return html


def get_email_message(to, subject, html):
    message = MIMEMultipart('alternative')
    message["To"] = to
    message["From"] = "kiung22@naver.com"
    message["Subject"] = subject
    part = MIMEText(html, 'html', _charset="utf-8")
    message.attach(part)
    return message


def send_email(message):
    with smtplib.SMTP("smtp.naver.com", 587) as s:
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.login(settings.NAVER_ID, settings.NAVER_PASSWORD)
        s.send_message(message)
    return


def send_email_code(user_email):
    code = generate_email_code()
    html = get_email_code_html(code)
    message = get_email_message(user_email, "mylifebucketlist 이메일 인증 안내입니다.", html)
    send_email(message)
    return code
