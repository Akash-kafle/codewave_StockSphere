import json
from channels.generic.websocket import AsyncWebsocketConsumer

class MyWebSocketConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Called when the socket is handshaking as part of the connection
        await self.accept()

    async def disconnect(self, close_code):
        # Called when the WebSocket closes
        pass

    async def receive(self, text_data):
        # Receive a message and send it back as a WebSocket message
        data = json.loads(text_data)
        message = data.get('message')

        # Echo the received message back to the client
        await self.send(text_data=json.dumps({
            'message': f"Echo: {message}"
        }))
