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

  // async listarPlanosIxc ({ commit, dispatch }, params) {
  //   return await axios.get(`${URN}/planos`, params)
  //     .then(response => {
  //       const planos = response.data
  //       commit('SET_PLANOSIXC', planos)
  //     })
  // }.

  async listarPlanosIxc (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/planos', params)
        .then((response) => {
          vuexContext.commit('inserir_planosIxc', response)
          return resolve(response)
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarCliente (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/clientes/' + params.id, params)
        .then((response) => {
          if (response) {
            vuexContext.commit('editar_cliente', params)
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
