import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { SiteRoutes } from './App'

export function render(url: string) {
  const helmetContext: Record<string, unknown> = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <SiteRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )

  return { html, helmet: helmetContext.helmet }
}
