import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Behold standard SEO-data i den leverte HTML-en for roboter uten JavaScript,
// men fjern dem før Helmet setter riktig metadata for den aktive siden.
document.querySelectorAll('[data-static-seo]').forEach((element) => element.remove())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
