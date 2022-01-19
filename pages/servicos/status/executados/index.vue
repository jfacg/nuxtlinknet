
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
                  <h2>Serviços Executados</h2>
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
                  <vue-excel-xlsx
                    :data="servicosExcel"
                    :columns="columns"
                  >
                    Download
                  </vue-excel-xlsx>
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
                      Excutado
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
                      {{ formatarDataHora(servico.dataExecucao) }}
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
  name: 'ServicosBaixadosListar',

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
    search: '',
    servicosAbertos: [],
    servicosOrdenados: [],
    columns: [
      {
        label: 'Id',
        field: 'id'
      },
      {
        label: 'Serviço',
        field: 'tipo'
      },
      {
        label: 'Cliente',
        field: 'clienteNome'
      },
      {
        label: 'Cliente Endereço',
        field: 'clienteEndereco'
      },
      {
        label: 'Data Execução',
        field: 'dataExecucao'
      },
      {
        label: 'Boleto Digital',
        field: 'boletodigital'
      },
      {
        label: 'Contato Linknet',
        field: 'contato'
      },
      {
        label: 'Indicação',
        field: 'indicacao'
      },
      {
        label: 'Plano',
        field: 'plano'
      },
      {
        label: 'Valor Instalação',
        field: 'valorInstalacao'
      },
      {
        label: 'Pagamento Instalação',
        field: 'pagamento'
      },
      {
        label: 'Vendedor',
        field: 'vendedorNome'
      },
      {
        label: 'Observação',
        field: 'observacao'
      }

    ],
    servicosExcel: []

  }),

  computed: {
    listarServicos () {
      return this.servicosAbertos.filter((servicos) => {
        return servicos.tipo.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  created () {
    this.servicosNaoExecutados()
  },

  methods: {
    priceFormat (value) {
      return '$ ' + value
    },

    servicosNaoExecutados () {
      const servicosOrdenados = this.servicos.sort((a, b) => (new Date(a.dataExecucao) < new Date(b.dataExecucao)) ? 1 : ((new Date(a.dataExecucao) > new Date(b.dataExecucao)) ? -1 : 0))
      servicosOrdenados.forEach((servico) => {
        if (servico.status === 'EXECUTADO') {
          this.servicosAbertos.push(servico)
          const servicoExcel = { ...servico }
          const cliente = { ...servico.cliente }
          const vendedor = { ...servico.vendedor }
          servicoExcel.clienteNome = cliente.name
          servicoExcel.dataExecucao = this.formatarData(servicoExcel.dataExecucao)
          servicoExcel.clienteEndereco = cliente.street + ', ' + cliente.number
          servicoExcel.vendedorNome = vendedor.name
          this.servicosExcel.push(servicoExcel)
        }
      })
    },
    formatarDataHora (data) {
      return moment(data).format('DD-MM-YYYY HH:mm')
    },
    formatarData (data) {
      return moment(data).format('DD-MM-YYYY')
    }
  }

}
</script>
