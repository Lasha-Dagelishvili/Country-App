
import fs from 'fs';
import axios from 'axios';

const DATABASE_PATH = './database.json';

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    const processedCountries = countries.map(country => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'No Capital',
      population: country.population.toString(),
      image: country.flags?.png || '',
      likes: 0,
      deleted: false
    }));

    let database = { countries: [] };
    if (fs.existsSync(DATABASE_PATH)) {
      const rawData = fs.readFileSync(DATABASE_PATH, 'utf-8');
      database = JSON.parse(rawData);
    }

    database.countries = processedCountries;

    fs.writeFileSync(DATABASE_PATH, JSON.stringify(database, null, 2));
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

fetchCountries();
