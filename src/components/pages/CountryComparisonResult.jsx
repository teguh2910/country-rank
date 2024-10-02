import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CountryComparisonResult.css'; // Import your CSS file for styling

const CountryComparisonResult = () => {
  const query = new URLSearchParams(useLocation().search);
  const country1 = query.get('country1');
  const country2 = query.get('country2');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`https://restcountries.com/v3.1/name/${country1}`),
          axios.get(`https://restcountries.com/v3.1/name/${country2}`),
        ]);
        setData([res1.data[0], res2.data[0]]);
      } catch (err) {
        setError('Error fetching country data. Please check the country names.');
      }
    };

    fetchComparison();
  }, [country1, country2]);
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="comparison-container">
      <h1 className="title">Comparison: {data[0].name.common} vs {data[1].name.common}</h1>
      <div className="country-card">
        <h2>{data[0].name.common}</h2>
        <img src={data[0].flags.png} alt={`Flag of ${data[0].name.common}`} className="flag" />
        <p>Population: {(data[0].population/1000000).toFixed(0)}M</p>
        <p>Area: {formatNumber(data[0].area)} km²</p>
        <p>Region: {data[0].region}</p>
        <p>Subregion: {data[0].subregion}</p>
      </div>
      <div className="country-card">
        <h2>{data[1].name.common}</h2>
        <img src={data[1].flags.png} alt={`Flag of ${data[1].name.common}`} className="flag" />
        <p>Population: {(data[1].population/1000000).toFixed(0)}M</p>
        <p>Area: {formatNumber(data[1].area)} km²</p>
        <p>Region: {data[1].region}</p>
        <p>Subregion: {data[1].subregion}</p>
      </div>
    </div>
  );
};

export default CountryComparisonResult;
