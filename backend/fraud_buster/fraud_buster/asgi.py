import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from your_app_name.consumers import MyWebSocketConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fraud_buster.settings')

# WebSocket routing
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/predict', MyWebSocketConsumer.as_asgi()),
        ])
    ),
})
