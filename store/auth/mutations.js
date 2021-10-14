const mutations = {
  set_usuario (state, usuario) {
    state.usuario = usuario
  },

  set_autenticado (state, status) {
    state.autenticado = status
  },

  set_permissoes (state, permissoes) {
    state.permissoes = permissoes
  },

  set_token (state, token) {
    state.token = token
  }
}

export default mutations
