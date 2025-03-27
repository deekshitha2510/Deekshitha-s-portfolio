from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows all origins (for testing purposes)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    return jsonify({"message": "Response from Flask", "data": data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
