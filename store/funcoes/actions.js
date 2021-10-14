/* eslint-disable no-console */
import { Promise } from 'core-js'
import { URI_BASE_API, API_VERSION } from '@/config/config'
const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.$axios
      .$get(URI_BASE_API + API_VERSION + '/funcoes')
      .then((data) => {
        vuexContext.commit('funcoes/set_funcoes', data)
      })
  },

  async criarFuncao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/funcoes', params)
        .then((response) => {
          vuexContext.commit('adicionar_funcao', response.data)
          return resolve()
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarFuncao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/funcoes/' + params.id, params)
        .then((response) => {
          if (response.data) {
            vuexContext.commit('editar_funcao', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async excluirFuncao (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$delete(URI_BASE_API + API_VERSION + '/funcoes/' + params.id)
        .then((response) => {
          if (response.data) {
            vuexContext.commit('excluir_funcao', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async listaPermissoesAssociadas (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/funcoes/' + params.id + '/permissoes')
        .then((response) => {
          if (response.data) {
            vuexContext.commit('listar_permissoes_associadas', response.data)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async associarPermissoes (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/funcoes/' + params.id + '/permissoes', params)
        .then((response) => {
          this.$axios.$get(URI_BASE_API + API_VERSION + '/funcoes/' + params.id)
            .then((response) => {
              vuexContext.commit('atualizar_permissoes_funcao', response.data)
            })
          return resolve()
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  }

}

export default actions
