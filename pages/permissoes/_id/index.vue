
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
              <h2>Editar Permissão</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <PermissaoForm
              :permissao="permissao"
              @submit="salvar"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import PermissaoForm from '@/components/permissoes/PermissaoForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'
/* eslint-disable no-console */
export default {
  name: 'Permissao',
  components: {
    PermissaoForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/permissoes/' + context.params.id)
      .then((response) => {
        return {
          permissao: response.data
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
        text: 'Permissões',
        disabled: false,
        to: '/permissoes',
        exact: true,
        link: true
      },
      {
        text: 'Criar Nova Permissão',
        disabled: true
      }
    ]
  }),

  methods: {

    salvar (permissaoEditada) {
      this.$store.dispatch('permissoes/editarPermissao', permissaoEditada)
        .then(() => {
          this.$toast.success('Permissão atualizado')
          this.$router.push('/permissoes')
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
