import os
from flask import Flask, jsonify, send_from_directory
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS 
import datetime
from routes.user_routes import create_auth_routes
from routes.admin_routes import setup_admin_routes
from routes.men_perfume_routes import create_men_perfume_details_routes
from routes.women_perfume_routes import create_women_perfume_details_routes
from routes.exclusive_perfume_routes import create_exclusive_perfume_details_routes
from routes.best_seller_routes import create_bestseller_details_routes
from routes.order_routes import create_order_routes



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Load MongoDB configuration
app.config.from_object(Config)
mongo = PyMongo(app)

upload_folder = os.path.join(os.getcwd(), "uploads")

# Check if folder exists, if not create it
if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)

app.config['UPLOAD_FOLDER'] = 'uploads'
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/uploads/perfumes/<filename>')
def serve_menperfume_image(filename):
    return send_from_directory(os.path.join(upload_folder, "perfumes"), filename)

@app.route('/uploads/women_perfumes/<filename>')
def serve_womenperfume_image(filename):
    return send_from_directory(os.path.join(upload_folder, "women_perfumes"), filename)

@app.route('/uploads/exclusive_perfumes/<filename>')
def serve_exclusiveperfume_image(filename):
    return send_from_directory(os.path.join(upload_folder, "exclusive_perfumes"), filename)

@app.route('/uploads/bestseller/<filename>')
def serve_bestseller_image(filename):
    return send_from_directory(os.path.join(upload_folder, "bestseller"), filename)


# Import and register blueprints
app.register_blueprint(create_auth_routes(mongo.db))
app.register_blueprint(setup_admin_routes(mongo.db))
app.register_blueprint(create_order_routes(mongo.db))

app.register_blueprint(create_women_perfume_details_routes(mongo.db, upload_folder="uploads"))
app.register_blueprint(create_men_perfume_details_routes(mongo.db, upload_folder="uploads"))
app.register_blueprint(create_exclusive_perfume_details_routes(mongo.db, upload_folder="uploads"))
app.register_blueprint(create_bestseller_details_routes(mongo.db, upload_folder="uploads"))



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port='5000')
