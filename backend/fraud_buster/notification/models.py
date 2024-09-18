from django.db import models

# Create your models here.

from django.db import models
from django.utils import timezone

class Notification(models.Model):
    FRAUD_TYPES = [
        ('Pump and Dump', 'Pump and Dump'),
        ('Wash Trading', 'Wash Trading'),
        ('Insider Trading', 'Insider Trading'),
        ('Short and Distort', 'Short and Distort'),
    ]

    fraud_type = models.CharField(max_length=50, choices=FRAUD_TYPES)
    company_symbol = models.CharField(max_length=10)
    news_url = models.URLField()
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.company_symbol} - {self.fraud_type} at {self.timestamp}"
