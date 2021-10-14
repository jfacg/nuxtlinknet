/* eslint-disable no-console */
const mutations = {
  inserir_projetos (state, projetos) {
    state.projetos = projetos
  },

  adicionar_projeto (state, projeto) {
    state.projetos.push(projeto)
  },

  excluir_projeto (state, projetoExcluir) {
    const projetoIndex = state.projetos.findIndex(
      projeto => projeto.id === projetoExcluir.id
    )
    state.projetos.splice(projetoIndex, 1)
  },

  editar_projeto (state, projetoEditado) {
    const projetoIndex = state.projetos.findIndex(
      projeto => projeto.id === projetoEditado.id
    )
    state.projetos[projetoIndex] = projetoEditado
  },

  editar_projeto_caixa (state, projetoEditado) {
    const projetoIndex = state.projetos.findIndex(
      projeto => projeto.id === projetoEditado.projetoId
    )

    const caixaIndex = state.projetos[projetoIndex].boxes.findIndex(
      caixa => caixa.id === projetoEditado.caixa.id
    )

    state.projetos[projetoIndex].boxes[caixaIndex] = projetoEditado.caixa
  },

  editar_projeto_caixa_porta (state, projetoEditado) {
    const projetoIndex = state.projetos.findIndex(
      projeto => projeto.id === projetoEditado.projetoId
    )

    const caixaIndex = state.projetos[projetoIndex].boxes.findIndex(
      caixa => caixa.id === projetoEditado.caixaId
    )

    const portaIndex = state.projetos[projetoIndex].boxes[caixaIndex].ports.findIndex(
      porta => porta.id === projetoEditado.porta.id
    )

    state.projetos[projetoIndex].boxes[caixaIndex].ports[portaIndex] = projetoEditado.porta
  }

}

export default mutations
