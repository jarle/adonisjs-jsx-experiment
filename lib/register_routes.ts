import app from "@adonisjs/core/services/app"
import router from "@adonisjs/core/services/router"
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolvePage } from './page_resolver.js'

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
  const routeUrl = fileToUrl(relPath) || "/"
  const modulePath = pathToFileURL(path.resolve(relPath)).href
  const resolveModule = async () => {
    const { default: routeModule } = await import(modulePath)
    return routeModule
  }

  // HMR in dev
  if (app.inDev) {
    router.get(routeUrl, async ctx => {
      resolvePage(ctx, await resolveModule(), 'GET')
    })
    router.post(routeUrl, async ctx => {
      resolvePage(ctx, await resolveModule(), 'POST')
    })
  } else {
    const route = await resolveModule()

    router.get(routeUrl, ctx => resolvePage(ctx, route, 'GET'))
    router.post(routeUrl, ctx => resolvePage(ctx, route, 'POST'))
  }
}