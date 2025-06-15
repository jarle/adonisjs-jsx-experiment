import { viteAssets, viteReactRefresh } from "adonisjsx"

export default async function Page({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head>
        {await viteReactRefresh()}
        {await viteAssets(['resources/css/app.css'])}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}