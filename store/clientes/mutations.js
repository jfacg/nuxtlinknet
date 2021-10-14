/* eslint-disable no-console */
const mutations = {
  inserir_clientes (state, clientes) {
    state.clientes = clientes
  },

  adicionar_cliente (state, cliente) {
    state.clientes.push(cliente)
  },

  excluir_cliente (state, clienteExcluir) {
    const clienteIndex = state.clientes.findIndex(
      cliente => cliente.id === clienteExcluir.id
    )
    state.clientes.splice(clienteIndex, 1)
  },

  editar_cliente (state, clienteEditado) {
    const clienteIndex = state.clientes.findIndex(
      cliente => cliente.id === clienteEditado.id
    )
    state.clientes[clienteIndex] = clienteEditado
  }

  // atualizar_permissoes_funcao (state, funcaoEditado) {
  //   const funcaoIndex = state.funcoes.findIndex(
  //     funcao => funcao.id === funcaoEditado.id
  //   )
  //   state.funcoes[funcaoIndex].permissions = funcaoEditado.permissions
  // },

  // listar_permissoes_associadas (state, permissoes) {
  //   state.permissoesAssociadas = permissoes
  // }
}

export default mutations
