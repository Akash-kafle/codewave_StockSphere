import asyncio
import json
import requests  # For sending requests to the Gemini API
from cryptography.fernet import Fernet
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
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
GEMINI_API_URL = os.environ.get("GEMINI_API_URL")
key = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key = 'AIzaSyB2xBuVc0XzyCL7-c6sweCNyQ12cIahSoA')

# Function to communicate with Gemini API
async def get_gemini_response(user_query: str) -> str:
    try:
        
        data = {"query": user_query}
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(data.get("query"))
        return response.text
    except Exception as e:
        print(f"Error fetching response from Gemini API: {e}")
        return "Error in processing your request."

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            user_data = await websocket.receive_text()
            user_query = json.loads(user_data).get("query")

            if user_query:
                gemini_response = await get_gemini_response(user_query)
                # encrypted_response = cipher_suite.encrypt(gemini_response.encode('utf-8'))
                await websocket.send_text(gemini_response)
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        await websocket.close()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Fraud Buster Chatbot!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8001)