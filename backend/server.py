from flask import Flask, request
import firebase_admin

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

@app.route('/auth', methods=['GET'])
def auth():
    email, password = request.args.get('email'), request.args.get('password')
    #Create an a new user under the profile collection with the uid as the document name
    return "Sign Up"