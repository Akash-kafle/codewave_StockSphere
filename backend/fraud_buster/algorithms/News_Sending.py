import requests
from datetime import datetime, timedelta
from django.http import JsonResponse
import time
import cloudscraper
import pandas as pd
import os

API_KEY = 'wXowMQ9wUdpYSmP4fCvl1hMnQhegbPSV'
COUNTRY_CODE = 'NP'

# Generate a list of dates from the past 30 days up to today
def generate_datetime_array(days=30):
    start_datetime = datetime.now() - timedelta(days=days)
    end_datetime = datetime.now().date()

    return [start_datetime.date() + timedelta(days=i) for i in range((end_datetime - start_datetime.date()).days + 1)]

# Get public holidays using the Calendarific API
def get_public_holidays():
    url = f'https://calendarific.com/api/v2/holidays?api_key={API_KEY}&country={COUNTRY_CODE}&year={datetime.now().year}'
    response = requests.get(url)
    holidays = response.json()['response']['holidays']
    
    # Return a list of holiday dates in ISO format
    return [holiday['date']['iso'] for holiday in holidays]

# Check if the given date is a weekend (Saturday or Friday)
def is_weekend(date_str):
    if not isinstance(date_str, str):
        raise TypeError("Input must be a string in YYYY-MM-DD format.")
    
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return False

    # Return True if the day is Friday (4) or Saturday (5)
    return date.weekday() in [4, 5]

# Fetch and process data for the given company symbols
def fetch_company_data(symbol, datetime_list, public_holidays):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    url = f'https://nepsealpha.com/trading/1/history?fsk=KU5gXshKvm55XW2t&symbol={symbol}&resolution=1D&pass=ok'
    scraper = cloudscraper.create_scraper()
    time.sleep(5)
    
    r = scraper.get(url, headers=headers)
    if r.status_code != 200:
        print(f"Failed to fetch data for {symbol}. Status code: {r.status_code}")
        return None
    
    # Process and filter data
    json_data = r.json()
    data = pd.DataFrame(json_data).drop(['t', 's'], axis=1)
    data = data[-len(datetime_list):]  # Limit data to match datetime_list

    working_dates = [dt.strftime("%Y-%m-%d") for dt in datetime_list if dt.strftime("%Y-%m-%d") not in public_holidays and not is_weekend(str(dt))]

    data = data[-len(working_dates):]
    data.insert(0, "TimeStamp", working_dates)

    return data

# Main function to get stock data and find significant changes
def get_data():
    company_symbols = ["ACLBSL", "ADBL"]
    datetime_list = generate_datetime_array()
    public_holidays = get_public_holidays()
    
    results = {}
    
    for symbol in company_symbols:
        results[symbol] = []
        
        # Fetch company-specific data
        data = fetch_company_data(symbol, datetime_list, public_holidays)
        if data is None:
            continue

        # Get closing prices and timestamps
        closing_prices = data['c'].tolist()
        timestamps = data['TimeStamp'].tolist()

        # Find significant difference in prices
        first_price = float(closing_prices[0])
        req_index = None

        for index, price in enumerate(closing_prices):
            if abs(first_price - float(price)) >= 5:
                req_index = index
                print(f"Index with significant difference: {index}, Value: {price}")
                break
        
        if req_index is not None:
            results[symbol].append(timestamps[req_index])
    
    return results

if __name__ == "__main__":
    print(get_data())
