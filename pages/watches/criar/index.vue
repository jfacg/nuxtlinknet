
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
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
                v-model="editarWatch.email"
                name="email"
                label="Email"
                type="email"
              />
              <v-text-field
                v-model="editarWatch.telefone"
                name="telefone"
                label="Telefone"
                type="text"
              />
              <v-text-field
                v-model="editarWatch.cpf"
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
    editarWatch: {
      cpf: '',
      email: '',
      telefone: '',
      empresa_id: '',
      usuario_id: '',
      status: ''
    },
    empresas: [],
    usuario: {}

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.buscarEmpresas()
  },

  methods: {

    salvar () {
      this.editarWatch.usuario_id = this.usuario.id
      this.editarWatch.empresa_id = this.usuario.empresa_id
      this.editarWatch.status = 'ATIVAR'
      this.$axios.post(URI_BASE_API + API_VERSION + '/watches', this.editarWatch)
        .then((response) => {
          this.$toast.success('Conta solicitada')
          this.$router.push('/watches')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    buscarEmpresas () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/empresas')
        .then((response) => {
          this.empresas = response.data.data
        })
    }

  }
}
</script>
