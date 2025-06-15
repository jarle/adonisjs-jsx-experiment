export type MetaDescriptor = { title: string }

export function renderMeta(meta: MetaDescriptor[]) {
  return meta.flat().map((metaProps) => {
    if (!metaProps) return null

    if ('title' in metaProps) {
      return <title >{String(metaProps.title)}</title>
    }
  })
}
