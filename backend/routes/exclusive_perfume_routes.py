from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from bson.objectid import ObjectId
from models.exclusive_perfume_model import ExclusivePerfumeDetailsModel
import socket

def create_exclusive_perfume_details_routes(db, upload_folder):
    exclusive_perfume_bp = Blueprint('exclusive_perfumes', __name__)

    # Instantiate the exclusivePerfumeDetailsModel
    perfume_model = ExclusivePerfumeDetailsModel(db)

    # Get the host IP address
    def get_host_ip():
        host_ip = socket.gethostbyname(socket.gethostname())
        return host_ip

    # POST: Create a new perfume detail
    @exclusive_perfume_bp.route("/exclusive_perfumes", methods=["POST"])
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
            exclusive_perfumes_folder = os.path.join(upload_folder, "exclusive_perfumes")
            if not os.path.exists(exclusive_perfumes_folder):
                os.makedirs(exclusive_perfumes_folder)

            # Save image to server
            filename = secure_filename(image.filename)
            image_path = os.path.join(exclusive_perfumes_folder, filename)
            image.save(image_path)

            # Construct image URL with host IP address
            host_ip = get_host_ip()
            image_url = f"http://{host_ip}:5000/uploads/exclusive_perfumes/{filename}"  # Assuming your Flask app runs on port 5000

            try:
                ratings_value = float(ratings) if ratings else None
            except ValueError:
                return jsonify({"message": "Invalid ratings format. Please provide a numeric value."}), 400

            # Construct perfume data
            try:
                price_value = float(price.replace(",", ""))  # Ensure price is a float
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
                return jsonify(created_perfume), 201  # Return success response with ID
            else:
                return jsonify({"message": "Error creating perfume"}), 500
        except Exception as e:
            print(f"Error in create_perfume_detail: {e}")
            return jsonify({"message": f"Error creating perfume: {str(e)}"}), 500

    # GET: Fetch all exclusive_perfumes
    @exclusive_perfume_bp.route("/exclusive_perfumes", methods=["GET"])
    def get_all_exclusive_perfumes():
        try:
            exclusive_perfumes = perfume_model.get_all_details()
            return jsonify(exclusive_perfumes), 200
        except Exception as e:
            return jsonify({"message": f"Error fetching exclusive_perfumes: {str(e)}"}), 500

    # GET: Fetch a perfume by ID
    @exclusive_perfume_bp.route("/exclusive_perfumes/<id>", methods=["GET"])
    def get_perfume_by_id(id):
        try:
            perfume = perfume_model.get_detail_by_id(id)
            if not perfume:
                return jsonify({"message": "Perfume not found"}), 404
            return jsonify(perfume), 200
        except Exception as e:
            return jsonify({"message": f"Error fetching perfume: {str(e)}"}), 500

    # PUT: Update a perfume by ID
    @exclusive_perfume_bp.route("/exclusive_perfumes/<id>", methods=["PUT"])
    def update_perfume_detail(id):
        try:
            # Retrieve data from form-data
            update_data = request.form.to_dict()

            if "ratings" in update_data:
                try:
                    update_data["ratings"] = float(update_data["ratings"])
                except ValueError:
                    return jsonify({"message": "Invalid ratings format. Please provide a numeric value."}), 400

            # Validate and process the fields
            if "price" in update_data:
                try:
                    update_data["price"] = float(update_data["price"].replace(",", ""))
                except ValueError:
                    return jsonify({"message": "Invalid price format. Please provide a numeric value."}), 400

            # Handle image file if provided
            if "image" in request.files:
                image = request.files["image"]
                if image.filename:
                    filename = secure_filename(image.filename)

                    # Save the image to the upload folder
                    exclusive_perfumes_folder = os.path.join(upload_folder, "exclusive_perfumes")
                    if not os.path.exists(exclusive_perfumes_folder):
                        os.makedirs(exclusive_perfumes_folder)

                    image_path = os.path.join(exclusive_perfumes_folder, filename)
                    image.save(image_path)

                    # Construct the image URL
                    host_ip = get_host_ip()
                    update_data["image_url"] = f"http://{host_ip}:5000/uploads/exclusive_perfumes/{filename}"

            # Perform the update operation
            result = perfume_model.update_detail(id, update_data)

            if not result:
                return jsonify({"message": f"No perfume found with id: {id}"}), 404

            # Fetch the updated docuexclusivet
            updated_perfume = perfume_model.get_detail_by_id(id)
            if updated_perfume:
                return jsonify(updated_perfume), 200
            else:
                return jsonify({"message": "Failed to fetch updated docuexclusivet"}), 500

        except Exception as e:
            print(f"Error in update_perfume_detail: {e}")
            return jsonify({"message": f"Error updating perfume: {str(e)}"}), 500

    # DELETE: Delete a perfume by ID
    @exclusive_perfume_bp.route("/exclusive_perfumes/<id>", methods=["DELETE"])
    def delete_perfume_detail(id):
        try:
            result = perfume_model.delete_detail(id)
            if not result:
                return jsonify({"message": "Perfume not found"}), 404
            return jsonify({"message": "Perfume deleted successfully"}), 200
        except Exception as e:
            return jsonify({"message": f"Error deleting perfume: {str(e)}"}), 500

    return exclusive_perfume_bp
