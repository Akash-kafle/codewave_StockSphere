
from django.urls import path
from .views import fraud_notifications,send_notification

urlpatterns = [
    path('view/', send_notification),  # New URL to display the notifications
    path('send/<str:fraud_type>/<str:company_symbol>/<path:news_url>/', fraud_notifications, name='send_notification'),
]
