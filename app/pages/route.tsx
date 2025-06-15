import { viteReactRefresh } from "adonisjsx"
import { defineRoute } from "../../lib/routeModule.js"

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
    return { message: 'world' }
  },

  view({ loaderData }) {
    return <div>Hello {loaderData.message}</div>
  },
})