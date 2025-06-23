import { defineRoute } from "#lib/route_module"
import { viteAssets, viteReactRefresh } from "adonisjsx"

export async function Layout({
  children,
  meta
}: {
  children: JSX.Element,
  meta: JSX.Element[],
}) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {await viteAssets(['resources/js/app.js'])}
        {await viteAssets(['resources/css/app.css'])}
        {await viteReactRefresh()}
        {...meta}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

export default defineRoute({
  async loader() {
    return { message: 'world!' }
  },

  view({ loaderData }) {
    return <div>Hello {loaderData.message}</div>
  },
})