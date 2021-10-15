/* eslint-disable no-console */
import { URI_BASE_API, TOKEN_NAME, API_VERSION } from '@/config/config'

const actions = {
  autenticar (vuexContext, params) {
    return this.$axios.$post(URI_BASE_API + 'sanctum/token', params)
      .then((response) => {
        const token = response.token
        localStorage.setItem(TOKEN_NAME, token)
        this.$storage.setUniversal(TOKEN_NAME, token)
        vuexContext.commit('set_token', token)
        vuexContext.commit('set_autenticado', true)
        vuexContext.dispatch('autenticado', token)
      })
      .catch(e => console.log(e))
  },

  autenticado (vuexContext, params) {
    const token = this.$storage.getUniversal(TOKEN_NAME)
    return this.$axios.$get(URI_BASE_API + 'auth/me', {
      headers: {
        common: {
          Authorization: 'Bearer ' + token
        }
      }
    })
      .then((response) => {
        const usuarioAutenticado = response
        const funcao = usuarioAutenticado.roles[0]
        vuexContext.commit('set_usuario', usuarioAutenticado)
        vuexContext.commit('set_token', token)
        vuexContext.commit('set_autenticado', true)

        this.$axios.$get(URI_BASE_API + API_VERSION + '/funcoes/' + funcao.id + '/permissoes')
          .then((response) => {
            const permissoes = response.data
            vuexContext.commit('set_permissoes', permissoes)
          })
      })
      .catch((error) => {
        localStorage.removeItem(TOKEN_NAME)
        return error
      })
  }
}

export default actions
