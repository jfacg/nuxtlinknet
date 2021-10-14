/* eslint-disable no-console */
import { Promise } from 'core-js'
import { URI_BASE_API, API_VERSION } from '@/config/config'
const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.$axios
      .$get(URI_BASE_API + API_VERSION + '/usuarios')
      .then((data) => {
        vuexContext.commit('usuarios/set_usuarios', data)
      })
  },

  async criarUsuario (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/usuarios', params)
        .then((response) => {
          vuexContext.commit('adicionar_usuario', response.data)
          return resolve()
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async editarUsuario (vuexContext, params) {
    return await new Promise((resolve, reject) => {
      this.$axios.$put(URI_BASE_API + API_VERSION + '/usuarios/' + params.id, params)
        .then((response) => {
          if (response.data) {
            vuexContext.commit('editar_usuario', params)
            vuexContext.dispatch('associarFuncoes', params)
            return resolve()
          }
        })
        .catch((e) => {
          return reject(e.response.data)
        })
    })
  },

  async associarFuncoes (vuexContext, data) {
    const rolesData = []
    if (data.roles[0].id) {
      rolesData.push(data.roles[0].id)
    } else {
      rolesData.push(data.roles[0])
    }
    const params = { id: data.id, roles: rolesData }
    return await new Promise((resolve, reject) => {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/usuarios/' + params.id + '/funcoes', params)
        .then((response) => {
          this.$axios.$get(URI_BASE_API + API_VERSION + '/usuarios/' + params.id)
            .then((response) => {
              vuexContext.commit('atualizar_funcao_usuario', response.data)
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
