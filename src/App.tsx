import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import AcousticViz from './sections/AcousticViz'
import Services from './sections/Services'
import Process from './sections/Process'
import About from './sections/About'
import BookSection from './sections/BookSection'
import References from './sections/References'
import Contact from './sections/Contact'
import Blogg from './pages/Blogg'
import BloggPost from './pages/BloggPost'
import Footer from './sections/Footer'

function Forside() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={scrolled} />
      <main>
        <Hero />
        <Philosophy />
        <AcousticViz />
        <Services />
        <Process />
        <About />
        <BookSection />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function BloggLayout() {
  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={true} />
      <Blogg />
      <Footer />
    </div>
  )
}

function BloggPostLayout() {
  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={true} />
      <BloggPost />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/blogg" element={<BloggLayout />} />
          <Route path="/blogg/:slug" element={<BloggPostLayout />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  )
}

export default App
