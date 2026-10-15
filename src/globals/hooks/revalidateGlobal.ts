import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * Revalida el `unstable_cache` de un global (ver `getCachedGlobal`) al
 * actualizarlo desde el admin, para que header/footer reflejen los cambios
 * sin reiniciar el servidor.
 */
export const revalidateGlobal: GlobalAfterChangeHook = ({
  doc,
  global,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating global: ${global.slug}`)
    revalidateTag(`global_${global.slug}`, 'max')
  }

  return doc
}
