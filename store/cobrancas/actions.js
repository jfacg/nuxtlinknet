/* eslint-disable no-console */
import { Promise } from 'core-js'
import { URI_BASE_API, API_VERSION } from '@/config/config'
const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.$axios
      .$get(URI_BASE_API + API_VERSION + '/ixc/cobrancas/boletosAbertos')
      .then((data) => {
        vuexContext.commit('cobrancas/inserir_cobrancas', data)
      })
  },

  async criarCobranca (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/cobrancas', params)
        .then((response) => {
          // vuexContext.commit('adicionar_cobranca', response.data)
          return resolve(response)
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarProjeto (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/projetos/' + params.id, params)
        .then((response) => {
          if (response) {
            vuexContext.commit('editar_projeto', params)
            return resolve(response)
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarProjetoCaixa (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/caixas/' + params.caixa.id, params.caixa)
        .then((response) => {
          if (response) {
            vuexContext.commit('editar_projeto_caixa', params)
            return resolve(response)
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarProjetoCaixaPorta (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/portas/' + params.porta.id, params.porta)
        .then((response) => {
          if (response) {
            vuexContext.commit('editar_projeto_caixa_porta', params)
          }
          return resolve(response)
        })
        .catch((error) => {
          return reject(error.response.data)
        })
    })
  },

  async excluirProjeto (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$delete(URI_BASE_API + API_VERSION + '/projetos/' + params.id)
        .then((response) => {
          if (response) {
            vuexContext.commit('excluir_projeto', params)
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
