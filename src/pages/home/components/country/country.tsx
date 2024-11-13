import { Country } from '@/api/countries/countries'

interface CountryCardProps {
    country: Country
    onLike?: () => void
    onDelete?: () => void
    onRestore?: () => void
    onEdit?: () => void
    isDeleted?: boolean
}

const CountryCard: React.FC<CountryCardProps> = ({
    country,
    onLike,
    onDelete,
    onEdit,
}) => (
    <div>
        <h3>{country.name}</h3>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Likes: {country.likes}</p>
        <button onClick={onLike}>Like</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
    </div>
)

export default CountryCard
