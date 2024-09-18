import requests
import pandas as pd
import time
import cloudscraper



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
