
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
              <!-- <h2>Atualizar Porta: {{ porta.name }}</h2> -->
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <form>
                  <v-text-field
                    v-model.trim="porta.name"
                    name="name"
                    label="Nome da Porta"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model.trim="porta.cableCode"
                    name="cableCode"
                    label="Código do Cabo"
                    type="number"
                  />
                  <v-text-field
                    v-model.trim="porta.clientIxc_id"
                    name="clientIxc_id"
                    label="Código do Cliente no IXC"
                    type="number"
                    @change="buscarClienteIxc"
                  />
                  <v-text-field
                    :value="clienteixc.razao"
                    name="clienteixc"
                    label="Nome do Cliente"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model.trim="porta.partner"
                    name="partner"
                    label="Login do Cliente do Parceiro"
                    type="text"
                  />
                  <v-btn
                    color="primary"
                    large
                    @click.prevent="salvar"
                  >
                    Salvar
                  </v-btn>
                </form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'PortCreateUpdate',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/portas/' + context.params.id)
      .then((response) => {
        return {
          retornoPorta: response.data
        }
      })
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Caixas',
        disabled: false,
        to: '/caixas',
        exact: true,
        link: true
      },
      {
        text: 'Caixa',
        disabled: false,
        to: '',
        exact: true,
        link: true
      },
      {
        text: 'Editar Porta',
        disabled: true
      }

    ],
    caixa: {

    },
    porta: {
      status: '',
      clientIxc_id: ''
    },
    clienteixc: {
      razao: ''
    }

  }),

  computed: {

  },

  created () {
    this.porta = this.retornoPorta
    this.itemsBreadcrumbs[2].to = '/caixas/' + this.retornoPorta.box.id + '/portas'
  },

  methods: {
    buscarClienteIxc () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/' + this.porta.clientIxc_id)
        .then((response) => {
          this.clienteixc = response
        })
      return true
    },

    salvar () {
      this.porta.status = 'ATIVA'
      this.$store.dispatch('portas/editarPorta', this.porta)
        .then((response) => {
          this.$toast.success('Porta atualizado')
          this.$router.push('/caixas/' + this.retornoPorta.box.id + '/portas')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },
    toUpperCase (text) {
      this.caixaEditada.address = text.toUpperCase()
    }
  }

}
</script>
