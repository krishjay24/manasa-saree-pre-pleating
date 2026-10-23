import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { preloadPage } from './app/pageLoaders'
import './styles/tokens.css'
import './styles/global.css'
import './styles/typography.css'

const container = document.getElementById('root')!
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (container.hasChildNodes()) {
  preloadPage(window.location.pathname).finally(() => hydrateRoot(container, app))
} else {
  createRoot(container).render(app)
}
