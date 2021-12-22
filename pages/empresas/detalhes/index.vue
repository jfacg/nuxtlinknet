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
              <h2>Detalhes da Permissão</h2>
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
                  Permissão
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{ permissao.name }} <br>
                  Descrição: {{ permissao.description }}
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
  name: 'PermissaoDetalhes',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/permissoes/' + context.params.id)
      .then((response) => {
        return {
          permissao: response.data
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
        text: 'Permissões',
        disabled: false,
        to: '/permissoes',
        exact: true,
        link: true
      },
      {
        text: 'Detalhes da Permissão',
        disabled: true
      }
    ]
  }),

  methods: {
    excluir () {
      this.$store.dispatch('permissoes/excluirPermissao', this.permissao)
        .then(() => {
          this.$router.push('/permissoes')
          this.$toast.success('Permissão excluida')
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
