

function CountryCard({ name, capital, population, image }: { name: string, capital: string, population: string, image: string }) {
  return (
    <div className="card">
      <img src={image} alt={`Image of ${name}`} />
      <div className="info">
        <h2>{name}</h2>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Population:</strong> {population}</p>
      </div>
    </div>
  );
}

export default CountryCard;
