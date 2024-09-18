import pandas as pd
from django.http import JsonResponse
from django.conf import settings
from pathlib import Path
from News_Sending import get_data
import os
# BASE_DIR = settings.BASE_DIR
def get_stock_data(request, symbol):
    BASE_DIR = Path(__file__).resolve().parent.parent
    # Path to the CSV file
    print(BASE_DIR)
    csv_file_path = os.path.join(BASE_DIR, 'CSV_files', f'{symbol}.csv')
   
    # Check if the file exists
    if not os.path.isfile(csv_file_path):
        return JsonResponse({'error': 'File not found'}, status=404)

    # Read CSV file and convert to JSON
    df = pd.read_csv(csv_file_path)
    data = df.to_dict(orient='records')

    return JsonResponse(data, safe=False)

def get_all_stock_symbols(request):
    # Get the base directory of the project
    BASE_DIR = Path(__file__).resolve().parent.parent

    # Path to the CSV files directory
    csv_dir_path = os.path.join(BASE_DIR, 'CSV_files')

    # List all CSV files in the directory
    try:
        stock_symbols = [f.replace('.csv', '') for f in os.listdir(csv_dir_path) if f.endswith('.csv')]
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse(stock_symbols, safe=False)

def get_all_news(request):
    # Get the base directory of the project
    BASE_DIR = Path(__file__).resolve().parent.parent

    # Path to the CSV files directory
    

    # List all CSV files in the directory
    try:
        news = os.path.join(BASE_DIR, 'nepse_stock_news.csv')
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    data = pd.read_csv(news)
    data = data.to_dict(orient='records')

    return JsonResponse(data,{
        "anomoaly_date":  get_data()
    }, safe=False)

