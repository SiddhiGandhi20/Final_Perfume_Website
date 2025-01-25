from datetime import datetime
from bson.objectid import ObjectId

class OrderModel:
    def __init__(self, db):  # Corrected typo here
        """
        Initialize the OrderModel with a MongoDB database reference.
        :param db: MongoDB database instance
        """
        self.collection = db.orders


    # Save a new order
    def save_order(self, cart_items, total_amount, payment_method, customer_details):
        """
        Save a new order to the database.
        :param cart_items: List of items in the cart
        :param total_amount: Total amount for the order
        :param payment_method: Payment method used
        :param customer_details: Dictionary containing customer information (name, email, phone, address)
        :return: Saved order document
        """
        order = {
            "cartItems": cart_items,
            "totalAmount": total_amount,
            "paymentMethod": payment_method,
            "customerDetails": customer_details,
            "orderDate": datetime.now()
        }

        # Insert the order into the 'orders' collection
        result = self.collection.insert_one(order)
        order['_id'] = str(result.inserted_id)  # Convert ObjectId to string for easier handling
        return order

    # Update an existing order by ID
    def update_order(self, order_id, cart_items, total_amount, payment_method, customer_details=None):
        """
        Update an existing order in the database.
        :param order_id: ID of the order to update
        :param cart_items: Updated list of cart items
        :param total_amount: Updated total amount
        :param payment_method: Updated payment method
        :param customer_details: Optional updated customer details
        :return: Updated order document, or None if not found
        """
        updated_order = {
            "cartItems": cart_items,
            "totalAmount": total_amount,
            "paymentMethod": payment_method,
            "orderDate": datetime.now()  # Update the order date
        }

        # Include customer details if provided
        if customer_details:
            updated_order["customerDetails"] = customer_details

        result = self.collection.update_one({"_id": ObjectId(order_id)}, {"$set": updated_order})

        if result.matched_count == 0:
            return None  # No order found with the provided ID
        else:
            updated_order['_id'] = order_id  # Return the updated order with the original ID
            return updated_order

    # Get all orders
    def get_all_orders(self):
        """
        Retrieve all orders from the database.
        :return: List of all orders
        """
        orders = self.collection.find()
        return [
            {
                "_id": str(order["_id"]),
                "cartItems": order["cartItems"],
                "totalAmount": order["totalAmount"],
                "paymentMethod": order["paymentMethod"],
                "customerDetails": order["customerDetails"],  # Include customer details
                "orderDate": order["orderDate"]
            }
            for order in orders
        ]


    # Get a single order by ID
    def get_order_by_id(self, order_id):
        """
        Retrieve a single order by its ID.
        :param order_id: ID of the order to retrieve
        :return: Order document, or None if not found
        """
        order = self.collection.find_one({"_id": ObjectId(order_id)})
        if order:
            order["_id"] = str(order["_id"])  # Convert ObjectId to string
            return order
        else:
            return None  # Order not found

    # Delete an order by ID
    def delete_order(self, order_id):
        """
        Delete an order from the database.
        :param order_id: ID of the order to delete
        :return: True if the order was deleted, else False
        """
        result = self.collection.delete_one({"_id": ObjectId(order_id)})
        return result.deleted_count > 0  # Returns True if the order was deleted, else False