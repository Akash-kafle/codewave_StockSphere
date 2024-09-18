from newsapi import NewsApiClient
import pandas as pd
from math import ceil
import datetime as dt

# Initialize the News API client (Replace 'your_api_key' with your actual API key)
newsapi = NewsApiClient(api_key='c36323f62a50434fabed345aba410bbe')

# Define the query to fetch news about NEPSE (Nepal Stock Exchange)
query = 'NEPSE stock Nepal'

# Fetch news articles about NEPSE
data = newsapi.get_everything(q=query, 
                              language='en',  # You can change to 'ne' if you want Nepali news sources.
                              from_param=(dt.datetime.now() - dt.timedelta(days=30)).strftime('%Y-%m-%d'), 
                              to=dt.datetime.now().strftime('%Y-%m-%d'),
                              sort_by='relevancy', 
                              page_size=100)

# Check how many total articles were found
total_articles = data['totalResults']
print(f'Total articles found: {total_articles}')

# Get the articles data
articles = data['articles'].copy()

# Calculate the total number of pages
num_pages = ceil(total_articles / 100)

# Loop through the pages to get all articles if necessary
for p in range(2, num_pages + 1):
    data = newsapi.get_everything(q=query, 
                                  language='en',
                                  from_param=(dt.datetime.now() - dt.timedelta(days=7)).strftime('%Y-%m-%d'), 
                                  to=dt.datetime.now().strftime('%Y-%m-%d'),
                                  sort_by='relevancy', 
                                  page_size=100,
                                  page=p)
    articles.extend(data['articles'])

# Create a list of dictionaries containing date, title, and URL
news_list = []
for article in articles:
    news_item = {
        'published_at': article['publishedAt'],
        'title': article['title'],
        'url': article['url'],
        'source': article['source']['name']
    }
    news_list.append(news_item)

# Convert the list into a DataFrame
df = pd.DataFrame(news_list)

# Convert published_at to datetime format
df['published_at'] = pd.to_datetime(df['published_at'])

# Save the DataFrame to a CSV file
csv_file_path = 'nepse_stock_news.csv'
df.to_csv(csv_file_path, index=False)

print(f"News data saved to {csv_file_path}")
