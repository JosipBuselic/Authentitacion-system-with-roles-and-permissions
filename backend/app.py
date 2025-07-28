from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

app = Flask(__name__, static_folder="server")

CORS(app)

app.config.from_object(Config)

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/register")
def register():
    return send_from_directory(app.static_folder, "register.html")

@app.route("/login")
def login():
    return send_from_directory(app.static_folder, "login.html")

@app.route('/_next/<path:filename>')
def serve_next_static(filename):
    return send_from_directory(f"{app.static_folder}/_next", filename)

@app.route('/icons/<path:filename>')
def serve_icons(filename):
    return send_from_directory(f"{app.static_folder}/icons", filename)

@app.route("/login", methods=["POST"])
def login_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "username": user.username}), 200
    

@app.route("/register", methods=["POST"])
def get_login_page():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "nije uredu jer vec postoji user"}), 409
    
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, email=email)
    
    db.session.add(new_user)
    db.session.commit()
    
    
    return jsonify({"message": "User registered successfully"}), 201