import requests
from datetime import datetime


API_KEY = 'wXowMQ9wUdpYSmP4fCvl1hMnQhegbPSV'
today = datetime.now().strftime("%Y-%m-%d")
country_code = 'NP'
url = f'https://calendarific.com/api/v2/holidays?api_key={API_KEY}&country={country_code}&year={datetime.now().year}'

response = requests.get(url)
holidays = response.json()['response']['holidays']

is_holiday = False
holiday_name = ""

print(today)
print(holidays[0])
# for holiday in holidays:
#     if holiday['date']['iso'] == today:
#         is_holiday = True
#         holiday_name = holiday['name']
#         break

# if is_holiday:
#     print(f"Today is a holiday in Nepal: {holiday_name}")
# else:
#     print("Today is not a holiday in Nepal.")
