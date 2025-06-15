import { HttpContext } from "@adonisjs/core/http"

export type Loader<TData, TCtx = {}> = (ctx: TCtx) => Promise<TData> | TData
export type Action<TCtx = HttpContext> = (
  ctx: TCtx,
) => Promise<void>

export interface RouteModule<TData = unknown, TCtx = {}> {
  loader?: Loader<TData, TCtx>
  action?: Action<TCtx>
  view: (props: { loaderData: TData } & TCtx & { rid: string | number }) => JSX.Element
}

export function defineRoute<TData, TCtx = { ctx: HttpContext }>(
  module: RouteModule<TData, TCtx>,
): RouteModule<TData, TCtx> {
  return module
}