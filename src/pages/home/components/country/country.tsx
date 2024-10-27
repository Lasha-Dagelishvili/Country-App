import { Link } from 'react-router-dom'

const CountryCard = ({
    name,
    capital,
    population,
    image,
    likes = 0,
    onLike = () => {},
    onDelete = () => {},
    onRestore = () => {},
    isDeleted = false,
}: {
    name: string
    capital: string
    population: string
    image: string
    likes?: number
    onLike?: () => void
    onDelete?: () => void
    onRestore?: () => void
    isDeleted?: boolean
}) => {
    return (
        <div className={`card ${isDeleted ? 'deleted' : ''}`}>
            <img src={image} alt={`Image of ${name}`} />
            <div className="info">
                <h2>{name}</h2>
                <p>
                    <strong>Capital:</strong> {capital}
                </p>
                <p>
                    <strong>Population:</strong> {population}
                </p>
                <p>
                    <strong>Likes:</strong> {likes}
                </p>

                {!isDeleted && (
                    <>
                        <Link to={`/country/${name}`}>
                            <button>More Info</button>
                        </Link>
                        <button onClick={onLike}>Like</button>
                        <button onClick={onDelete}>Delete</button>
                    </>
                )}

                {isDeleted && <button onClick={onRestore}>Restore</button>}
            </div>
        </div>
    )
}

export default CountryCard
