from flask import Flask, request, jsonify, send_from_directory, url_for

from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

# In-memory user storage
users = []

@app.route('/')
def index():
    return send_from_directory('static', '1st.html')

# Serve static files
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Check if user exists
        if any(user['email'] == email for user in users):
            return jsonify({'error': 'User already exists'}), 400

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user
        new_user = {
            'id': str(len(users) + 1),
            'username': username,
            'email': email,
            'password': hashed_password
        }
        users.append(new_user)

        return jsonify({'message': 'Registration successful'}), 201

    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Find user
        user = next((u for u in users if u['email'] == email), None)
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 400

        # Verify password
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid credentials'}), 400

        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'username': user['username']
            }
        })

    except Exception as e:
        return jsonify({'error': 'Login failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=4000)
