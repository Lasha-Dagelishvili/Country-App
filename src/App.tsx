import Hero from '@/components/hero/Hero.tsx'
import Navbar from './components/navbar/navbar.tsx'
import Footer from '@/components/footer/footer.tsx'
import Layout from '@/layout.tsx'
import '@/index.css'

function App() {
  return (
    <>
    <Navbar />
        <Layout children={
            <>
            <Hero />
            </>
          }/>
          <Footer />
    </>
  )
}

export default App