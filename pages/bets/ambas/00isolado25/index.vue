/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Historico Ambas 0-0</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              height="900px"
              fixed-header
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
                    <th class="text-center">
                      TP
                    </th>
                    <th class="text-center">
                      ST
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
                    <td class="text-center">
                      {{ dica.tipo }}
                    </td>
                    <td class="text-center">
                      {{ dica.status }}
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
      this.$axios.$get(URI_BASE_API + API_VERSION + '/betanalise/ambas0025')
        .then((response) => {
          this.dicas = response.data
          this.dicas = this.dicas.sort((a, b) => (a.dicajogoe.placar > b.dicajogoe.placar) ? 1 : ((b.dicajogoe.placar > a.dicajogoe.placar) ? -1 : 0))
          this.dicas = this.dicas.sort((a, b) => (a.dicajogod.placar > b.dicajogod.placar) ? 1 : ((b.dicajogod.placar > a.dicajogod.placar) ? -1 : 0))
        })
    }

  }

}
</script>
