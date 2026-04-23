import mariadb

def get_conn():
    return mariadb.connect(
        user="matin",
        password="mypassword",
        host="10.2.3.143",
        port=3306,
        database="Register"
    )           