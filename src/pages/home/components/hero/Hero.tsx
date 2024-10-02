import '@/pages/home/components/hero/Hero.css';
import countryImage from '@/pages/home/components/hero/pic/world.jpg';
import country1 from '@/pages/home/components/hero/pic/country1.jpg';
import country2 from '@/pages/home/components/hero/pic/country2.jpg';
import country3 from '@/pages/home/components/hero/pic/country3.jpg';
import CountryCard from '@/pages/home/components/country/country'; 
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <section>
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
      </section>
    </>
  );
}
  Hero.displayName = "Hero component"

export default Hero;
