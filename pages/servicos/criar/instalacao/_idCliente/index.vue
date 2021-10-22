
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
                <ServicoForm @submit="salvar" />
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

import ServicoForm from '~/components/servicos/ServicoInstalacaoForm.vue'

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
    ]

  }),

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
