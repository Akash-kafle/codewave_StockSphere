import requests
import pandas as pd
from datetime import datetime
from datetime import datetime

def isHoliday():
    API_KEY = 'wXowMQ9wUdpYSmP4fCvl1hMnQhegbPSV'
    today = datetime.now().strftime("%Y-%m-%d")
    today_day = datetime.now().strftime("%A")
    print(today_day)
    country_code = 'NP'
    url = f'https://calendarific.com/api/v2/holidays?api_key={API_KEY}&country={country_code}&year={datetime.now().year}'
    response = requests.get(url)
    holidays = response.json()['response']['holidays']
    is_holiday = False
    holiday_name = ""
    holidays=holidays[22:30]
    public_holidays = []
    for holiday in holidays:
        public_holidays.append(holiday['date']['iso'])
    if today in public_holidays or today_day == "Saturday" or today_day == "Friday":
        return True
    else:
        return False
    

