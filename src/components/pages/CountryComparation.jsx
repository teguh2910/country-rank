import React, { useEffect, useState } from 'react';
import './CountryComparation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CountryComparation = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map((country) => country.name.common);
        setCountriesList(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountry1Change = (e) => {
    const value = e.target.value;
    setCountry1(value);
    setSuggestions1(
      value ? countriesList.filter(country => country.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleCountry2Change = (e) => {
    const value = e.target.value;
    setCountry2(value);
    setSuggestions2(
      value ? countriesList.filter(country => country.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleSuggestionClick = (country, isCountry1) => {
    if (isCountry1) {
      setCountry1(country);
      setSuggestions1([]);
    } else {
      setCountry2(country);
      setSuggestions2([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/compare?country1=${country1}&country2=${country2}`);
  };

  return (
    <div className="cc-container">
      <div className="cc-content">
        <form onSubmit={handleSubmit}>
          <div className="cc-form-group">
            <label htmlFor="country1">Country 1:</label>
            <input
              type="text"
              id="country1"
              name="country1"
              value={country1}
              onChange={handleCountry1Change}
              autoComplete="off"
            />
            {suggestions1.length > 0 && (
              <ul className="suggestions">
                {suggestions1.map((country, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(country, true)}>
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="cc-form-group">
            <label htmlFor="country2">Country 2:</label>
            <input
              type="text"
              id="country2"
              name="country2"
              value={country2}
              onChange={handleCountry2Change}
              autoComplete="off"
            />
            {suggestions2.length > 0 && (
              <ul className="suggestions">
                {suggestions2.map((country, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(country, false)}>
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit">Compare</button>
        </form>
      </div>
    </div>
  );
};

export default CountryComparation;
