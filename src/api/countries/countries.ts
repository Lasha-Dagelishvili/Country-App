
import { useQuery, } from '@tanstack/react-query'
import axiosInstance from '@/api/axiosInstance'

export interface Country {
    name: string
    capital: string
    population: string
    image: string
    likes: number
    deleted: boolean
}

const fetchCountriesData = async (): Promise<Country[]> => {
    try {
        const response = await axiosInstance.get('/all')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data.map((country: any) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'No Capital',
            population: country.population.toString(),
            image: country.flags?.png || '',
            likes: 0,
            deleted: false,
        }))
    } catch (error) {
        console.error('Error fetching countries:', error)
        throw new Error('Could not fetch countries')
    }
}

export const useFetchCountries = () => {
    return useQuery<Country[], Error>({
        queryKey: ['countries'],
        queryFn: fetchCountriesData,
    })
}

export const addCountryToDatabase = async (newCountry: Country): Promise<Country> => {
    try {
        const response = await axiosInstance.post('/add-country', newCountry)
        return response.data
    } catch (error) {
        console.error('Error adding country:', error)
        throw new Error('Could not add country')
    }
}
