
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
            <v-container>
              <v-row>
                <v-col>
                  <h2>Lista de Serviços</h2>
                </v-col>
                <v-col />
              </v-row>
              <v-row>
                <v-col>
                  <!-- <v-btn
                    color="primary"
                    elevation="10"
                    to="/servicos/criar"
                    exact
                    link
                    @click.stop="$emit('input', false)"
                  >
                    Criar Novo Serviço
                    <v-icon right>
                      add
                    </v-icon>
                  </v-btn> -->
                </v-col>
                <v-col>
                  <!-- <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    name="filter"
                    label="Localizar por Tipo"
                    type="text"
                  /> -->
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
                      #
                    </th>
                    <th class="text-left">
                      Serviço
                    </th>
                    <th class="text-left">
                      Agendamento
                    </th>
                    <th class="text-left">
                      Cliente
                    </th>
                    <th class="text-left">
                      Endereço
                    </th>
                    <th class="text-left">
                      Técnico
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th
                      class="text-left"
                      width="150px"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="servico in listarServicos"
                    :key="servico.id"
                  >
                    <td>{{ servico.id }}</td>
                    <td>{{ servico.tipo }}</td>
                    <td class="text-center">
                      {{ formatarDataHora(servico.dataAgendamento) }}
                    </td>
                    <td>{{ servico.cliente.name }}</td>
                    <td>{{ servico.cliente.street }}, {{ servico.cliente.number }}</td>
                    <td>{{ servico.tecnico ? servico.tecnico.nick_name : "" }}</td>
                    <td>{{ servico.status }}</td>
                    <td width="100px">
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'servicos-detalhes-id', params: {id: servico.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>settings</v-icon>
                      </v-btn>
                      <!--<v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'servicos-id', params: {id:servico.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn> -->
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
import moment from 'moment'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicosListar',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/servicos')
      .then((response) => {
        return {
          servicos: response
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
        text: 'Serviços',
        disabled: true
      }
    ],
    search: '',
    servicosAbertos: [],
    servicosOrdenados: []

  }),

  computed: {
    listarServicos () {
      return this.servicosAbertos.filter((servicos) => {
        return servicos.tipo.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  created () {
    this.servicosOrdenados = this.servicos.sort((a, b) => (a.dataAgendamento > b.dataAgendamento) ? 1 : ((b.dataAgendamento > a.dataAgendamento) ? -1 : 0))
    this.servicosNaoExecutados()
  },

  methods: {
    servicosNaoExecutados () {
      this.servicosOrdenados.forEach((servico) => {
        if (servico.status !== 'EXECUTADO' && servico.status !== 'BAIXADO') {
          this.servicosAbertos.push(servico)
        }
      })
    },
    formatarDataHora (data) {
      return moment(data).format('DD-MM-YYYY HH:mm')
    }
  }

}
</script>
