import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/api/axiosInstance'
import { MutationFunction } from '@tanstack/react-query';

export interface Country {
    name: string
    capital: string
    population: string
    image: string
    likes: number
    deleted: boolean
}

const fetchCountriesData = async (sortOrder: 'asc' | 'desc'): Promise<Country[]> => {
    try {
        const sortQuery = sortOrder === 'asc' ? 'likes' : '-likes';
        const response = await axiosInstance.get(`/countries?_sort=${sortQuery}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data.map((country: any) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'No Capital',
            population: country.population.toString(),
            image: country.flags?.png || '',
            likes: country.likes,
            deleted: country.deleted || false,
        }));
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Could not fetch countries');
    }
};


export const useFetchCountries = (sortOrder: 'asc' | 'desc') => {
    return useQuery<Country[], Error>({
        queryKey: ['countries', sortOrder],
        queryFn: () => fetchCountriesData(sortOrder),
    });
};


export const addCountryToDatabase: MutationFunction<Country, Country> = async (newCountry: Country) => {
    const response = await fetch('/countries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCountry),
    });

    if (!response.ok) {
        throw new Error('Failed to add country');
    }

    return response.json();
};

