/* eslint-disable no-console */
import { Promise } from 'core-js'
import { URI_BASE_API, API_VERSION } from '@/config/config'
const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.$axios
      .$get(URI_BASE_API + API_VERSION + '/servicos')
      .then((data) => {
        vuexContext.commit('servicos/inserir_servicos', data)
      })
  },

  async criarServico (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/servicos', params)
        .then((response) => {
          vuexContext.commit('adicionar_servico', response)
          return resolve(response)
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarServico (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/servicos/' + params.id, params)
        .then((response) => {
          if (response) {
            vuexContext.commit('editar_servico', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async excluirCliente (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$delete(URI_BASE_API + API_VERSION + '/clientes/' + params.id)
        .then((response) => {
          if (response) {
            vuexContext.commit('excluir_cliente', params)
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
