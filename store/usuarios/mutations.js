const mutations = {
  set_usuarios (state, usuarios) {
    state.usuarios = usuarios
  },

  adicionar_usuario (state, usuario) {
    state.usuarios.push(usuario)
  },

  editar_usuario (state, usuarioEditado) {
    const usuarioIndex = state.usuarios.findIndex(
      usuario => usuario.id === usuarioEditado.id
    )
    state.usuarios[usuarioIndex] = usuarioEditado
  },

  atualizar_funcao_usuario (state, usuarioEditado) {
    const usuarioIndex = state.usuarios.findIndex(
      usuario => usuario.id === usuarioEditado.id
    )
    state.usuarios[usuarioIndex].roles = usuarioEditado.roles
  }

}

export default mutations
