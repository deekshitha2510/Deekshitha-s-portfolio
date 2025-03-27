import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
import json

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("🚨 ERROR: GROQ_API_KEY is not set!")
    exit(1)

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load resume JSON
resume_path = os.path.join(os.path.dirname(__file__), "resume.json")
if os.path.exists(resume_path):
    with open(resume_path, "r", encoding="utf-8") as f:
        resume_data = json.load(f)
    resume_context = json.dumps(resume_data)
else:
    resume_context = "Resume data not found."

# Initialize Groq LLM
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    max_retries=2,
)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True, silent=True)
        if not data or "message" not in data:
            return jsonify({"error": "Invalid request"}), 400
        user_input = data["message"]
        return jsonify({"response": f"Bot: {user_input}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

