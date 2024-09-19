import React, { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/algorithms/news/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Latest News</h1>
      <ul className="space-y-4">
        {news.map((item, index) => (
          <li key={index} className="border-b pb-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-500 hover:underline"
            >
              {item.title}
            </a>
            <div className="mt-2 text-gray-600">
              <span className="font-medium">Source:</span> {item.source}
            </div>
            <div className="text-gray-500">
              <span className="font-medium">Published At:</span>{' '}
              {new Date(item.published_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
