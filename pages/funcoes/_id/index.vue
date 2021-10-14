
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
              <h2>Editar Função</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <FuncaoForm
              :funcao="funcao"
              @submit="salvar"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import FuncaoForm from '@/components/funcoes/FuncaoForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'
/* eslint-disable no-console */
export default {
  name: 'FuncaoEditar',
  components: {
    FuncaoForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/funcoes/' + context.params.id)
      .then((response) => {
        return {
          funcao: response.data
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
        text: 'Funções',
        disabled: false,
        to: '/funcoes',
        exact: true,
        link: true
      },
      {
        text: 'Criar Nova Função',
        disabled: true
      }
    ]
  }),

  methods: {

    salvar (funcaoEditada) {
      this.$store.dispatch('funcoes/editarFuncao', funcaoEditada)
        .then(() => {
          this.$toast.success('Função atualizado')
          this.$router.push('/funcoes')
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
