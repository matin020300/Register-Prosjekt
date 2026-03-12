from flask import Flask, render_template

from db import get_conn

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
        return "db connection doesnt work"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)