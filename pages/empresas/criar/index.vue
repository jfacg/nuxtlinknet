
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
              <h2>Criar Nova Empresa</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <EmpresaForm @submit="salvar" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { URI_BASE_API, API_VERSION } from '@/config/config'

import EmpresaForm from '@/components/empresas/EmpresaForm.vue'
/* eslint-disable no-console */
export default {
  name: 'EmpmresaCriar',
  components: {
    EmpresaForm
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Empresas',
        disabled: false,
        to: '/empresas',
        exact: true,
        link: true
      },
      {
        text: 'Nova Empresa',
        disabled: true
      }
    ]
  }),

  methods: {

    salvar (empresa) {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/empresas', empresa)
        .then((response) => {
          this.$toast.success('Empresa criada')
          this.$router.push('/empresas')
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
