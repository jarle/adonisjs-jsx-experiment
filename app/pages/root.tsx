import { viteReactRefresh } from "adonisjsx"

export default async function Page({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head>
        {await viteReactRefresh()}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}