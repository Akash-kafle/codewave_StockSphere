import pandas as pd
from django.http import JsonResponse
from django.conf import settings
from pathlib import Path
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
