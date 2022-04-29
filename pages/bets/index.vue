/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Dicas</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <h1>Dicas</h1>
            <!-- @change="teste(data)" -->
            <!-- <csv-importer
              :file_name.sync="file_name"
              :is_header="checked"
              @file-change="data=$event"
            />
            <v-btn
              elevation="2"
              @click="importar"
            >
              salvar
            </v-btn> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
// import CsvImporter from 'vue-mg-csv-importer'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'BetIndex',

  components: {
    // CsvImporter
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Bets',
        disabled: true
      }
    ],
    carregamento: false,
    data: [],
    file_name: '',
    checked: false

  }),

  created () {
  },

  methods: {
    importar () {
      const linha = []

      linha.push(this.data[0].col1)
      linha.push(this.data[0].col2)
      linha.push(this.data[0].col3)
      linha.push(this.data[0].col4)
      linha.push(this.data[0].col5)
      linha.push(this.data[0].col6)
      linha.push(this.data[0].col7)
      linha.push(this.data[0].col8)
      linha.push(this.data[0].col9)
      linha.push(this.data[0].col10)
      linha.push(this.data[0].col11)
      linha.push(this.data[0].col12)
      linha.push(this.data[0].col13)
      linha.push(this.data[0].col14)
      linha.push(this.data[0].col15)
      linha.push(this.data[0].col16)
      linha.push(this.data[0].col17)
      linha.push(this.data[0].col18)
      linha.push(this.data[0].col19)
      linha.push(this.data[0].col20)

      this.$axios.$post(URI_BASE_API + API_VERSION + '/bets', this.data)
        .then((response) => {
          this.$toast.success('Jogos Importados')
          this.$router.push('/bets')
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
