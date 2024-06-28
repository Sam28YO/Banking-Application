import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Flag from 'react-world-flags';
import './NationalityTaxForm.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%', // Adjusted to take full width
    maxWidth: '400px', // Added max-width to limit width on larger screens
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f0f0f0' : '#fff',
    color: state.isSelected ? '#fff' : '#000',
    width: '100%', // Adjusted to take full width
    maxWidth: '400px', // Added max-width to limit width on larger screens
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '0',
    borderRadius: '4px',
    width: '100%', // Adjusted to take full width
    maxWidth: '400px', // Added max-width to limit width on larger screens
  }),
};

const CountrySelector = ({ placeholder }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map((country) => ({
          value: country.cca2,
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Flag code={country.cca2} style={{ width: '20px', marginRight: '10px' }} />
              {country.name.common}
            </div>
          ),
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <Select
      value={selectedCountry}
      onChange={handleChange}
      options={countries}
      styles={customStyles}
      placeholder={placeholder}
    />
  );
};

const NationalityTaxForm = () => {
  return (
    <div className="form-container">
      <div className="section">
        <h2>Your nationality/citizenship</h2>
        <hr />
        <p>What's your country of nationality/citizenship?</p>
        <CountrySelector placeholder="Select a country" />
      </div>
      <div className="section">
        <h2>Your tax details</h2>
        <hr />
        <p>In which country are you a tax resident?</p>
        <CountrySelector placeholder="Select a country" />
      </div>
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default NationalityTaxForm;
