/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/pages/home/components/hero/Hero.css';
import countryImage from '@/pages/home/components/hero/pic/world.jpg';
import CountryCard from '@/pages/home/components/country/country';
import { useEffect, useReducer, useState, ChangeEvent } from 'react';

interface HeroProps {
  lang?: 'En' | 'Geo';
}

const translations = {
  En: {
    header: 'Countries App',
    title: 'Explore countries around the world',
    visit: 'Visit Beautiful Places',
    countryList: 'List of Countries',
    addCountry: 'Add Country',
    populationPlaceholder: 'Population',
    countryname: 'Country name',
    capital: 'capital'
  },
  Geo: {
    header: 'ქვეყნების აპი',
    title: 'გამოიკვლიეთ ქვეყნები მსოფლიოში',
    visit: 'ეწვიეთ ლამაზ ადგილებს',
    countryList: 'ქვეყნების სია',
    addCountry: 'დაამატეთ ქვეყანა',
    populationPlaceholder: 'მოსახლეობა',
    countryname: 'ქვეყნის სახელი',
    capital: 'დედაქალაქი'
  }
};

type Action = 
  | { type: 'SET_COUNTRIES'; payload: any[] }
  | { type: 'ADD_COUNTRY'; payload: any }
  | { type: 'DELETE_COUNTRY'; payload: number }
  | { type: 'RESTORE_COUNTRY'; payload: number }
  | { type: 'LIKE_COUNTRY'; payload: number }
  | { type: 'SORT_COUNTRIES'; payload: 'asc' | 'desc' };

interface State {
  countries: any[];
  deletedCountries: any[];
  sortOrder: 'asc' | 'desc';
}

const initialState: State = {
  countries: [],
  deletedCountries: [],
  sortOrder: 'asc',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload };

    case 'ADD_COUNTRY':
      return { ...state, countries: [...state.countries, action.payload] };

    case 'DELETE_COUNTRY': {
      const updatedCountries = [...state.countries];
      const countryToDelete = updatedCountries[action.payload];
      countryToDelete.deleted = true;
      updatedCountries.splice(action.payload, 1);

      return {
        ...state,
        countries: updatedCountries,
        deletedCountries: [...state.deletedCountries, countryToDelete],
      };
    }

    case 'RESTORE_COUNTRY': {
      const restoredCountry = state.deletedCountries[action.payload];
      restoredCountry.deleted = false;

      const updatedDeletedCountries = state.deletedCountries.filter(
        (_, idx) => idx !== action.payload
      );

      return {
        ...state,
        countries: [...state.countries, restoredCountry],
        deletedCountries: updatedDeletedCountries,
      };
    }

    case 'LIKE_COUNTRY': {
      const updatedCountries = [...state.countries];
      updatedCountries[action.payload].likes += 0.5;
      return { ...state, countries: updatedCountries };
    }

    case 'SORT_COUNTRIES': {
      const sortedCountries = [...state.countries].sort((a, b) => {
        return action.payload === 'asc' ? a.likes - b.likes : b.likes - a.likes;
      });
      return { ...state, countries: sortedCountries, sortOrder: action.payload };
    }

    default:
      return state;
  }
};  

const Hero: React.FC<HeroProps> = ({ lang = 'En' }) => {
  const t = translations[lang];

  const [showCountries, setShowCountries] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    population: '',
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: '',
    capital: '',
    population: '',
    image: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', capital: '', population: '', image: '' };

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Country name must be at least 3 characters long';
      isValid = false;
    }

    if (formData.capital.trim().length < 2) {
      newErrors.capital = 'Capital name must be at least 2 characters long';
      isValid = false;
    }

    if (!/^\d+$/.test(formData.population) || parseInt(formData.population) <= 0) {
      newErrors.population = 'Population must be a positive number';
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = 'Please upload an image';
      isValid = false;
    } else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
      newErrors.image = 'Only JPG or PNG files are allowed';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const addCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reader = new FileReader();
    reader.readAsDataURL(formData.image as Blob);
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const newCountry = {
        name: formData.name.trim(),
        capital: formData.capital.trim(),
        population: formData.population,
        image: base64Image,
        likes: 0,
        deleted: false,
      };

      dispatch({ type: 'ADD_COUNTRY', payload: newCountry });
      setFormData({ name: '', capital: '', population: '', image: null });
      setErrors({ name: '', capital: '', population: '', image: '' });
    };
  };

  const toggleCountries = () => setShowCountries(!showCountries);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryData = data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'No Capital',
          population: country.population.toLocaleString(),
          likes: 0,
          deleted: false
        }));
        dispatch({ type: 'SET_COUNTRIES', payload: countryData });
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleLike = (index: number) => {
    dispatch({ type: 'LIKE_COUNTRY', payload: index });
  };

  const handleSort = () => {
    dispatch({ type: 'SORT_COUNTRIES', payload: state.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: 'DELETE_COUNTRY', payload: index });
  };

  const handleRestore = (index: number) => {
    dispatch({ type: 'RESTORE_COUNTRY', payload: index });
  };

  return (
    <>
      <section>
        <div className="countries-artickle">{t.header}</div>
        <div className="picdiv">
          <img className="pic" src={countryImage} alt="Country" />
          <h2>{t.title}</h2>
        </div>
        <div className="text">{t.visit}</div> 
        <h3 className="countrylist" onClick={toggleCountries}>
          {t.countryList}
        </h3>

        <form onSubmit={addCountry}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t.countryname}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div>
            <input
              type="text"
              name="capital"
              value={formData.capital}
              onChange={handleInputChange}
              placeholder={t.capital}
              required
            />
            {errors.capital && <div className="error">{errors.capital}</div>}
          </div>

          <div>
            <input
              type="text"
              name="population"
              value={formData.population}
              onChange={handleInputChange}
              placeholder={t.populationPlaceholder}
              required
            />
            {errors.population && <div className="error">{errors.population}</div>}
          </div>

          <div>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              required
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </div>

          <button type="submit">{t.addCountry}</button>
        </form>

        {showCountries && (
          <>
            <button onClick={handleSort}>
              Sort by Likes ({state.sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>

            <div className="country-cards-container">
              {state.countries.map((country, index) => (
                <CountryCard
                  key={index}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  image={country.image}
                  likes={country.likes}
                  onLike={() => handleLike(index)}
                  onDelete={() => handleDelete(index)}
                  isDeleted={country.deleted}
                />
              ))}
            </div>

            <div className="deleted-country-article">Deleted Countries</div>

            <div className="deleted-country-cards-container">
              {state.deletedCountries.map((country, index) => (
                <CountryCard
                  key={index}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  image={country.image}
                  likes={country.likes}
                  isDeleted={true}
                  onRestore={() => handleRestore(index)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

Hero.displayName = "Hero component";

export default Hero;
