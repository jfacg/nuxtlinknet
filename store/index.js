/* eslint-disable no-console */
import usuarios from '@/store/usuarios/actions'
import funcoes from '@/store/funcoes/actions'
import permissoes from '@/store/permissoes/actions'
import clientes from '@/store/clientes/actions'
import projetos from '@/store/projetos/actions'

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  async nuxtServerInit (vuexContext, context) {
    await Promise.all([
      projetos.nuxtServerInit(vuexContext, context),
      clientes.nuxtServerInit(vuexContext, context),
      usuarios.nuxtServerInit(vuexContext, context),
      funcoes.nuxtServerInit(vuexContext, context),
      permissoes.nuxtServerInit(vuexContext, context)
    ])
  }
}
