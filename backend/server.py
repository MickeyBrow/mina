from flask import Flask, request
import uuid
import urllib.parse
import firebase_admin
from firebase_admin import credentials, firestore, storage

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred, {'storageBucket': 'mina-5f4b8.appspot.com'})
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
        doc_ref.update(user)

        user = doc_ref.get()
        return user.to_dict()

@app.route('/avi', methods=['POST'])
def avi():
    uid, image = request.args.get('uid'), request.args.get('image')

    parts = image.split('/')
    end = '%2F'.join(parts[7:])
    begin = '/'.join(parts[:7])

    doc_ref = firestore_client.collection('users').document(uid)
    user = {'avi': begin + "/" + end}
    doc_ref.update(user)
    
    return user

@app.route('/imageUpload', methods=['POST'])
def uploadImage():
    uid, imageUid = request.args.get('uid'), request.args.get('imageUid')

    #add the image uid to DB
    doc_ref = firestore_client.collection('users').document(uid)
    middle = doc_ref.get()
    curr_images = middle.get('images')
    if not curr_images:
        curr_images = {'0' : imageUid}
    else:
        val = list(curr_images.keys())[-1]
        i = int(val) + 1
        curr_images[str(i)] = imageUid 
        
    doc_ref.update({'images' : curr_images})
    return 
    
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
        'contacts': {},
        'reject': {},
        'images': {},
    }
    doc_ref = firestore_client.collection('users').document(uid)
    doc_ref.set(user)
    return None

@app.route('/connections', methods=['GET', 'POST'])
def connection():
    uid = request.args.get('uid')

    if request.method == 'GET':
        doc_ref = firestore_client.collection('users').document(uid)
        middle = doc_ref.get()
        state, accepts, rejects = middle.get('state'), middle.get('contacts'), middle.get('reject')

        filter = set(list(accepts.values()) + list(rejects.values()))

        profile_ref = firestore_client.collection('users').where('state', '==', state).where('uid', '!=', uid)
        potentials = profile_ref.get()
        response = {}
        
        for i in range(len(potentials)):
            temp = potentials[i].to_dict()
            if temp['uid'] not in filter:
                response[str(i)] = potentials[i].to_dict()

        return response
    
    else:
        accept, decline = request.args.get('accept'), request.args.get('decline')
        doc_ref = firestore_client.collection('users').document(uid)

        if accept:
            # Here we will add the connection to the accept object
            middle = doc_ref.get()
            contacts = middle.get('contacts')

            if not contacts:
                contacts = {'0' : accept}
            else:
                val = list(contacts.keys())[-1]
                i = int(val) + 1
                contacts[str(i)] = accept 
            
            doc_ref.update({'contacts' : contacts})
            return {}
        if decline:
            # Here add the connection to the decline object
            middle = doc_ref.get()
            reject = middle.get('reject')

            if not reject:
                reject = {'0' : decline}
            else:
                val = list(reject.keys())[-1]
                i = int(val) + 1
                reject[str(i)] = decline 
            
            doc_ref.update({'reject' : reject})
            return {}