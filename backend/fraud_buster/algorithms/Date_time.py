import requests
from datetime import datetime
import time
import cloudscraper
import pandas as pd

def returnHoliday():
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
    public_holidays = []
    for holiday in holidays:
        public_holidays.append(holiday['date']['iso'])
    return public_holidays

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

Company_Symbol = ["ACLBSL", "ADBL", "ADBLB86"]
url = f'https://nepsealpha.com/trading/1/history?fsk=KU5gXshKvm55XW2t&symbol={Company_Symbol[0]}&resolution=1D&pass=ok'

scraper = cloudscraper.create_scraper()
time.sleep(5)
r = scraper.get(url, headers=headers)
json_data = r.json()
data = pd.DataFrame(json_data)
if "v" in data.columns:
    data = data.drop("v", axis=1)

if "t" in data.columns:
    data = data.drop("t", axis=1)    
print(data['o'][910])


