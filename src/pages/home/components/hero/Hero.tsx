import '@/pages/home/components/hero/Hero.css';
import countryImage from '@/pages/home/components/hero/pic/world.jpg';
import CountryCard from '@/pages/home/components/country/country';
import { useState, useEffect } from 'react';


const Hero: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countries, setCountries] = useState<any[]>([]);
  const [showCountries, setShowCountries] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countryData = data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'No Capital',
          population: country.population.toLocaleString(),
          likes: 0
        }));
        setCountries(countryData);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const toggleCountries = () => {
    setShowCountries(!showCountries);
  };

  const handleLike = (index: number) => {
    const updatedCountries = [...countries];
    updatedCountries[index].likes += 1;
    setCountries(updatedCountries);
  };

  const handleSort = () => {
    const sortedCountries = [...countries].sort((a, b) => {
      return sortOrder === 'asc' ? a.likes - b.likes : b.likes - a.likes;
    });
    setCountries(sortedCountries);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <section>
        <h1>Countries App</h1>
        <div className="picdiv">
          <img className="pic" src={countryImage} alt="Country" />
          <h2>Explore countries around the world</h2>
        </div>

        <div className="text">Visit Beautiful Places</div>

        <h3 className="countrylist" onClick={toggleCountries}>
          List of Countries
        </h3>

        {showCountries && (
          <>
            <button onClick={handleSort}>
              Sort by Likes ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>

            <div className="country-cards-container">
              {countries.map((country, index) => (
                <CountryCard
                  key={index}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  image={countryImage}
                  likes={country.likes}
                  onLike={() => handleLike(index)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

 Hero.displayName = "Hero component"

export default Hero;

