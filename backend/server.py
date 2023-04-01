from flask import Flask, request

app = Flask(__name__)


@app.route('/profile')
def hello():
    uid = request.args.get('uid')
    print(uid)
    response_body = {
        "name": str(uid),
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body