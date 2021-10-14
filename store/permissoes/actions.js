/* eslint-disable no-console */
import { Promise } from 'core-js'
import { URI_BASE_API, API_VERSION } from '@/config/config'
const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.$axios
      .$get(URI_BASE_API + API_VERSION + '/permissoes')
      .then((data) => {
        vuexContext.commit('permissoes/set_permissoes', data)
      })
  },

  async criarPermissao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/permissoes', params)
        .then((response) => {
          vuexContext.commit('adicionar_permissao', response.data)
          return resolve()
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarPermissao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/permissoes/' + params.id, params)
        .then((response) => {
          if (response.data) {
            vuexContext.commit('editar_permissao', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async excluirPermissao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$delete(URI_BASE_API + API_VERSION + '/permissoes/' + params.id)
        .then((response) => {
          if (response.data) {
            vuexContext.commit('excluir_permissao', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  }

}

export default actions
