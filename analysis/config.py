import mysql.connector


def get_connection():
    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="bit1234",              # Spring과 동일
        password="1234",             # Spring과 동일
        database="loacompass",       # Spring과 동일
        charset="utf8mb4"
    )