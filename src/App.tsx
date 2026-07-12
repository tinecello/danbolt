import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
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

// Videresender gamle HashRouter-adresser (danbolt.no/#/blogg/...) til de nye
// rene URL-ene (danbolt.no/blogg/...), slik at gamle delte lenker fortsatt virker.
function LegacyHashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash.startsWith('#/')) {
      navigate(location.hash.slice(1), { replace: true })
    }
  }, [location.hash, navigate])

  return null
}

function Forside() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Helmet>
        <title>Uavhengig lyd- og akustikkrådgiver | Thorbjørn Danbolt</title>
        <meta name="description" content="Uavhengig rådgivning, akustikkmålinger og systemdesign for kirker, skoler, kulturhus og møterom. Mer enn 30 års erfaring over hele Norge." />
        <link rel="canonical" href="https://danbolt.no" />
        <meta property="og:title" content="Uavhengig lyd- og akustikkrådgiver | Thorbjørn Danbolt" />
        <meta property="og:description" content="Uavhengig rådgivning, akustikkmålinger og systemdesign for kirker, skoler, kulturhus og møterom. Mer enn 30 års erfaring over hele Norge." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no" />
        <meta property="og:image" content="https://danbolt.no/thorbjorn-danbolt.jpg" />
        <meta property="og:locale" content="nb_NO" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uavhengig lyd- og akustikkrådgiver | Thorbjørn Danbolt" />
        <meta name="twitter:description" content="Uavhengig rådgivning, akustikkmålinger og systemdesign for kirker, skoler, kulturhus og møterom. Mer enn 30 års erfaring over hele Norge." />
        <meta name="twitter:image" content="https://danbolt.no/thorbjorn-danbolt.jpg" />
      </Helmet>
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

export function SiteRoutes() {
  return (
    <>
      <LegacyHashRedirect />
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/blogg" element={<BloggLayout />} />
        <Route path="/blogg/:slug" element={<BloggPostLayout />} />
        {/* Ukjente adresser sendes til forsiden i stedet for å gi blank side */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SiteRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
