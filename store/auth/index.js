export const state = () => ({
  usuario: {
    name: '',
    email: '',
    roles: []
  },
  autenticado: false,
  permissoes: [],
  token: null
})