from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from bson.objectid import ObjectId, InvalidId
from models.women_perfume_model import WomenPerfumeDetailsModel
import socket

def create_women_perfume_details_routes(db, upload_folder):
    women_perfume_bp = Blueprint('women_perfumes', __name__)

    # Instantiate the womenPerfumeDetailsModel
    perfume_model = WomenPerfumeDetailsModel(db)

    def serialize_document(document):
        """Helper function to convert ObjectId to string in MongoDB documents."""
        document["_id"] = str(document["_id"])
        return document

    # Get the host IP address
    def get_host_ip():
        host_ip = socket.gethostbyname(socket.gethostname())
        return host_ip

    @women_perfume_bp.route("/women_perfumes", methods=["POST"])
    def create_perfume_detail():
        try:
            # Retrieve form data
            name = request.form.get("name")
            description = request.form.get("description")
            price = request.form.get("price")
            image = request.files.get("image")
            type_ = request.form.get("type")
            keynotes = request.form.get("keynotes")
            ratings = request.form.get("ratings")  # New field

            # Log received data
            print(f"Received data - name: {name}, description: {description}, price: {price}, image: {image}, type: {type_}, keynotes: {keynotes}, ratings: {ratings}")

            # Validate required fields
            missing_fields = [field for field in ["name", "description", "price", "type", "keynotes"] if not request.form.get(field)]
            if not image:
                missing_fields.append("image")
            if missing_fields:
                return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400

            # Ensure the upload folder exists
            women_perfumes_folder = os.path.join(upload_folder, "women_perfumes")
            if not os.path.exists(women_perfumes_folder):
                os.makedirs(women_perfumes_folder)

            # Save image to server
            filename = secure_filename(image.filename)
            image_path = os.path.join(women_perfumes_folder, filename)
            image.save(image_path)

            # Construct image URL
            host_ip = get_host_ip()
            image_url = f"http://{host_ip}:5000/uploads/women_perfumes/{filename}"

            # Validate and process ratings
            try:
                ratings_value = float(ratings) if ratings else None
            except ValueError:
                return jsonify({"message": "Invalid ratings format. Please provide a numeric value."}), 400

            # Construct perfume data
            try:
                price_value = float(price.replace(",", ""))
            except ValueError:
                return jsonify({"message": "Invalid price format. Please provide a numeric value."}), 400

            perfume_data = {
                "name": name,
                "description": description,
                "price": price_value,
                "image_url": image_url,
                "type": type_,
                "keynotes": keynotes,
                "ratings": ratings_value  # Include the new field
            }

            # Insert into MongoDB
            created_perfume = perfume_model.create_detail(perfume_data)
            if created_perfume:
                return jsonify(created_perfume), 201
            else:
                return jsonify({"message": "Error creating perfume"}), 500
        except Exception as e:
            print(f"Error in create_perfume_detail: {e}")
            return jsonify({"message": f"Error creating perfume: {str(e)}"}), 500


    # GET: Fetch all women_perfumes
    @women_perfume_bp.route("/women_perfumes", methods=["GET"])
    def get_all_women_perfumes():
        try:
            women_perfumes = perfume_model.get_all_details()
            return jsonify(women_perfumes), 200
        except Exception as e:
            return jsonify({"message": f"Error fetching women_perfumes: {str(e)}"}), 500

    # GET: Fetch a perfume by ID
    @women_perfume_bp.route("/women_perfumes/<id>", methods=["GET"])
    def get_perfume_by_id(id):
        try:
            perfume = perfume_model.get_detail_by_id(id)
            if not perfume:
                return jsonify({"message": "Perfume not found"}), 404
            return jsonify(perfume), 200
        except Exception as e:
            return jsonify({"message": f"Error fetching perfume: {str(e)}"}), 500



    @women_perfume_bp.route("/women_perfumes/<id>", methods=["PUT"])
    def update_perfume_detail(id):
        try:
            # Validate ObjectId format
            if not ObjectId.is_valid(id):
                return jsonify({"message": "Invalid ID format. Must be a 24-character hex string."}), 400

            # Convert id to ObjectId
            perfume_id = ObjectId(id)

            # Parse the request payload
            update_data = request.json

            # Check if required fields are present
            required_fields = ["name", "description", "price", "keynotes", "image_url"]
            for field in required_fields:
                if field not in update_data:
                    return jsonify({"message": f"Missing required field: {field}"}), 400

            # Perform the update
            result = db.women_perfumes.update_one(
                {"_id": perfume_id},
                {"$set": update_data}
            )

            if result.matched_count == 0:
                return jsonify({"message": f"No perfume found with id: {id}"}), 404

            # Fetch the updated document
            updated_perfume = db.women_perfumes.find_one({"_id": perfume_id})
            if updated_perfume:
                updated_perfume = serialize_document(updated_perfume)  # Convert ObjectId to string
                return jsonify(updated_perfume), 200
            else:
                return jsonify({"message": "Failed to fetch updated perfume data."}), 500

        except Exception as e:
            print(f"Error updating perfume: {e}")
            return jsonify({"message": f"Error updating perfume: {str(e)}"}), 500
    # DELETE: Delete a perfume by ID
    @women_perfume_bp.route("/women_perfumes/<id>", methods=["DELETE"])
    def delete_perfume_detail(id):
        try:
            result = perfume_model.delete_detail(id)
            if not result:
                return jsonify({"message": "Perfume not found"}), 404
            return jsonify({"message": "Perfume deleted successfully"}), 200
        except Exception as e:
            return jsonify({"message": f"Error deleting perfume: {str(e)}"}), 500

    return women_perfume_bp


