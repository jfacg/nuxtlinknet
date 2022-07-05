
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col>
            <v-card
              elevation="24"
            >
              <v-card-title>
                <h2>Qualidade Instalações</h2>
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
                          Fase
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
                        v-for="servico in instalacoesFiltradas"
                        :key="servico.id"
                      >
                        <td>{{ servico.id }}</td>
                        <td>{{ servico.tipo }}</td>
                        <td class="text-center">
                          {{ dataPesquisa(servico) }}
                        </td>
                        <td>{{ servico.cliente.name }}</td>
                        <td>{{ servico.pesq_instalacao.fase }}</td>
                        <td>{{ servico.status }}</td>
                        <td width="100px">
                          <v-btn
                            color="orange"
                            elevation="10"
                            icon
                            x-small
                            link
                            exact
                            :to="{name: 'qualidade-instalacoes-pesquisa-id', params: {id: servico.id}}"
                            @click.stop="$emit('input', false)"
                          >
                            <v-icon>visibility</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import moment from 'moment'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'QualidadeInstalacoesIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },

      {
        text: 'Qualidade',
        disabled: true
      }
    ],
    instalacoes: [],
    instalacoesFiltradas: [],

    instalacao: null,

    detalhes: false,

    model: '',

    qualidade: {
      instalacaoFisica: '',
      atendimentoTecnico: '',
      qualidadeInternet: '',
      equipamentoConectado: ''

    }

  }),

  created () {
    this.listarInstalacoes()
  },

  methods: {
    listarInstalacoes () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/pesquisaInstalacoes')
        .then((response) => {
          this.instalacoes = response.sort((a, b) => (a.pesq_instalacao.fase > b.pesq_instalacao.fase) ? 1 : ((b.pesq_instalacao.fase > a.pesq_instalacao.fase) ? -1 : 0))
          this.filtrarInstalacoesPorAgendamento()
        })
    },

    filtrarInstalacoesPorAgendamento () {
      this.instalacoes.forEach((instalacao) => {
        const dataFase2 = moment(instalacao.pesq_instalacao.dataFase2).format('DD-MM-YYYY')
        const dataFase3 = moment(instalacao.pesq_instalacao.dataFase3).format('DD-MM-YYYY')
        const dataHoje = moment(new Date()).format('DD-MM-YYYY')
        console.log(instalacao.pesq_instalacao.fase)
        if (instalacao.pesq_instalacao.fase === 'FASE-01') {
          this.instalacoesFiltradas.push(instalacao)
        }

        if (instalacao.pesq_instalacao.fase === 'FASE-02' && dataHoje >= dataFase2) {
          this.instalacoesFiltradas.push(instalacao)
        }

        if (instalacao.pesq_instalacao.fase === 'FASE-03' && dataHoje >= dataFase3) {
          this.instalacoesFiltradas.push(instalacao)
        }
      })
    },

    dataPesquisa (servico) {
      if (servico.pesq_instalacao.fase === 'FASE-01') {
        return moment(new Date()).format('DD-MM-YYYY')
      }

      if (servico.pesq_instalacao.fase === 'FASE-02') {
        return moment(servico.pesq_instalacao.dataFase2).format('DD-MM-YYYY')
      }

      if (servico.pesq_instalacao.fase === 'FASE-03') {
        return moment(servico.pesq_instalacao.dataFase3).format('DD-MM-YYYY')
      }
    },

    instalacaoSelecionada (instalacao) {
      this.instalacao = instalacao
    },

    formatarDataHora (data) {
      return moment(data).format('DD-MM-YYYY HH:mm')
    },

    formatarTelefone (telefone) {
      const parte1 = telefone.slice(0, 2)
      const parte2 = telefone.slice(2, 7)
      const parte3 = telefone.slice(7, 11)
      return '(' + parte1 + ') ' + parte2 + '-' + parte3
    },

    formataCpf (cpf) {
      const cpfOriginal = cpf
      let cpfFormatado = ''

      cpfFormatado = cpfOriginal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        function (regex, argumento1, argumento2, argumento3, argumento4) {
          return `${argumento1}.${argumento2}.${argumento3}-${argumento4}`
        })

      return cpfFormatado
    },

    formataCelular (cell) {
      const cpfOriginal = cell
      let cellFormatado = ''

      cellFormatado = cpfOriginal.replace(/(\d{2})(\d{5})(\d{4})/,
        function (regex, argumento1, argumento2, argumento3) {
          return `(${argumento1}) ${argumento2}-${argumento3}`
        })

      return cellFormatado
    }
  }

}
</script>
