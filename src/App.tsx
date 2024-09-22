import './App.css';
import countryImage from './pic/world.jpg';
import country1 from './pic/country1.jpeg';
import country2 from './pic/country2.jpg';
import country3 from './pic/country3.jpeg';
import CountryCard from './country'; 
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryData = data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'No Capital',
          population: country.population.toLocaleString(),
        }));
        setCountries(countryData);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const toggleCountries = () => {
    setShowCountries(!showCountries);
  };

  return (
    <>
      <header>
        <h1>Countries App</h1>
        <div className='picdiv'>
          <img className='pic' src={countryImage} alt="Country" />
          <h2>Explore countries around the world</h2>
        </div>

        <div className="text">Visit Beautiful Places</div>

        <div className="card-container">
          <CountryCard name="Japan" capital="Tokyo" population="125,800,000" image={country1} />
          <CountryCard name="USA" capital="Washington D.C." population="331,893,745" image={country2} />
          <CountryCard name="Georgia" capital="Tbilisi" population="3,720,000" image={country3} />
        </div>

        <h3 className='countrylist' onClick={toggleCountries}>
          List of Countries
        </h3>

        {showCountries && (
          <div className="country-cards-container">
            {countries.map((country, index) => (
              <div key={index} className="country-card">
                <h2>{country.name}</h2>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Population:</strong> {country.population}</p>
              </div>
            ))}
          </div>
        )}


      </header>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Countries App</h3>
            <p>Discover details about different countries around the world.</p>
          </div>

          <div className="footer-section links">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Explore</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@countriesapp.com</p>
            <p>Phone: +123 456 789</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Countries App | All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default App;
