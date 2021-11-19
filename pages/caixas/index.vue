
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading="carregamento"
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="buscar.nome"
                    prepend-icon="search"
                    name="filter"
                    label="Localizar pelo nome da caixa"
                    type="text"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="buscar.endereco"
                    prepend-icon="search"
                    name="filter"
                    label="Localizar pelo endereço da caixa"
                    type="text"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              height="300px"
              fixed-header
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Nome
                    </th>
                    <th class="text-left">
                      Endereço
                    </th>
                    <th class="text-left">
                      Sinal
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Portas
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="caixa in listarCaixas"
                    :key="caixa.id"
                  >
                    <td>{{ caixa.name }}</td>
                    <td>{{ caixa.address }}</td>
                    <td>{{ caixa.signal }}</td>
                    <td>{{ caixa.status }}</td>
                    <!-- <td>{{ caixa.numberPorts }}</td> -->
                    <td>
                      <router-link :to="{name:'caixas-id-portas', params: {id:caixa.id} }">
                        {{ caixa.numberPorts }}
                      </router-link>
                    </td>
                    <td>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'caixas-editar-id', params: {id: caixa.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <!-- <v-pagination
              v-model="paginacao.atual"
              :length="paginacao.total"
              :total-visible="5"
              circle
              @next="proxima"
              @previous="anterior"
            /> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable nuxt/no-this-in-fetch-data */
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'CaixasIndex',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/caixas')
      .then((response) => {
        return {
          caixasListadas: response
        }
      })
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Caixas FTTH',
        disabled: true
      }
    ],
    carregamento: false,
    search: '',
    buscar: {
      nome: '',
      endereco: ''
    },
    caixas: [],
    paginacao: {
      atual: '',
      total: ''
    }

  }),

  computed: {
    listarCaixas () {
      return this.caixas.data.filter((caixa) => {
        return caixa.name.toLowerCase().match(this.buscar.nome.toLowerCase())
      }).filter((caixa) => {
        return caixa.address.toLowerCase().match(this.buscar.endereco.toLowerCase())
      })
      // eslint-disable-next-line no-console
      // return this.caixas.data
    }

  },

  created () {
    this.caixas = this.caixasListadas
    this.paginacao.atual = this.caixas.current_page
    this.paginacao.total = this.caixas.last_page
  },

  methods: {
    proxima () {
      this.$axios.$get(this.caixas.next_page_url)
        .then((response) => {
          this.caixas = response.data
          this.paginacao.atual = this.caixas.current_page
          this.paginacao.total = this.caixas.last_page
        })
    },
    anterior () {
      this.$axios.$get(this.caixas.prev_page_url)
        .then((response) => {
          this.caixas = response.data
          this.paginacao.atual = this.caixas.current_page
          this.paginacao.total = this.caixas.last_page
        })
    }
  }

}
</script>
