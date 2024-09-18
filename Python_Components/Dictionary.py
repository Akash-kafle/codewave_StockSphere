import datetime
import requests

def generate_datetime_array():
    user_input = input("Enter a datetime (YYYY-MM-DD): ")

    try:
        start_datetime = datetime.datetime.strptime(user_input, "%Y-%m-%d")
    except ValueError:
        print("Invalid datetime format. Please use YYYY-MM-DD.")
        return

    end_datetime = datetime.datetime.now().date()

    datetime_array = []
    current_datetime = start_datetime.date()
    while current_datetime <= end_datetime:
        datetime_array.append(current_datetime)
        current_datetime += datetime.timedelta(days=1)

    return datetime_array

def was_saturday(date_str):
    if not isinstance(date_str, str):
        raise TypeError("The input must be a string in YYYY-MM-DD format.")
    
    try:
        # Parse the input string to a datetime object
        date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return False
    
    # Check if the date is a Saturday
    if(date.weekday()==4 or date.weekday()==5):
        return True
    else:
        return False

def returnHoliday():
    API_KEY = 'wXowMQ9wUdpYSmP4fCvl1hMnQhegbPSV'
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    today_day = datetime.datetime.now().strftime("%A")
    print(today_day)
    country_code = 'NP'
    url = f'https://calendarific.com/api/v2/holidays?api_key={API_KEY}&country={country_code}&year={datetime.datetime.now().year}'
    response = requests.get(url)
    holidays = response.json()['response']['holidays']
    is_holiday = False
    holiday_name = ""
    public_holidays = []
    for holiday in holidays:
        public_holidays.append(holiday['date']['iso'])
    return public_holidays


datetime_list = generate_datetime_array()
public_holidays = returnHoliday()
if datetime_list:
    for dt in datetime_list:
        print(dt)
    print("First loop for date Finished")
    
filtered_dates = [dt for dt in datetime_list if not (was_saturday(str(dt)) or dt in public_holidays)]
print(str(filtered_dates))

