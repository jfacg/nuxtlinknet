
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
                  <h2>Serviços Gerar Boletos</h2>
                </v-col>
                <v-col />
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
                      Excutado
                    </th>
                    <th class="text-left">
                      Cliente
                    </th>
                    <th class="text-left">
                      Endereço
                    </th>
                    <th class="text-left">
                      Boleto Digital
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
                    v-for="servico in servicos"
                    :key="servico.id"
                  >
                    <td>{{ servico.id }}</td>
                    <td>{{ servico.tipo }}</td>
                    <td class="text-center">
                      {{ formatarDataHora(servico.dataExecucao) }}
                    </td>
                    <td>{{ servico.cliente.name }}</td>
                    <td>{{ servico.cliente.street }}, {{ servico.cliente.number }}</td>
                    <td>{{ servico.boletodigital === 'S' ? "SIM" : "NÃO" }}</td>
                    <td>{{ servico.status }}</td>
                    <td width="100px">
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        @click.stop="baixar(servico)"
                      >
                        <v-icon>settings</v-icon>
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
  name: 'ServicoInstalacaoGerarBoletos',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Serviços',
        disabled: false,
        to: '/servicos',
        exact: true,
        link: true
      },
      {
        text: 'Serviços Executados',
        disabled: true
      }
    ],
    servicos: []

  }),

  created () {
    this.listarServicos()
  },

  methods: {

    baixar (servico) {
      servico.boletogerado = 'S'
      this.$axios.$put(URI_BASE_API + API_VERSION + '/servicos/' + servico.id, servico)
        .then((response) => {
          if (response) {
            this.listarServicos()
          }
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    listarServicos () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/gerarboletos')
        .then((response) => {
          this.servicos = response
        })
    },

    formatarDataHora (data) {
      return moment(data).format('DD-MM-YYYY HH:mm')
    }
  }

}
</script>
