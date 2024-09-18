from django.urls import re_path
from .consumers import MyWebSocketConsumer

websocket_urlpatterns = [
    re_path(r'ws/', MyWebSocketConsumer.as_asgi()),
]
