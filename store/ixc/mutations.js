/* eslint-disable no-console */
const mutations = {
  inserir_planosIxc (state, planos) {
    state.planosIxc = planos
  },

  inserir_boletosixc (state, boletos) {
    state.boletosixc = boletos
  },

  adicionar_cobranca (state, cobranca) {
    const boletoIndex = state.boletosixc.findIndex(
      boleto => boleto.id === cobranca.boletoId
    )
    state.boletosixc[boletoIndex].cobrancas.push(cobranca.cobranca)
  }

  // excluir_cliente (state, clienteExcluir) {
  //   const clienteIndex = state.clientes.findIndex(
  //     cliente => cliente.id === clienteExcluir.id
  //   )
  //   state.clientes.splice(clienteIndex, 1)
  // },

  // editar_cliente (state, clienteEditado) {
  //   const clienteIndex = state.clientes.findIndex(
  //     cliente => cliente.id === clienteEditado.id
  //   )
  //   state.clientes[clienteIndex] = clienteEditado
  // }

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
