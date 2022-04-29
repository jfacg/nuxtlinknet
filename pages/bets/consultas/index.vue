/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Consultar</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <form>
              <v-text-field
                v-model="placar"
                name="placares"
                label="Placares"
                type="text"
              />

              <v-btn
                color="primary"
                large
                @click.prevent="consultar"
              >
                Consultar
              </v-btn>
            </form>

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
                      DT
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
                      {{ dica.id }}
                    </td>
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
  name: 'BetContultas',

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
    placar: '',
    jogos: {
      jogo1: '',
      jogo2: '',
      jogo3: ''
    },
    dicas: []

  }),

  created () {
  },

  methods: {
    consultar () {
      this.dicas = []
      this.jogos.jogo1 = this.placar.substring(0, 3)
      this.jogos.jogo2 = this.placar.substring(4, 7)
      this.jogos.jogo3 = this.placar.substring(8, 11)

      this.$axios.$post(URI_BASE_API + API_VERSION + '/betanalise/consultar', { placares: this.placar })
        .then((response) => {
          this.dicas = response.data
          this.dicas = this.dicas.sort((a, b) => (new Date(a.dicajogoe.data) > new Date(b.dicajogoe.data)) ? 1 : ((new Date(b.dicajogoe.data) > new Date(a.dicajogoe.data)) ? -1 : 0))
        })

      // this.dicas = this.dicas.sort((a, b) => (a.dicajogod.placar > b.dicajogod.placar) ? 1 : ((b.dicajogod.placar > a.dicajogod.placar) ? -1 : 0))
    }

  }

}
</script>
