import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Treatments, { PageHero } from './pages/Treatments'
import About from './pages/About'
import Book from './pages/Book'
import { Terms, Privacy } from './pages/Legal'
import './index.css'

function NotFound() {
  return (
    <PageHero eyebrow="404" title={<>This page has <em className="gold-text">drifted away.</em></>} copy="The page you’re looking for doesn’t exist.">
      <Link to="/" className="btn-gold mt-8">Back to home</Link>
    </PageHero>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="about" element={<About />} />
          <Route path="book" element={<Book />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
