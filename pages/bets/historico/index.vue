/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Historico 0-0</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              height="900px"
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-center">
                      #
                    </th>
                    <th class="text-center">
                      LG
                    </th>
                    <th class="text-center">
                      JE
                    </th>
                    <th class="text-center">
                      JC
                    </th>
                    <th class="text-center">
                      JD
                    </th>
                    <th class="text-center">
                      RE
                    </th>
                    <th class="text-center">
                      RC
                    </th>
                    <th class="text-center">
                      RD
                    </th>
                    <th class="text-center">
                      GREEN
                    </th>
                    <th class="text-center">
                      REP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="dica in dicas"
                    :key="dica.id"
                  >
                    <td class="text-center">
                      {{ dica.dicajogoe.data }}
                    </td>
                    <td class="text-center">
                      {{ dica.dicajogoe.liga }}
                    </td>
                    <td
                      class="text-center"
                      style="background: green"
                    >
                      {{ dica.dicajogoe.placar }}
                    </td>
                    <td
                      class="text-center"
                      style="background: blue"
                    >
                      {{ dica.dicajogoc.placar }}
                    </td>
                    <td
                      class="text-center"
                      style="background: green"
                    >
                      {{ dica.dicajogod.placar }}
                    </td>
                    <td class="text-center">
                      {{ dica.jogoe.placar }}
                    </td>
                    <td class="text-center">
                      {{ dica.jogoc.placar }}
                    </td>
                    <td class="text-center">
                      {{ dica.jogod.placar }}
                    </td>
                    <td class="text-center">
                      {{ dica.green }}
                    </td>
                    <td class="text-center">
                      {{ dica.repetida }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
  name: 'BetIndex',

  components: {
  },

  // asyncData (context) {
  //   return context.$axios.$get(URI_BASE_API + API_VERSION + '/betsdicas')
  //     .then((response) => {
  //       return {
  //         consultaDicas: response.data
  //       }
  //     })
  // },

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
    checked: false,
    dicas: []

  }),

  created () {
    this.listar()
  },

  methods: {
    listar () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/beteuroanalises')
        .then((response) => {
          this.dicas = response.data
          this.dicas = this.dicas.sort((a, b) => (a.dicajogoe.placar > b.dicajogoe.placar) ? 1 : ((b.dicajogoe.placar > a.dicajogoe.placar) ? -1 : 0))
          this.dicas = this.dicas.sort((a, b) => (a.dicajogod.placar > b.dicajogod.placar) ? 1 : ((b.dicajogod.placar > a.dicajogod.placar) ? -1 : 0))
        })
    },

    importar () {
      const linha = []

      linha.push(this.data[0].col1)

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
