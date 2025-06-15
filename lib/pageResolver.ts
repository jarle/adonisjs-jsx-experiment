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
    const loaderData = route.loader ? await route.loader(ctx) : null
    return ctx.jsx.render(route.view, {
      layout: rootRoute,
      data: {
        loaderData,
        ctx
      }
    })
  }

  if (verb === 'GET') {
    return render()
  }

  if (verb === 'POST' && route.action) {
    console.log("Post received")
    await route.action({ ctx })
    return render()
  }

  throw new Error(`Unsupported verb ${verb} for this route`)
}