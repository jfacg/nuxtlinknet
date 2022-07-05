
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
                    dense
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
                    label="Localizar por Técnico"
                    type="text"
                    dense
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-row>
                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.instalacao"
                        label="Instalação"
                        value="INSTALAÇÃO"
                        dense
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.mudanca"
                        label="Mudança"
                        value="MUDANÇA"
                        dense
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.migracao"
                        label="Migração"
                        value="MIGRAÇÃO"
                        dense
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.reparo"
                        label="Reparo"
                        value="REPARO"
                        dense
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.recebimento"
                        label="Recebimento"
                        value="RECEBIMENTO"
                        dense
                      />
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      md2
                      lg2
                    >
                      <v-checkbox
                        v-model="filtros.retirada"
                        label="Retirada"
                        value="RETIRADA"
                        dense
                      />
                    </v-flex>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-simple-table
              height="400px"
              fixed-header
              dense
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
                      Vencimento
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
                      Rep
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
                    <td class="text-center">
                      {{ vencimento(servico.dataAgendamento) }}
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
                    <td>
                      <div class="text-center">
                        <v-dialog
                          v-model="dialog"
                          width="500"
                          :retain-focus="false"
                        >
                          <template #activator="{ on, attrs }">
                            <div
                              v-bind="attrs"
                              v-on="on"
                            >
                              {{ servico.repetidas }}
                            </div>
                          </template>

                          <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                              Reclamações
                            </v-card-title>

                            <v-card-text>
                              <div
                                v-for="reparo in servico.reparos"
                                :key="reparo.id"
                              >
                                <br>
                                Cliente: {{ reparo.clienteNome }} <br>
                                Endereço: {{ reparo.logradouro }}, {{ reparo.numero }}  <br>
                                Reclamação: {{ reparo.relatoCliente }}  <br>
                                Reclamante: {{ reparo.reclamante }}  <br>
                                Baixa: {{ reparo.observacao }} <br>
                                Tecnico: {{ reparo.tecnico ? reparo.tecnico.nick_name : "" }} <br>
                                Status: {{ reparo.status }} <br>
                                Data: {{ reparo.dataExecucao }} <br>
                                <br>
                                <v-divider />
                              </div>
                            </v-card-text>

                            <v-divider />

                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                              >
                                Sair
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </td>
                    <td>
                      {{ servico.status }}
                    </td>
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
                      <!-- <v-btn
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
    dialog: false,
    search: '',
    servicosAbertos: [],
    servicosOrdenados: [],
    servicos: [],
    filtros: {
      instalacao: 'INSTALAÇÃO',
      mudanca: 'MUDANÇA',
      migracao: 'MIGRAÇÃO',
      reparo: 'REPARO',
      recebimento: 'RECEBIMENTO',
      retirada: 'RETIRADA'
    }

  }),

  computed: {
    listarServicos () {
      let servicosfiltrados = []

      if (this.filtros.instalacao) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.instalacao) {
            servicosfiltrados.push(servico)
          }
        })
      }
      if (this.filtros.migracao) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.migracao) {
            servicosfiltrados.push(servico)
          }
        })
      }
      if (this.filtros.mudanca) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.mudanca) {
            servicosfiltrados.push(servico)
          }
        })
      }

      if (this.filtros.reparo) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.reparo) {
            servicosfiltrados.push(servico)
          }
        })
      }
      if (this.filtros.recebimento) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.recebimento) {
            servicosfiltrados.push(servico)
          }
        })
      }
      if (this.filtros.retirada) {
        this.servicos.forEach((servico) => {
          if (servico.tipo === this.filtros.retirada) {
            servicosfiltrados.push(servico)
          }
        })
      }

      servicosfiltrados = servicosfiltrados.sort((a, b) => (a.dataAgendamento > b.dataAgendamento) ? 1 : ((b.dataAgendamento > a.dataAgendamento) ? -1 : 0))

      return servicosfiltrados.filter((servico) => {
        if (this.search.length > 0) {
          if (servico.tecnico) {
            if (servico.tecnico.nick_name.toLowerCase().match(this.search.toLowerCase())) {
              return servico
            }
          }
          return ''
        }
        return servico
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

    vencimento (data) {
      return moment(data).add(2, 'hours').format('DD-MM-YYYY HH:mm')
    },

    statusColor (data) {
      const vencimento = moment(data).add(2, 'hours').format('DD-MM-YYYY HH:mm')
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
