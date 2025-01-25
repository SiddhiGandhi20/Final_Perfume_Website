from flask import Blueprint, request, jsonify
from models.order_model import OrderModel
from datetime import datetime

def create_order_routes(db):
    # Create a Blueprint for order_bp
    order_bp = Blueprint('order', __name__)
    order_model = OrderModel(db)

    # POST: Create a new order
  
    @order_bp.route('/submit-order', methods=['POST'])
    def submit_order():
        try:
            order_data = request.get_json()

            # Validate required fields
            required_fields = ['cartItems', 'totalAmount', 'paymentMethod', 'name', 'email', 'phone', 'address']
            for field in required_fields:
                if field not in order_data or not order_data[field]:
                    return jsonify({'success': False, 'message': f'Missing or invalid field: {field}'}), 400

            # Extract order details
            cart_items = order_data['cartItems']
            total_amount = order_data['totalAmount']
            payment_method = order_data['paymentMethod']

            # Validate data types
            if not isinstance(cart_items, list):
                return jsonify({'success': False, 'message': 'cartItems must be a list.'}), 400
            if not isinstance(total_amount, (int, float, str)) or not str(total_amount).replace('.', '', 1).isdigit():
                return jsonify({'success': False, 'message': 'totalAmount must be a number.'}), 400
            if not isinstance(payment_method, str):
                return jsonify({'success': False, 'message': 'paymentMethod must be a string.'}), 400

            # Extract customer details
            customer_details = {
                'name': order_data['name'],
                'email': order_data['email'],
                'phone': order_data['phone'],
                'address': order_data['address']
            }
            if not all(isinstance(value, str) for value in customer_details.values()):
                return jsonify({'success': False, 'message': 'Customer details must all be strings.'}), 400

            # Save the order
            saved_order = order_model.save_order(cart_items, total_amount, payment_method, customer_details)

            return jsonify({'success': True, 'message': 'Order placed successfully!', 'order': saved_order}), 201

        except Exception as e:
            print(f"Error while submitting order: {str(e)}")
            return jsonify({'success': False, 'message': 'Failed to submit the order.', 'error': str(e)}), 500


    # PUT: Update an existing order by ID
    @order_bp.route('/order/<order_id>', methods=['PUT'])
    def update_order_route(order_id):
        try:
            order_data = request.get_json()

            # Get the updated order data
            cart_items = order_data['cartItems']
            total_amount = order_data['totalAmount']
            payment_method = order_data['paymentMethod']

            # Optional: Update customer details if provided
            customer_details = order_data.get('customerDetails')

            # Update the order using the update_order model function
            updated_order = order_model.update_order(order_id, cart_items, total_amount, payment_method, customer_details)

            if updated_order:
                return jsonify({'success': True, 'message': 'Order updated successfully!', 'order': updated_order}), 200
            else:
                return jsonify({'success': False, 'message': 'Order not found.'}), 404

        except Exception as e:
            print("Error:", e)
            return jsonify({'success': False, 'message': 'Failed to update the order.'}), 500

    # GET: Get all orders
    @order_bp.route('/orders', methods=['GET'])
    def get_orders():
        try:
            orders = order_model.get_all_orders()
            return jsonify({'success': True, 'orders': orders}), 200
        except Exception as e:
            print("Error:", e)
            return jsonify({'success': False, 'message': 'Failed to retrieve orders.'}), 500

    # GET by ID: Get an order by its ID
    @order_bp.route('/order/<order_id>', methods=['GET'])
    def get_order(order_id):
        try:
            order = order_model.get_order_by_id(order_id)

            if order:
                return jsonify({'success': True, 'order': order}), 200
            else:
                return jsonify({'success': False, 'message': 'Order not found.'}), 404

        except Exception as e:
            print("Error:", e)
            return jsonify({'success': False, 'message': 'Failed to retrieve the order.'}), 500

    # DELETE: Delete an order by ID
    @order_bp.route('/order/<order_id>', methods=['DELETE'])
    def delete_order_route(order_id):
        try:
            is_deleted = order_model.delete_order(order_id)

            if is_deleted:
                return jsonify({'success': True, 'message': 'Order deleted successfully!'}), 200
            else:
                return jsonify({'success': False, 'message': 'Order not found.'}), 404

        except Exception as e:
            print("Error:", e)
            return jsonify({'success': False, 'message': 'Failed to delete the order.'}), 500

    return order_bp
