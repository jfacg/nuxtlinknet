
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
              <h2>Nova Maquina</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <form>
              <v-text-field
                v-model="maquina.maquinaNome"
                name="maquinaNome"
                label="Maquina"
                type="text"
              />
              <v-text-field
                v-model="maquina.maquinaDescricao"
                name="maquinaDescricao"
                label="Descrição"
                type="text"
              />
              <v-btn
                color="primary"
                large
                @click.prevent="salvar"
              >
                Salvar
              </v-btn>
            </form>
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
  name: 'MaquinaCriar',

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Maquina',
        disabled: false,
        to: '/maquinas',
        exact: true,
        link: true
      },
      {
        text: 'Nova Maquina',
        disabled: true
      }
    ],

    maquina: {
      maquinaNome: '',
      maquinaDescricao: '',
      maquinaStatus: ''
    }
  }),

  methods: {

    salvar (empresa) {
      this.maquina.maquinaStatus = 'ESTOQUE'
      this.$axios.$post(URI_BASE_API + API_VERSION + '/maquinas', this.maquina)
        .then((response) => {
          this.$toast.success('Maquina criada')
          this.$router.push('/maquinas')
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
