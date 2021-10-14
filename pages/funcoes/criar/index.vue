
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
              <h2>Criar Nova Função</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <FuncaoForm @submit="salvar" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import FuncaoForm from '@/components/funcoes/FuncaoForm.vue'
/* eslint-disable no-console */
export default {
  name: 'FuncaoCriar',
  components: {
    FuncaoForm
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Finções',
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

    salvar (funcao) {
      this.$store.dispatch('funcoes/criarFuncao', funcao)
        .then(() => {
          this.$toast.success('Função criada')
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
