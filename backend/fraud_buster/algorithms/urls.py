from django.urls import path
from .views import get_stock_data
from .views import get_all_stock_symbols, get_all_news
urlpatterns = [
    path('stocks/<str:symbol>/', get_stock_data, name='get_stock_data'),
    path('stocks/', get_all_stock_symbols, name='get_all_stock_symbols'),  # New endpoint
    path('news/', get_all_news, name='get_all_news'),  # New endpoint
]
