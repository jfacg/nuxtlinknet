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
              <h2>Detalhes do Projeto</h2>
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
                  Projeto
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{ projeto.name }} <br>
                  Descrição: {{ projeto.description }}<br>
                  Quantidade de Caixas: {{ projeto.numberBoxes }}<br>
                  Quantidade de Portas por Caixa: {{ projeto.numberBoxPorts }}<br>
                  Nome da OLT: {{ projeto.oltName }}<br>
                  Placa da OLT: {{ projeto.oltSlot }}<br>
                  Porta da OLT: {{ projeto.oltPort }}<br>
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

export default {
  name: 'ProjetosDetalhes',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/projetos/' + context.params.id)
      .then((response) => {
        return {
          projeto: response
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
        text: 'Projetos',
        disabled: false,
        to: '/projetos',
        exact: true,
        link: true
      },

      {
        text: 'Detalhes do Projeto',
        disabled: true
      }

    ],
    project: {}

  }),

  methods: {
    excluir () {
      this.$store.dispatch('projetos/excluirProjeto', this.projeto)
        .then(() => {
          this.$router.push('/projetos')
          this.$toast.success('Projeto excluido')
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
