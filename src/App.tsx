import '@/index.css';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import ArticlesListView from './pages/home/views/list';
import DefaultLayout from './layouts/default';
import AboutView from './pages/about/views/about';
import ContactInformationView from './pages/contact/views/contact';
import NotFoundPage from './pages/404';
import CountryDetails from './pages/home/components/country/countrydetails';
import Hero from './pages/home/components/hero/Hero';


const LanguageRoutes: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  const switchLanguage = (language: 'En' | 'Geo') => {
    navigate(`/${language}/countries`);
  };

  if (lang !== 'En' && lang !== 'Geo') {
    navigate('/En/countries');
    return null;
  }

  return (
    <div>
      <button onClick={() => switchLanguage('En')}>English</button>
      <button onClick={() => switchLanguage('Geo')}>Georgian</button>
      
      <Hero lang={lang as 'En' | 'Geo'} /> 
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
      
      <Route path="/:lang/countries" element={<LanguageRoutes />} />
      <Route path="/" element={<LanguageRoutes />} />

        <Route path="/" element={<ArticlesListView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactInformationView />} />

        <Route path="/:lang/countries" element={<Hero />} /> 
        <Route path="/:lang/country/:name" element={<CountryDetails />} /> 

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
