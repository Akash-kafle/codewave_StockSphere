from django.db import models

# Create your models here.
#
# 1. Pump and Dump:
# Algorithm: Isolation Forest
# Why: Detects outliers in stock price and volume surges over short periods, identifying unusual activity that may indicate price manipulation.
# 2. Insider Trading:
# Algorithm: Support Vector Machine (SVM) with time-series analysis
# Why: Tracks unusual trading volume before key stock events and classifies it as suspicious or normal using historical trends.
# 3. Wash Trading:
# Algorithm: Hidden Markov Models (HMM)
# Why: Detects repetitive, coordinated buy/sell patterns by modeling transitions between trading states over time.
# 4. Front Running:
# Algorithm: K-Nearest Neighbors (KNN)
# Why: Matches patterns of small-scale trades followed by larger trades, identifying the illegal practice of executing orders before others.
#
# # 

#1. Pump and Dump
class PumpAndDump(models.Model):
    name = models.CharField(max_length=50)
    algorithm = models.CharField(max_length=50)
    why = models.TextField()

#2. Insider Trading
class InsiderTrading(models.Model):
    name = models.CharField(max_length=50)
    algorithm = models.CharField(max_length=50)
    why = models.TextField()

#3. Wash Trading
class WashTrading(models.Model):
    name = models.CharField(max_length=50)
    algorithm = models.CharField(max_length=50)
    why = models.TextField()

#4. Front Running
class FrontRunning(models.Model):
    name = models.CharField(max_length=50)
    algorithm = models.CharField(max_length=50)
    why = models.TextField()