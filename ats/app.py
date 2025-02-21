from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt


app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Define the Referral model

class Referral(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    job_role = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(200), nullable=True)
    description = db.Column(db.Text, nullable=False)
    prerequisites = db.Column(db.Text, nullable=False)
    salary = db.Column(db.Integer, nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# API routes for user authentication
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = data['password']

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create a new user
    new_user = User(email=email, password=hashed_password.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    # Find the user by email
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials!"}), 401

# API routes for referrals

@app.route('/referrals', methods=['POST'])
def create_referral():
    data = request.json
    new_referral = Referral(
        company_name=data['companyName'],
        job_role=data['jobRole'],
        location=data['location'],
        logo=data.get('companyLogo'),
        description=data['description'],
        prerequisites=data['prerequisites'],
        salary=data['salary']
    )
    db.session.add(new_referral)
    db.session.commit()
    return jsonify({"message": "Referral created successfully!"}), 201

@app.route('/referrals', methods=['GET'])
def get_referrals():
    referrals = Referral.query.all()
    return jsonify([{
        "companyName": referral.company_name,
        "jobRole": referral.job_role,
        "location": referral.location,
        "logo": referral.logo,
        "description": referral.description,
        "prerequisites": referral.prerequisites,
        "salary": referral.salary
    } for referral in referrals]), 200

if __name__ == '__main__':
    app.run(debug=True)
