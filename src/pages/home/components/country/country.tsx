import { Link } from 'react-router-dom';


const CountryCard = (
  { name, capital, population, image, likes = 0, onLike = () => {} }: 
  { name: string; capital: string; population: string; image: string; likes?: number; onLike?: () => void }
) => {
  return (
    <div className="card">
      <img src={image} alt={`Image of ${name}`} />
      <div className="info">
        <h2>{name}</h2>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Likes:</strong> {likes}</p>

        <Link to={`/country/${name}`}>
          <button>More Info</button>
        </Link>

        {onLike && <button onClick={onLike}>Like</button>}
      </div>
    </div>
  );
};

export default CountryCard;
