from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from django.http import JsonResponse
from .models import Notification
from django.utils import timezone

# A simple API to create and send notifications (This could be triggered when fraud is detected)
from django.core.mail import send_mail

def send_notification(request, fraud_type, company_symbol, news_url):
    if request.method == 'POST':
        notification = Notification.objects.create(
            fraud_type=fraud_type,
            company_symbol=company_symbol,
            news_url=news_url,
            timestamp=timezone.now()
        )

        # Send email notification
        send_mail(
            f'Fraud Alert: {fraud_type} detected in {company_symbol}',
            f'A {fraud_type} fraud has been detected in {company_symbol}. Check details here: {news_url}',
            'your_email@example.com',
            ['recipient_email@example.com'],
            fail_silently=False,
        )

        return JsonResponse({
            'message': f'Notification sent for {fraud_type} in {company_symbol}',
            'timestamp': notification.timestamp
        })

    return JsonResponse({'error': 'Only POST requests are allowed.'})

from django.shortcuts import render

def fraud_notifications(request):
    return render(request, 'notification/notifications.html', {
        'notifications': Notification.objects.all()
    })
