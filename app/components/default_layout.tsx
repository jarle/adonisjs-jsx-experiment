import { PropsWithChildren } from 'adonisjsx'

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AdonisJS</title>
      </head>
      <body>{children}</body>
    </html>
  )
}