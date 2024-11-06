import '@/pages/home/components/hero/Hero.css'
import countryImage from '@/pages/home/components/hero/pic/world.jpg'
import CountryCard from '@/pages/home/components/country/country'
import { useEffect, useReducer, useState, ChangeEvent } from 'react'
import { fetchCountries } from '@/api/countries/countries'

interface HeroProps {
    lang?: 'En' | 'Geo'
}

interface Country {
    name: string
    capital: string
    population: string
    image: string
    likes: number
    deleted: boolean
    }

type Action =
    | { type: 'SET_COUNTRIES'; payload: Country[] }
    | { type: 'ADD_COUNTRY'; payload: Country }
    | { type: 'DELETE_COUNTRY'; payload: number }
    | { type: 'RESTORE_COUNTRY'; payload: number }
    | { type: 'LIKE_COUNTRY'; payload: number }
    | { type: 'SORT_COUNTRIES'; payload: 'asc' | 'desc' }
    | { type: 'EDIT_COUNTRY'; payload: { index: number; country: Country } }

interface State {
    countries: Country[]
    deletedCountries: Country[]
    sortOrder: 'asc' | 'desc'
}

const translations = {
    En: {
        header: 'Countries of the World',
        title: 'Explore Countries',
        visit: 'Discover amazing countries from around the world!',
        countryList: 'Show Countries',
        countryname: 'Country Name',
        capital: 'Capital',
        populationPlaceholder: 'Population',
        addCountry: 'Add Country',
    },
    Geo: {
        header: 'მსოფლიოს ქვეყნები',
        title: 'ქვეყნებთან გაცნობა',
        visit: 'აღმოაჩინე საოცარი ქვეყნები მთელს მსოფლიოში!',
        countryList: 'ქვეყნების სია',
        countryname: 'ქვეყნის სახელი',
        capital: 'დედაქალაქი',
        populationPlaceholder: 'მოსახლეობა',
        addCountry: 'ქვეყნის დამატება',
    },
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
            const countryToDelete = {
                ...updatedCountries[action.payload],
                deleted: true,
            }
            updatedCountries.splice(action.payload, 1)
            return {
                ...state,
                countries: updatedCountries,
                deletedCountries: [...state.deletedCountries, countryToDelete],
            }
        }
        case 'RESTORE_COUNTRY': {
            const restoredCountry = {
                ...state.deletedCountries[action.payload],
                deleted: false,
            }
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
            const sortedCountries = [...state.countries].sort((a, b) =>
                action.payload === 'asc'
                    ? a.likes - b.likes
                    : b.likes - a.likes,
            )
            return {
                ...state,
                countries: sortedCountries,
                sortOrder: action.payload,
            }
        }
        case 'EDIT_COUNTRY': {
            const updatedCountries = [...state.countries]
            updatedCountries[action.payload.index] = action.payload.country
            return { ...state, countries: updatedCountries }
        }
        default:
            return state
    }
}

const Hero: React.FC<HeroProps> = ({ lang = 'En' }) => {
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [currentLang, setCurrentLang] = useState<'En' | 'Geo'>(lang)
    const t = translations[currentLang]
  
    const [showCountries, setShowCountries] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [formData, setFormData] = useState({
      name: '',
      capital: '',
      population: '',
      image: null as File | null,
    })
  
    const validateForm = () => {
      return (
        formData.name &&
        formData.capital &&
        formData.population &&
        formData.image
      )
    }
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      setFormData((prev) => ({ ...prev, image: file }))
    }
  
    const addCountry = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!validateForm()) return
  
      const reader = new FileReader()
      reader.readAsDataURL(formData.image as Blob)
  
      reader.onloadend = () => {
        const base64Image = reader.result as string
  
        const newCountry: Country = {
          name: formData.name.trim(),
          capital: formData.capital.trim(),
          population: formData.population,
          image: base64Image,
          likes: 0,
          deleted: false,
        }
  
        if (editIndex !== null) {
          dispatch({
            type: 'EDIT_COUNTRY',
            payload: { index: editIndex, country: newCountry },
          })
          setEditIndex(null)
        } else {
          dispatch({ type: 'ADD_COUNTRY', payload: newCountry })
        }
  
        setFormData({ name: '', capital: '', population: '', image: null })
      }
    }
  
    useEffect(() => {
      fetchCountries()
        .then((data) => {
          dispatch({ type: 'SET_COUNTRIES', payload: data });
        })
        .catch((error) => console.error('Error fetching countries:', error));
    }, []);
  
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
  
    const handleEdit = (index: number) => {
      const countryToEdit = state.countries[index]
      setFormData({
        name: countryToEdit.name,
        capital: countryToEdit.capital,
        population: countryToEdit.population,
        image: null,
      })
      setEditIndex(index)
    }
  
    const handleLangChange = (lang: 'En' | 'Geo') => {
      setCurrentLang(lang)
    }
  
    const toggleCountries = () => {
      setShowCountries(!showCountries)
    }
  
    return (
      <section>
        <div className="language-buttons">
          <button
            onClick={() => handleLangChange('En')}
            disabled={currentLang === 'En'}
          >
            English
          </button>
          <button
            onClick={() => handleLangChange('Geo')}
            disabled={currentLang === 'Geo'}
          >
            ქართული
          </button>
        </div>
        <div className="countries-article">{t.header}</div>
        <div className="picdiv">
          <img className="pic" src={countryImage} alt="Country" />
          <h2>{t.title}</h2>
        </div>
        <div className="text">{t.visit}</div>
        <button
          className="countrylist"
          onClick={toggleCountries}
          aria-expanded={showCountries}
        >
          {t.countryList}
        </button>
  
        <form onSubmit={addCountry}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Country Name"
          />
          <input
            type="text"
            value={formData.capital}
            onChange={(e) =>
              setFormData({ ...formData, capital: e.target.value })
            }
            placeholder="Capital"
          />
          <input
            type="number"
            value={formData.population}
            onChange={(e) =>
              setFormData({ ...formData, population: e.target.value })
            }
            placeholder="Population"
          />
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            required={!editIndex}
          />
          <button type="submit">
            {editIndex !== null ? 'Update Country' : t.addCountry}
          </button>
        </form>
        {showCountries && (
          <>
            <button onClick={handleSort}>
              Sort by Likes (
              {state.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              )
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
                  onEdit={() => handleEdit(index)}
                  isDeleted={country.deleted}
                />
              ))}
            </div>
          </>
        )}
      </section>
    )
  }
  
  export default Hero
