import { HttpContext } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"
import { Component } from "adonisjsx"

const pagesDir = app.makePath('app', 'pages')
const { Layout: Root }: { Layout: Component<{ meta: any }> } = await import(`${pagesDir}/route.js`)

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
    const meta = route.meta ? route.meta({ ctx, loaderData }) : []

    return ctx.jsx.stream(route.view, {
      layout: ({ children }) => <Root children={children} meta={meta} />,
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