import { Link } from 'react-router-dom';

const CountryCard = (
  { name, capital, population, image}: 
  { name: string, capital: string, population: string, image: string }
) => {
  return (
    <div className="card">
      <img src={image} alt={`Image of ${name}`} />
      <div className="info">
        <h2>{name}</h2>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Population:</strong> {population}</p>

        <Link to={`/country/${name}`}>
          <button>More | Info</button>
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
