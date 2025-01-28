from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from bson.objectid import ObjectId


class UserModel:
    def __init__(self, db):
        self.collection = db.signup

    def is_email_registered(self, email):
        """Check if the email is already registered."""
        return self.collection.find_one({"email": email})

    def create_user(self, name, email, password, role="user"):
        """Insert a new user into the database."""
        hashed_password = generate_password_hash(password)
        user_data = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "role": role  # Add the role field here
        }
        self.collection.insert_one(user_data)
        return True

    def get_user_by_id(self, user_id):
        """Retrieve a user by their ID."""
        return self.collection.find_one({"_id": ObjectId(user_id)})

    def get_all_users(self):
        """Retrieve all users from the collection."""
        return list(self.collection.find())

    def get_user_by_email(self, email):
        """Retrieve a user by email."""
        return self.collection.find_one({"email": email})

    def check_password(self, stored_password, provided_password):
        """Check if the provided password matches the stored hashed password."""
        return check_password_hash(stored_password, provided_password)
