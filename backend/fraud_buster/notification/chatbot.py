import asyncio
import json
import requests  # For sending requests to the Gemini API
from cryptography.fernet import Fernet
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize the FastAPI app
app = FastAPI()

# CORS settings for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin for simplicity, you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Encryption key - in production, store this securely
encryption_key = Fernet.generate_key()
cipher_suite = Fernet(encryption_key)

# Your Gemini API URL and Token (replace these with actual ones)
GEMINI_API_URL = "https://api.gemini.com/v1/chatbot-response"
GEMINI_API_TOKEN = "your-gemini-api-token"

# Function to communicate with Gemini API
def get_gemini_response(user_query: str) -> str:
    try:
        headers = {
            "Authorization": f"Bearer {GEMINI_API_TOKEN}",
            "Content-Type": "application/json"
        }
        data = {"query": user_query}
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response.raise_for_status()
        return response.json().get("response", "No response from Gemini")
    except Exception as e:
        print(f"Error fetching response from Gemini API: {e}")
        return "Error in processing your request."

# WebSocket endpoint
@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Wait for the user query from the frontend
            user_data = await websocket.receive_text()
            user_query = json.loads(user_data).get("query")

            if user_query:
                # Get Gemini's response for the query
                gemini_response = get_gemini_response(user_query)

                # Encrypt the response
                encrypted_response = cipher_suite.encrypt(gemini_response.encode('utf-8'))

                # Send the encrypted response back to the user
                await websocket.send_text(encrypted_response.decode('utf-8'))
    except WebSocketDisconnect:
        print("Client disconnected")

# You can add more routes if needed
@app.get("/")
def root():
    return {"message": "Chatbot backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
