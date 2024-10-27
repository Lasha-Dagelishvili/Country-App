import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './countrydetails.css'

interface Country {
    name: {
        common: string
    }
    flags: {
        png: string
    }
    capital?: string[]
    population: number
    region: string
    subregion: string
    area: number
    languages?: { [key: string]: string }
    currencies?: { [key: string]: { name: string } }
    timezones: string[]
}

const CountryDetails = () => {
    const { name } = useParams<{ name: string }>()
    const [country, setCountry] = useState<Country | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!name) return

        fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then((response) => response.json())
            .then((data) => {
                const countryData = data.find(
                    (country: Country) => country.name.common === name,
                )
                if (countryData) {
                    setCountry(countryData)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching country details:', error)
                setLoading(false)
            })
    }, [name])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!country) {
        return <div>Country not found.</div>
    }

    return (
        <div className="country-details">
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <p>
                <strong>Capital:</strong>{' '}
                {country.capital ? country.capital[0] : 'No Capital'}
            </p>
            <p>
                <strong>Population:</strong>{' '}
                {country.population.toLocaleString()}
            </p>
            <p>
                <strong>Region:</strong> {country.region}
            </p>
            <p>
                <strong>Subregion:</strong> {country.subregion}
            </p>
            <p>
                <strong>Area:</strong> {country.area.toLocaleString()} km²
            </p>
            <p>
                <strong>Languages:</strong>{' '}
                {Object.values(country.languages || {}).join(', ')}
            </p>
            <p>
                <strong>Currencies:</strong>{' '}
                {Object.values(country.currencies || {})
                    .map((currency) => currency.name)
                    .join(', ')}
            </p>
            <p>
                <strong>Timezone:</strong> {country.timezones.join(', ')}
            </p>
        </div>
    )
}

export default CountryDetails;
