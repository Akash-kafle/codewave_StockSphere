from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('fraud_type', 'company_symbol', 'news_url', 'timestamp')
    list_filter = ('fraud_type', 'company_symbol')
    search_fields = ('company_symbol', 'fraud_type')
