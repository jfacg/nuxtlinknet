
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
              <h2>Atualizar Caixa</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <form>
                  <v-text-field
                    v-model="caixaEditada.name"
                    name="name"
                    label="Nome do Projeto"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model="caixaEditada.address"
                    name="address"
                    label="Endereço"
                    type="text"
                    @input="toUpperCase(caixaEditada.address)"
                  />
                  <v-text-field
                    v-model="caixaEditada.signal"
                    name="signal"
                    label="Sinal"
                    type="number"
                  />
                  <v-btn
                    color="primary"
                    large
                    @click.prevent="salvar"
                  >
                    Salvar
                  </v-btn>
                </form>
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
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'CaixaEditar',
  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/caixas/' + context.params.id)
      .then((response) => {
        return {
          caixa: response.data
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
        text: 'Caixas',
        disabled: false,
        to: '/caixas',
        exact: true,
        link: true
      },
      {
        text: 'Editar Caixa',
        disabled: true
      }
    ],
    caixaEditada: {
      status: ''
    }

  }),

  created () {
    this.caixaEditada = this.caixa
  },

  methods: {
    salvar () {
      this.caixaEditada.status = 'ATIVA'
      this.$store.dispatch('caixas/editarCaixa', this.caixaEditada)
        .then(() => {
          this.$toast.success('Caixa atualizado')
          this.$router.push('/caixas')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },
    toUpperCase (text) {
      this.caixaEditada.address = text.toUpperCase()
    }
  }

}
</script>
