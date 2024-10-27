import '@/index.css'
import { Route, Routes } from 'react-router-dom'
import ArticlesListView from './pages/home/views/list'
import DefaultLayout from './layouts/default'
import AboutView from './pages/about/views/about'
import ContactInformationView from './pages/contact/views/contact'
import NotFoundPage from './pages/404'
import { Suspense } from 'react'
import CountryDetails from './pages/home/components/country/countrydetails'
import Hero from './pages/home/components/hero/Hero'

function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <ArticlesListView />
                        </Suspense>
                    }
                />
                <Route path="/" element={<ArticlesListView />} />
                <Route path="about" element={<AboutView />} />
                <Route path="contact" element={<ContactInformationView />} />

                <Route path="countries" element={<Hero />} />
                <Route path="country/:name" element={<CountryDetails />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
