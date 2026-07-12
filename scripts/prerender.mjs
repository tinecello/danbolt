import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(projectRoot, 'dist')
const serverDir = resolve(projectRoot, 'dist-ssr')
const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href)

const routes = [
  '/',
  '/blogg',
  '/blogg/etterklangstid-kirke',
  '/blogg/absorpsjon-vs-diffusjon',
  '/blogg/taletydelighet-sti',
  '/blogg/ns8175-etterklangskrav',
]

for (const route of routes) {
  const { html, helmet } = render(route)
  const seo = [
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ].filter(Boolean).join('\n    ')

  const page = template
    .replace(/\s*<title data-static-seo>[\s\S]*?<\/title>/, '')
    .replace(/\s*<(?:meta|link) data-static-seo[^>]*>/g, '')
    .replace('</head>', `    ${seo}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const output = route === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.slice(1), 'index.html')

  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, page)
}

await rm(serverDir, { recursive: true, force: true })
