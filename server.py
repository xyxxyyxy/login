import json
import pymongo
import random
from flask import Flask
from flask import request
from pymongo import MongoClient


from flask_cors import CORS
app = Flask(__name__)
CORS(app)

db_client = MongoClient() #change to different server if needed
db = db_client.users
users = db.users

@app.route('/test')
def test():
    return json.dumps({"connection": "ok"})

@app.route('/register/<username>/<password>')
def register(username, password):
    result = users.find_one({"_id": username})
    if result:
        return json.dumps({"connection": "username already taken"})
    else:
        post = {"_id": username, "password": password}
        post_id = users.insert_one(post).inserted_id
        return json.dumps({"connection": "registered, log in"})

sessions = {}

@app.route('/login/<username>/<password>')
def login(username, password):
    result = users.find_one({"_id": username})
    if result['_id'] == username and result['password'] == password:
        session_id = str(random.randint(1000000,100000000))
        sessions[session_id] = username
        return json.dumps({"session_id": session_id})
    else:
        return json.dumps({"connection": "no matching credentials found"})


@app.route('/session/<session_id>')
def check_session(session_id):
    if session_id in sessions:
        return json.dumps({"username": sessions[session_id]})
    else:
        return json.dumps({"connection": "login/register"})