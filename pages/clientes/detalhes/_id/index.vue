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
              <h2>Detalhes do Cliente</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-col cols="6">
              <v-card
                color="#385F73"
                dark
              >
                <v-card-title class="text-h5">
                  Cliente
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{ cliente.name }} <br>
                  CPF: {{ cliente.cpf }} <br>
                  Data de Nascimento: {{ cliente.birthday }} <br>
                  Celular: {{ cliente.cellPhone1 }} <br>
                  Celular: {{ cliente.cellPhone2 }} <br>
                  Email: {{ cliente.email }} <br>
                  Endereço: {{ cliente.street }}, {{ cliente.number }} - {{ cliente.complement }} <br>
                  Bairro: {{ cliente.district }} <br>
                  Cidade: {{ cliente.city }} - {{ cliente.state }} <br>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    elevation="10"
                    text
                    color="red"
                    @click.prevent="excluir()"
                  >
                    <v-icon>delete</v-icon>
                    Excluir
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { URI_BASE_API, API_VERSION } from '@/config/config'
/* eslint-disable no-console */
export default {
  name: 'ClienteDetalhes',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/clientes/' + context.params.id)
      .then((response) => {
        return {
          cliente: response
        }
      })
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Clientes',
        disabled: false,
        to: '/clientes',
        exact: true,
        link: true
      },
      {
        text: 'Detalhes do Cliente',
        disabled: true
      }
    ]
  }),

  methods: {
    excluir () {
      this.$store.dispatch('clientes/excluirCliente', this.cliente)
        .then(() => {
          this.$router.push('/clientes')
          this.$toast.success('Cliente excluido')
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
