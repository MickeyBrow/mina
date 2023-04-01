from flask import Flask, request
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
firestore_client = firestore.client()

app = Flask(__name__)


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    uid = request.args.get('uid')
    if request.method == 'GET':
        doc_ref = firestore_client.collection('users').document(uid)
        user = doc_ref.get()
        return user.to_dict()
    else:
        print("test", request.args.get('platform'))
        user = {
            'about_me': request.args.get('bio'),
            'age': request.args.get('age'),
            'category': request.args.get('category'),
            'city': request.args.get('city'),
            'name': request.args.get('name'),
            'platform': request.args.get('platform'),
            'state': request.args.get('state'),
        }
        doc_ref = firestore_client.collection('users').document(uid)
        doc_ref.set(user)

        user = doc_ref.get()
        return user.to_dict()

@app.route('/auth', methods=['POST'])
def auth():
    email, uid, name = request.args.get('email'), request.args.get('uid'), request.args.get('name')
    #Create an a new user under the profile collection with the uid as the document name
    user = {
        'email': email,
        'uid': uid,
        'about_me': '',
        'age': '',
        'avi': '',
        'category': '',
        'city': '',
        'name': name,
        'platform': '',
        'state': '',
    }
    doc_ref = firestore_client.collection('users').document(uid)
    doc_ref.set(user)
    return "Sign Up"