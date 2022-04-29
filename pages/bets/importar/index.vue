/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Importar Jogos</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="liga"
                    column
                  >
                    <v-radio
                      label="Euro"
                      color="red"
                      value="euro"
                    />
                    <v-radio
                      label="Copa"
                      color="green"
                      value="copa"
                    />
                    <v-radio
                      label="Premier"
                      color="orange"
                      value="premier"
                    />
                    <v-radio
                      label="Super"
                      color="blue"
                      value="super"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
            <csv-importer
              :file_name.sync="file_name"
              :is_header="checked"
              @file-change="data=$event"
            />
            <v-btn
              elevation="2"
              @click="importar"
            >
              salvar
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import CsvImporter from 'vue-mg-csv-importer'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'BetImportarIndex',

  components: {
    CsvImporter
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Dicas',
        disabled: false,
        to: '/bets',
        exact: true,
        link: true

      },
      {
        text: 'Bet Importar',
        disabled: true
      }
    ],
    carregamento: false,
    data: [],
    file_name: '',
    checked: false,
    liga: ''

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

      if (this.liga === 'euro') {
        this.$axios.$post(URI_BASE_API + API_VERSION + '/beteuros', this.data)
          .then((response) => {
            this.$axios.$get(URI_BASE_API + API_VERSION + '/beteuros/euroambas00')
              .then((response) => {
                this.$toast.success('Jogos euroambas00')
              })
              .catch((errors) => {
                this.$toast.success('Error euroambas00')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/beteuros/euroambas10')
              .then((response) => {
                this.$toast.success('Jogos euroambas10')
              })
              .catch((errors) => {
                this.$toast.success('Error euroambas10')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/beteuros/euroambas20')
              .then((response) => {
                this.$toast.success('Jogos euroambas20')
              })
              .catch((errors) => {
                this.$toast.success('Error euroambas20')
              })

            this.$toast.success('Jogos Importados')
            this.$router.push('/bets/importar')
          })
          .catch((errors) => {
            const messages = Object.values(errors)
            messages.forEach((error) => {
              this.$toast.error(error.toString())
            })
          })
      }

      if (this.liga === 'copa') {
        this.$axios.$post(URI_BASE_API + API_VERSION + '/betcopas', this.data)
          .then((response) => {
            this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopaanalises/copaover00')
              .then((response) => {
                this.$toast.success('Jogos Copaover00')
              })
              .catch((errors) => {
                this.$toast.success('Error Copaover00')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopaanalises/copaover20')
              .then((response) => {
                this.$toast.success('Jogos Copaover20')
              })
              .catch((errors) => {
                this.$toast.success('Error Copaover20')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopaanalises/copaover02')
              .then((response) => {
                this.$toast.success('Jogos Copaover02')
              })
              .catch((errors) => {
                this.$toast.success('Error Copaover02')
              })

            // this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopas/copaambas00')
            //   .then((response) => {
            //     this.$toast.success('Jogos copaambas00')
            //   })
            //   .catch((errors) => {
            //     this.$toast.success('Error superambas00')
            //   })

            // this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopas/copaambas10')
            //   .then((response) => {
            //     this.$toast.success('Jogos copaambas10')
            //   })
            //   .catch((errors) => {
            //     this.$toast.success('Error copaambas10')
            //   })

            // this.$axios.$get(URI_BASE_API + API_VERSION + '/betcopas/copaambas20')
            //   .then((response) => {
            //     this.$toast.success('Jogos copaambas20')
            //   })
            //   .catch((errors) => {
            //     this.$toast.success('Error copaambas20')
            //   })

            this.$toast.success('Jogos Importados')
            this.$router.push('/bets/importar')
          })
          .catch((errors) => {
            const messages = Object.values(errors)
            messages.forEach((error) => {
              this.$toast.error(error.toString())
            })
          })
      }

      if (this.liga === 'premier') {
        this.$axios.$post(URI_BASE_API + API_VERSION + '/betpremiers', this.data)
          .then((response) => {
            this.$axios.$get(URI_BASE_API + API_VERSION + '/betpremiers/premierambas00')
              .then((response) => {
                this.$toast.success('Jogos premierambas00')
              })
              .catch((errors) => {
                this.$toast.success('Error superambas00')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betpremiers/premierambas10')
              .then((response) => {
                this.$toast.success('Jogos premierambas10')
              })
              .catch((errors) => {
                this.$toast.success('JoErrorgos superambas10')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betpremiers/premierambas20')
              .then((response) => {
                this.$toast.success('Jogos premierambas20')
              })
              .catch((errors) => {
                this.$toast.success('JogErroros superambas20')
              })

            this.$toast.success('Jogos Importados')
            this.$router.push('/bets/importar')
          })
          .catch((errors) => {
            const messages = Object.values(errors)
            messages.forEach((error) => {
              this.$toast.error(error.toString())
            })
          })
      }

      if (this.liga === 'super') {
        this.$axios.$post(URI_BASE_API + API_VERSION + '/betsupers', this.data)
          .then((response) => {
            this.$axios.$get(URI_BASE_API + API_VERSION + '/betsupers/superambas00')
              .then((response) => {
                this.$toast.success('Jogos superambas00')
              })
              .catch((errors) => {
                this.$toast.error('Erro Super Ambas 0-0')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betsupers/superambas10')
              .then((response) => {
                this.$toast.success('Jogos superambas10')
              })
              .catch((errors) => {
                this.$toast.error('Erro Super Ambas 1-0')
              })

            this.$axios.$get(URI_BASE_API + API_VERSION + '/betsupers/superambas20')
              .then((response) => {
                this.$toast.success('Jogos superambas20')
              })
              .catch((errors) => {
                this.$toast.error('Erro Super Ambas 2-0')
              })
            this.$toast.success('Jogos Importados')

            this.$router.push('/bets/importar')
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

}
</script>
