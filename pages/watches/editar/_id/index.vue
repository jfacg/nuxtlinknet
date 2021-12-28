
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          v-if="verificarPermissao('admin')"
          elevation="24"
          loading
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <div>
              <h2>Nova Conta Watch</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <form>
              <v-text-field
                v-model="contaWatch.email"
                name="email"
                label="Email"
                type="email"
              />
              <v-text-field
                v-model="contaWatch.telefone"
                name="telefone"
                label="Telefone"
                type="text"
              />
              <v-text-field
                v-model="contaWatch.cpf"
                name="cpf"
                label="CPF"
                type="text"
              />

              <v-btn
                color="primary"
                large
                @click.prevent="salvar"
              >
                Solicitar
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'WatchCriar',

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Watch',
        disabled: false,
        to: '/watches',
        exact: true,
        link: true

      },
      {
        text: 'Nova Conta',
        disabled: true
      }
    ],
    contaWatch: {
      cpf: '',
      email: '',
      telefone: '',
      empresa_id: '',
      usuario_id: '',
      status: ''
    },
    usuario: {}

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.buscarConta()
  },

  methods: {

    salvar () {
      this.contaWatch.usuario_id = this.usuario.id
      this.contaWatch.empresa_id = this.usuario.empresa_id
      this.$axios.put(URI_BASE_API + API_VERSION + '/watches/' + this.$route.params.id, this.contaWatch)
        .then((response) => {
          this.$toast.success('Conta atualizada')
          this.$router.push('/watches')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    buscarConta () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/watches/' + this.$route.params.id)
        .then((response) => {
          this.contaWatch = response.data.data
        })
    },

    verificarPermissao (item) {
      const permissoes = []

      this.$store.getters['auth/usuarioAutenticado'].roles.forEach((funcao) => {
        funcao.permissions.forEach((permissao) => {
          permissoes.push(permissao)
        })
      })
      let result = false
      permissoes.forEach((permission) => {
        if (permission.name === item || item === '') {
          // console.log(true)
          result = true
          return result
        }
      })
      return result
    }

  }
}
</script>
