
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
              <h2>Criar Nova Permissão</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <PermissaoForm @submit="salvar" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import PermissaoForm from '@/components/permissoes/PermissaoForm.vue'
/* eslint-disable no-console */
export default {
  name: 'PermissaoCriar',
  components: {
    PermissaoForm
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
        text: 'Nova Permissão',
        disabled: true
      }
    ]
  }),

  methods: {

    salvar (permissao) {
      this.$store.dispatch('permissoes/criarPermissao', permissao)
        .then(() => {
          this.$toast.success('Permissão criada')
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
