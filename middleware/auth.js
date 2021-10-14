/* eslint-disable no-console */
import { TOKEN_NAME } from '@/config/config'
export default function (context) {
  if (!context.store.getters['auth/autenticado'] && !context.$storage.getUniversal(TOKEN_NAME)) {
    context.redirect('/auth')
  }
}
