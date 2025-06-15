import { viteReactRefresh } from "adonisjsx"
import { MetaDescriptor, renderMeta } from "../../lib/layout.js"

export default async function Page({
  children,
  meta
}: {
  children: JSX.Element,
  meta: MetaDescriptor[],
}) {
  return (
    <html>
      <head>
        {await viteReactRefresh()}
        {renderMeta(meta)}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}