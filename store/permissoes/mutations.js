const mutations = {
  set_permissoes (state, permissoes) {
    state.permissoes = permissoes
  },

  adicionar_permissao (state, permissao) {
    state.permissoes.push(permissao)
  },

  editar_permissao (state, permissaoEditado) {
    const permissaoIndex = state.permissoes.findIndex(
      permissao => permissao.id === permissaoEditado.id
    )
    state.permissoes[permissaoIndex] = permissaoEditado
  },

  excluir_permissao (state, permissaoExcluir) {
    const permissaoIndex = state.permissoes.indexOf(permissaoExcluir)
    state.permissoes.splice(permissaoIndex, 1)
  }
}

export default mutations
