
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
                <ServicoInstalacaoEdicaoForm @submit="salvar" />
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

import ServicoInstalacaoEdicaoForm from '~/components/servicos/ServicoInstalacaoEdicaoForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicosEditarInstalacao',
  components: {
    ServicoInstalacaoEdicaoForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/' + context.params.id)
      .then((response) => {
        context.store.commit('servicos/inserir_servico', response)
        return {
          servicoConsultado: response
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
        text: 'Servicos',
        disabled: false,
        to: '/servicos',
        exact: true,
        link: true

      },
      {
        text: 'Editar Servico',
        disabled: true
      }
    ]

  }),

  created () {

  },

  methods: {
    salvar (servico) {
      this.$store.dispatch('servicos/editarServico', servico)
        .then(() => {
          this.$toast.success('Servico atualizado')
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
