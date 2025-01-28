from flask import Blueprint, request, jsonify
import re
import jwt
import datetime
from models.user_model import UserModel
from bson import ObjectId  # Import ObjectId for conversion


# Blueprint setup
auth_bp = Blueprint("auth", __name__)

# Secret key for signing the token (this should be stored securely, e.g., in environment variables)
SECRET_KEY = "your_secret_key"

def create_auth_routes(db):
    user_model = UserModel(db)

    # Signup route
    @auth_bp.route("/signup", methods=["POST"])
    def signup():
        """API endpoint to register a new user."""
        data = request.get_json()

        # Check if data was successfully decoded
        if not data:
            return jsonify({"error": "Invalid JSON format"}), 400

        # Log received data
        print(f"Received data: {data}")

        # Extract data from request
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "user")  # Default role is "user" if not provided

        # Input validation
        if not (name and email and password):
            return jsonify({"error": "All fields are required"}), 400

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"error": "Invalid email address"}), 400

        # Check for duplicate email
        if user_model.is_email_registered(email):
            return jsonify({"error": "Email already registered"}), 400

        # Create new user
        user_model.create_user(name, email, password, role)
        return jsonify({"message": "User registered successfully", "role": role}), 201

    @auth_bp.route("/user/<user_id>", methods=["GET"])
    def get_user_by_id(user_id):
        """API endpoint to get user by ID."""
        user = user_model.get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Convert ObjectId to string for JSON serialization
        user["_id"] = str(user["_id"])
        return jsonify({"user": user}), 200

    @auth_bp.route("/users", methods=["GET"])
    def get_all_users():
        """API endpoint to get all users."""
        users = user_model.get_all_users()
        # Convert ObjectIds to strings
        for user in users:
            user["_id"] = str(user["_id"])
        return jsonify({"users": users}), 200

    # Login route
    @auth_bp.route("/login", methods=["POST"])
    def user_login():
        """API endpoint for user login."""
        data = request.get_json()

        # Extract data
        email = data.get("email")
        password = data.get("password")

        # Input validation
        if not (email and password):
            return jsonify({"error": "Email and password are required"}), 400

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"error": "Invalid email address"}), 400

        # Check credentials
        user = user_model.get_user_by_email(email)
        if not user or not user_model.check_password(user["password"], password):
            return jsonify({"error": "Invalid email or password"}), 401

        # Generate token with role
        payload = {
            "id": str(user["_id"]),  # Assuming MongoDB ObjectId
            "email": user["email"],
            "role": user.get("role", "user"),  # Include role in the token
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # Token expiry
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "role": user.get("role", "user")  # Return role in response
        }), 200

    return auth_bp
