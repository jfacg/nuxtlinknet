/* eslint-disable no-console */
const mutations = {
  inserir_servicos (state, servicos) {
    state.servicos = servicos
  },

  inserir_servico (state, servico) {
    state.servico = servico
  },

  adicionar_servico (state, servico) {
    state.servicos.push(servico)
  },

  excluir_cliente (state, clienteExcluir) {
    const clienteIndex = state.clientes.findIndex(
      cliente => cliente.id === clienteExcluir.id
    )
    state.clientes.splice(clienteIndex, 1)
  },

  editar_servico (state, servicoEditado) {
    const servicoIndex = state.servicos.findIndex(
      servico => servico.id === servicoEditado.id
    )
    state.servicos[servicoIndex] = servicoEditado
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
