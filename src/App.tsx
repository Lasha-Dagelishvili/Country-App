import Hero from './components/hero/Hero.tsx'
import Navbar from './components/navbar/navbar.tsx'
import Footer from './components/footer/footer.tsx'
import './index.css'

function App() {
  return (
    <>
        <Navbar/>
        <Hero />
        <Footer/>
    </>
  )
}

export default App