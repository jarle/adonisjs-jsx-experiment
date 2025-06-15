import { HttpContext } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"

const pagesDir = app.makePath('app', 'pages')
const { default: rootRoute } = await import(`${pagesDir}/root.js`)

export async function resolvePage(
  ctx: HttpContext,
  route: any,
  verb: 'GET' | 'POST'
) {
  const isRoot = ctx.request.url() === '/'
  const pathname = isRoot ? '/route' : `${ctx.request.url()}/route`
  if (!route) {
    throw new Error(`Missing default export from route module ${pathname}`)
  }

  const render = async () => {
    const loaderData = route.loader ? route.loader(ctx) : null
    return ctx.jsx.stream(route.view, {
      layout: rootRoute,
      data: {
        loaderData,
        ctx
      },
      errorCallback: (error) => ([`Rendering failed: ${error.message}`, 500])
    })
  }

  if (verb === 'GET') {
    return render()
  }

  if (verb === 'POST' && route.action) {
    await route.action({ ctx })
    return ctx.response.redirect(ctx.request.url())
  }

  throw new Error(`Unsupported verb ${verb} for route ${ctx.request.url()}`)
}