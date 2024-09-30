import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables CSS
import $ from 'jquery';
import 'datatables.net';

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const sortedCountries = response.data
        .map((country) => ({
          name: country.name.common,
          population: country.population,
          cca2: country.cca2,
        }))
        .sort((a, b) => b.population - a.population); // Urutkan berdasarkan populasi

      setCountries(sortedCountries);
    };
    fetchCountries();
  }, []);
  useEffect(() => {
    // Initialize DataTable when countries data is loaded
    if (countries.length) {
      $('#countriesTable').DataTable({
        pageLength: 10, // Menampilkan 10 item per halaman
        //disable auto shorting
        "bSort": false,

      });
    }
  }, [countries]);
  return (
    <div className='table'>
      <h1>Country Population Rankings</h1>
      <table id="countriesTable" className="display">
        <thead>
          <tr>
            <th>Country</th>
            <th>Population</th>
            <th>Code (CCA2)</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.cca2}>
              <td>{country.name}</td>
              <td>{(country.population / 1000000).toFixed(0)}M</td>
              <td>{country.cca2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
