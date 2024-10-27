import '@/pages/home/components/hero/Hero.css';
import countryImage from '@/pages/home/components/hero/pic/world.jpg';
import CountryCard from '@/pages/home/components/country/country';
import { useEffect, useReducer, useState } from 'react';

type Action = 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'SET_COUNTRIES'; payload: any[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'ADD_COUNTRY'; payload: any }
  | { type: 'DELETE_COUNTRY'; payload: number }
  | { type: 'RESTORE_COUNTRY'; payload: number }
  | { type: 'LIKE_COUNTRY'; payload: number }
  | { type: 'SORT_COUNTRIES'; payload: 'asc' | 'desc' };

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countries: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deletedCountries: any[];
  sortOrder: 'asc' | 'desc';
}

const initialState: State = {
    countries: [],
    deletedCountries: [],
    sortOrder: 'asc',
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return { ...state, countries: action.payload }

        case 'ADD_COUNTRY':
            return { ...state, countries: [...state.countries, action.payload] }

        case 'DELETE_COUNTRY': {
            const updatedCountries = [...state.countries]
            const countryToDelete = updatedCountries[action.payload]
            countryToDelete.deleted = true
            updatedCountries.splice(action.payload, 1)

            return {
                ...state,
                countries: updatedCountries,
                deletedCountries: [...state.deletedCountries, countryToDelete],
            }
        }

        case 'RESTORE_COUNTRY': {
            const restoredCountry = state.deletedCountries[action.payload]
            restoredCountry.deleted = false

            const updatedDeletedCountries = state.deletedCountries.filter(
                (_, idx) => idx !== action.payload,
            )

            return {
                ...state,
                countries: [...state.countries, restoredCountry],
                deletedCountries: updatedDeletedCountries,
            }
        }

        case 'LIKE_COUNTRY': {
            const updatedCountries = [...state.countries]
            updatedCountries[action.payload].likes += 0.5
            return { ...state, countries: updatedCountries }
        }

        case 'SORT_COUNTRIES': {
            const sortedCountries = [...state.countries].sort((a, b) => {
                return action.payload === 'asc'
                    ? a.likes - b.likes
                    : b.likes - a.likes
            })
            return {
                ...state,
                countries: sortedCountries,
                sortOrder: action.payload,
            }
        }

    default:
      return state;
  }
};  


const Hero: React.FC = () => {
  const [showCountries, setShowCountries] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const toggleCountries = () => setShowCountries(!showCountries);

    const handleLike = (index: number) => {
        dispatch({ type: 'LIKE_COUNTRY', payload: index })
    }

    const handleSort = () => {
        dispatch({
            type: 'SORT_COUNTRIES',
            payload: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })
    }

    const handleDelete = (index: number) => {
        dispatch({ type: 'DELETE_COUNTRY', payload: index })
    }

  const handleRestore = (index: number) => {
    dispatch({ type: 'RESTORE_COUNTRY', payload: index });
  };

  const addCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const capital = formData.get('capital') as string;
    const population = formData.get('population') as string;

    const newCountry = {
      name,
      capital,
      population,
      likes: 0,
      deleted: false
    };
    dispatch({ type: 'ADD_COUNTRY', payload: newCountry });
  };

  return (
    <>
      <section>
        <div className="countries-artickle">
          Countries App
        </div>
        
        <div className="picdiv">
          <img className="pic" src={countryImage} alt="Country" />
          <h2>Explore countries around the world</h2>
        </div>

        <div className="text">Visit Beautiful Places</div>

        <h3 className="countrylist" onClick={toggleCountries}>
          List of Countries
        </h3>

        <form onSubmit={addCountry}>
          <input type="text" name="name" placeholder="Country name" required />
          <input type="text" name="capital" placeholder="Capital" required />
          <input type="text" name="population" placeholder="Population" required />
          <button type="submit">Add Country</button>
        </form>

                {showCountries && (
                    <>
                        <button onClick={handleSort}>
                            Sort by Likes (
                            {state.sortOrder === 'asc'
                                ? 'Ascending'
                                : 'Descending'}
                            )
                        </button>

            <div className="country-cards-container">
              {state.countries.map((country, index) => (
                <CountryCard
                  key={index}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  image={countryImage}
                  likes={country.likes}
                  onLike={() => handleLike(index)}
                  onDelete={() => handleDelete(index)}
                  isDeleted={country.deleted}
                />
              ))}
            </div>

                        <div className="deleted-country-article">
                            Deleted Countries
                        </div>

            <div className="deleted-country-cards-container">
              {state.deletedCountries.map((country, index) => (
                <CountryCard
                  key={index}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  image={countryImage}
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
