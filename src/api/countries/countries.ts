
import axios from 'axios';

export interface Country {
  name: string;
  capital: string;
  population: string;
  image: string;
  likes: number;
  deleted: boolean;
}

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.map((country: any) => ({
    name: country.name.common,
    capital: country.capital ? country.capital[0] : 'No Capital',
    population: country.population.toString(),
    image: country.flags?.png || '',
    likes: 0,
    deleted: false
  }));
};