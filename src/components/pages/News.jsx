import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

const NewsItem = ({ title, url, published_date, abstract }) => (
  <div className="news-item">
    <h3>{title}</h3>
    <p className="date">{published_date}</p>
    <p>{abstract}</p>
    <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
  </div>
);

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${import.meta.env.VITE_API_KEY}`);
        setArticles(response.data.results);
      } catch (err) {
        setError('Error fetching news articles.');
      }
    };

    fetchArticles();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!articles.length) return <div className="loading">Loading...</div>;

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <div className="news-grid">
        {articles.map((article, index) => (
          <NewsItem key={index} title={article.title} url={article.url} published_date={article.published_date} abstract={article.abstract} />
        ))}
      </div>
    </div>
  );
};

export default News;
