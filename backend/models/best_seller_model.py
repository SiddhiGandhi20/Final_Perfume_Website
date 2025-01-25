from pymongo.errors import PyMongoError
from bson.objectid import ObjectId

class BestSellerDetailsModel:
    def __init__(self, db):
        self.collection = db["bestsellers"]

    def create_detail(self, detail_data):
        try:
            item = {
                "name": detail_data["name"],
                "price": float(detail_data["price"]),
                "image_url": detail_data["image_url"],
                "type": detail_data["type"],
                "keynotes": detail_data["keynotes"],
                "description": detail_data["description"],
            }
            result = self.collection.insert_one(item)
            return {"id": str(result.inserted_id), "message": "Perfume created successfully"}
        except PyMongoError as e:
            print(f"Error creating perfume: {e}")
            return None

    def get_all_details(self):
        try:
            items = self.collection.find()
            return [
                {
                    "_id": str(item["_id"]),
                    "name": item["name"],
                    "price": item["price"],
                    "image_url": item["image_url"],
                    "type": item["type"],
                    "keynotes": item["keynotes"],
                    "description": item["description"],
                }
                for item in items
            ]
        except PyMongoError as e:
            print(f"Error retrieving perfumes: {e}")
            return []

    def get_detail_by_id(self, item_id):
        try:
            item = self.collection.find_one({"_id": ObjectId(item_id)})
            if item:
                return {
                    "id": str(item["_id"]),
                    "name": item["name"],
                    "price": item["price"],
                    "image_url": item["image_url"],
                    "type": item["type"],
                    "keynotes": item["keynotes"],
                    "description": item["description"],
                }
            return None
        except PyMongoError as e:
            print(f"Error retrieving perfume: {e}")
            return None

    def update_detail(self, item_id, update_data):
        try:
            if "price" in update_data:
                update_data["price"] = float(update_data["price"])

            result = self.collection.update_one(
                {"_id": ObjectId(item_id)}, {"$set": update_data}
            )
            return result.modified_count > 0
        except PyMongoError as e:
            print(f"Error updating item: {e}")
            return False
        
    def delete_detail(self, item_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(item_id)})
            return result.deleted_count > 0
        except PyMongoError as e:
            print(f"Error deleting item: {e}")
            return False