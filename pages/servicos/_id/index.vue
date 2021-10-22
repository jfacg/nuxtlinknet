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
              <h2>Novo Serviço</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <ServicoForm
                  :cliente="cliente"
                  :planosixc="planosIxc"
                  :vendedores="vendedores"
                  @submit="salvar"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import ServicoForm from '~/components/servicos/ServicoInstalacaoForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicosCriar',
  components: {
    ServicoForm
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Servicos',
        disabled: false,
        to: '/servicos',
        exact: true,
        link: true

      },
      {
        text: 'Novo Servico',
        disabled: true
      }
    ],
    cliente: {},
    planosIxc: [],
    vendedores: []

  }),

  computed: {
    buscarCliente () {
      const idCliente = this.$route.params.idCliente
      if (idCliente) {
        // eslint-disable-next-line vue/no-async-in-computed-properties
        this.$axios.$get(URI_BASE_API + API_VERSION + '/clientes/' + idCliente)
          .then((response) => {
            this.cliente = response
          })
      }
      return false
    },

    buscarPlanos () {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      return this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/planos')
        .then((response) => {
          response.forEach((plano) => {
            this.planosIxc.push(plano.nome)
          })
        })
    },

    buscarVendedores () {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      return this.$axios.$get(URI_BASE_API + API_VERSION + '/usuarios')
        .then((response) => {
          response.forEach((usuario) => {
            this.vendedores.push(usuario.name)
          })
        })
    }
  },

  methods: {

    salvar (servico) {
      this.$store.dispatch('servicos/criarServico', servico)
        .then(() => {
          this.$toast.success('Servico criado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    }

  }

}
</script>
