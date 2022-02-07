
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          :loading="loading"
          outlined
          pa-2
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
                  <v-btn
                    color="primary"
                    elevation="10"
                    exact
                    to="/servicos/criar/servico"
                    link
                  >
                    Novo Serviço
                    <v-icon right>
                      add
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    name="filter"
                    label="Localizar por Tipo"
                    type="text"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-simple-table
              height="400px"
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
                    :style="statusColor(servico.dataAgendamento)"
                  >
                    <td>{{ servico.id }}</td>
                    <td>{{ servico.tipo }}</td>
                    <td class="text-center">
                      {{ formatarDataHora(servico.dataAgendamento) }}
                    </td>

                    <td v-if="servico.tipo === 'INSTALAÇÃO'">
                      {{ servico.cliente.name }}
                    </td>
                    <td v-if="servico.tipo === 'INSTALAÇÃO'">
                      {{ servico.cliente.street }}, {{ servico.cliente.number }}
                    </td>

                    <td v-if="servico.tipo !== 'INSTALAÇÃO'">
                      {{ servico.clienteNome }}
                    </td>
                    <td v-if="servico.tipo !== 'INSTALAÇÃO'">
                      {{ servico.logradouro }}, {{ servico.numero }}
                    </td>

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
                      <v-btn
                        v-if="servico.tipo === 'INSTALAÇÃO'"
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'servicos-editar-instalacao-id', params: {id:servico.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="servico.tipo !== 'INSTALAÇÃO'"
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'servicos-editar-servico-id', params: {id:servico.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
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
    loading: false,
    search: '',
    servicosAbertos: [],
    servicosOrdenados: [],
    servicos: [],
    tempo: ''

  }),

  computed: {
    listarServicos () {
      return this.servicos.filter((servicos) => {
        if (servicos.tipo.toLowerCase().match(this.search.toLowerCase())) {
          return servicos
        }
        return ''
      })
    }
  },

  created () {
    this.consultarServicos()
    this.tempo = setInterval(this.consultarServicos, 60000)
  },

  methods: {

    consultarServicos () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/servicosAbertos')
        .then((response) => {
          // return {
          this.servicos = response.sort((a, b) => (a.dataAgendamento > b.dataAgendamento) ? 1 : ((b.dataAgendamento > a.dataAgendamento) ? -1 : 0))
          // }
        })
    },

    formatarDataHora (data) {
      return moment(data).format('DD-MM-YYYY HH:mm')
    },

    statusColor (data) {
      const vencimento = moment(data).format('DD-MM-YYYY HH:mm')
      const dataAtual = moment(new Date()).format('DD-MM-YYYY HH:mm')
      if (vencimento >= dataAtual) {
        return 'color: green'
      }

      if (vencimento < dataAtual) {
        return 'color: red'
      }
    }
  }

}
</script>
