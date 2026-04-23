from flask import Flask, render_template
import mariadb

def get_conn():
    return mariadb.connect(
        user="matin",
        password="mypassword",
        host="10.2.3.143",
        port=3306,
        database="Register"
    )           

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("homepage.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/ping")
def ping():
    try:
        conn = get_conn()
        conn.close()
        return "Db connection works"
    except Exception as e:
        return f"DB connection failed: {e}"
    
@app.route("/visitors")
def visitors():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM visitors")
    return str(cursor.fetchall())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)