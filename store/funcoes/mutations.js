/* eslint-disable no-console */
const mutations = {
  set_funcoes (state, funcoes) {
    state.funcoes = funcoes
  },

  adicionar_funcao (state, funcao) {
    state.funcoes.push(funcao)
  },

  editar_funcao (state, funcaoEditado) {
    const funcaoIndex = state.funcoes.findIndex(
      funcao => funcao.id === funcaoEditado.id
    )
    state.funcoes[funcaoIndex] = funcaoEditado
  },

  atualizar_permissoes_funcao (state, funcaoEditado) {
    const funcaoIndex = state.funcoes.findIndex(
      funcao => funcao.id === funcaoEditado.id
    )
    state.funcoes[funcaoIndex].permissions = funcaoEditado.permissions
  },

  excluir_funcao (state, funcaoExcluir) {
    const funcaoIndex = state.funcoes.indexOf(funcaoExcluir)
    state.funcoes.splice(funcaoIndex, 1)
  },

  listar_permissoes_associadas (state, permissoes) {
    state.permissoesAssociadas = permissoes
  }
}

export default mutations
