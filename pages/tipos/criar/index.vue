
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
            <form>
              <v-text-field
                v-model="tipo.tipoNome"
                name="tipoNome"
                label="Tipo"
                type="text"
                dense
              />

              <v-select
                v-model="tipo.tipoClasse"
                label="Classe"
                :items="classes"
                name="tipoClasse"
                dense
              />

              <v-text-field
                v-model="tipo.descricao"
                name="descricao"
                label="Descrição"
                type="text"
                dense
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
  name: 'TipoCriar',

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Tipos',
        disabled: false,
        to: '/tipos',
        exact: true,
        link: true
      },
      {
        text: 'Novo Tipo',
        disabled: true
      }
    ],
    tipo: {
      tipoNome: '',
      tipoClasse: '',
      tipoDescricao: ''
    },
    classes: [
      'DEFEITO',
      'SOLUÇÃO'
    ]
  }),

  methods: {

    salvar () {
      this.$axios.$post(URI_BASE_API + API_VERSION + '/tipos', this.tipo)
        .then((response) => {
          this.$toast.success('Tipo criado')
          this.$router.push('/tipos')
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
