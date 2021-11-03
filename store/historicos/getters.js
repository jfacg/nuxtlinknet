const getters = {
  listar_projetos: state => state.projetos,
  buscar_projeto: state => (id) => {
    return state.projetos.find(projeto => projeto.id === id)
  }
}

export default getters
