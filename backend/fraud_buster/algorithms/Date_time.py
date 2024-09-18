import requests
from datetime import datetime,timedelta
import time
import cloudscraper
import pandas as pd
import csv


from datetime import datetime



def generate_datetime_array():
    user_input = input("Enter a datetime (YYYY-MM-DD): ")

    try:
        start_datetime = datetime.strptime(user_input, "%Y-%m-%d")
    except ValueError:
        print("Invalid datetime format. Please use YYYY-MM-DD.")
        return

    end_datetime = datetime.now().date()

    datetime_array = []
    current_datetime = start_datetime.date()
    while current_datetime <= end_datetime:
        datetime_array.append(current_datetime)
        current_datetime += timedelta(days=1)

    return datetime_array
def returnHoliday():
    API_KEY = 'wXowMQ9wUdpYSmP4fCvl1hMnQhegbPSV'
    today = datetime.now().strftime("%Y-%m-%d")
    today_day = datetime.now().strftime("%A")
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
def was_saturday(date_str):
    if not isinstance(date_str, str):
        raise TypeError("The input must be a string in YYYY-MM-DD format.")
    
    try:
        # Parse the input string to a datetime object
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return False
    
    # Check if the date is a Saturday
    if(date.weekday()==4 or date.weekday()==5):
        return True
    else:
        return False


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
Company_Symbol = ["ACLBSL", "ADBL", "BBC","BOKL","CEFL","DHPL","EBL","FMDBL","FHL","ICFC","HURJA","JBLB","IME"]
for a in Company_Symbol:
    datetime_list = generate_datetime_array()
    public_holidays = returnHoliday()
    Array_index = len(datetime_list)
    url = f'https://nepsealpha.com/trading/1/history?fsk=KU5gXshKvm55XW2t&symbol={a}&resolution=1D&pass=ok'
    scraper = cloudscraper.create_scraper()
    time.sleep(5)
    r = scraper.get(url, headers=headers)
    json_data = r.json()
    data = pd.DataFrame(json_data)
    data = data.drop("t", axis=1)
    data = data.drop("s", axis=1)
    #910
    data = data[-Array_index:]
    print("Data printing")
    print(data)

    
    workingNEPSEdates = []
    if datetime_list:
        for dt in datetime_list:
            workingNEPSEdates.append(dt.strftime("%Y-%m-%d"))
            if(dt in public_holidays or was_saturday(str(dt))):
                workingNEPSEdates.remove(dt.strftime("%Y-%m-%d"))

    print("Checkking working dates and printing data")
    print(workingNEPSEdates)
    print(data)
    x = len(workingNEPSEdates)
    print(x)
    data = data[-x:]
    data.insert(0, "TimeStamp", workingNEPSEdates)
    print(data)
    csv_file_path = f'../CSV_files/{a}.csv'  # Specify the file path
    data.to_csv(csv_file_path, index=False)  # Set index=False to avoid saving the index

    print(f"Data has been saved to {csv_file_path}")

print("The loop has ended")

