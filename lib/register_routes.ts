import app from "@adonisjs/core/services/app"
import router from "@adonisjs/core/services/router"
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolvePage } from '../lib/page_resolver.js'

const pagesDir = app.makePath('app', 'pages')
const files = await fg([
  `${pagesDir}/**/route.{ts,tsx,js,jsx}`,
  `${pagesDir}/**/*.route.{ts,tsx,js,jsx}`,
])

function fileToUrl(file: string) {
  return file
    .replace(pagesDir, '')
    .replace(/[\.\/](route\.[jt]sx?$)/, '')
    .replace(/\./, '/')
}

for (const relPath of files) {
  const url = fileToUrl(relPath) || "/"
  const modUrl = pathToFileURL(path.resolve(relPath)).href
  const mod = await import(modUrl)
  const route = mod.default

  router.get(url, ctx => resolvePage(ctx, route, 'GET'))
  if (route.action) router.post(url, ctx => resolvePage(ctx, route, 'POST'))
}