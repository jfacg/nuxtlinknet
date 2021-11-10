
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
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="3"
                >
                  <v-select
                    v-model="filtro.parceiro"
                    :items="parceiros"
                    item-text="parceiro"
                    item-value="filial"
                    label="Parceiro"
                    dense
                    solo
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="3"
                >
                  <v-select
                    v-model="filtro.agendamento"
                    :items="agendamentos"
                    label="Agendamento"
                    dense
                    solo
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="3"
                >
                  <v-select
                    v-model="filtro.status"
                    :items="status"
                    label="Status"
                    dense
                    solo
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="3"
                >
                  <div>Total: {{ boletosFiltrados.length }}</div>
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
                      Cliente
                    </th>
                    <th class="text-left">
                      Vencimento
                    </th>
                    <th class="text-left">
                      Valor
                    </th>
                    <th class="text-left">
                      Agendamento
                    </th>
                    <th class="text-left">
                      Tipo
                    </th>
                    <th class="text-left">
                      Responsavel
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="boleto in boletosFiltrados"
                    :key="boleto.id"
                    :style="corDaCobranca(boleto.cobrancas)"
                  >
                    <td>{{ boleto.id }}</td>
                    <td>
                      <v-dialog
                        transition="dialog-bottom-transition"
                        fullscreen
                      >
                        <template #activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ boleto.client_ixc.razao }}
                          </div>
                        </template>
                        <template #default="dialog">
                          <v-card>
                            <v-toolbar
                              color="primary"
                              dark
                            >
                              Agendamento de Cobranças
                            </v-toolbar>
                            <v-card-text>
                              <CobrancaForm
                                :boletoixc="boleto"
                                @submit="salvar"
                              />
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="dialog.value = false"
                              >
                                Close
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </td>
                    <td class="text-center">
                      {{ formatarData(boleto.data_vencimento) }}
                    </td>
                    <td>{{ boleto.valor }}</td>
                    <td>{{ agendamentoCobranca(boleto.cobrancas) }}</td>
                    <td>{{ tipoAgendamentoCobranca(boleto.cobrancas) }}</td>
                    <td>{{ filial(boleto.filial_id) }}</td>
                    <td>{{ statusCobranca(boleto.cobrancas) }}</td>
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
import { URI_BASE_API, API_VERSION, PARCEIROS } from '@/config/config'
import CobrancaForm from '@/components/cobrancas/CobrancaForm.vue'

export default {
  name: 'ServicosListar',

  components: {
    CobrancaForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cobrancas/boletosAbertos')
      .then((response) => {
        context.store.commit('ixc/inserir_boletosixc', response)
        return {
          boletosAbertos: response
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
        text: 'Cobranças',
        disabled: true
      }
    ],
    search: '',
    boletos: [],
    usuario: {
      email: ''
    },
    filtro: {
      parceiro: '',
      agendamento: '',
      status: ''
    },
    parceiros: [
      {
        parceiro: 'Todos',
        filial: 0
      },
      {
        parceiro: 'On Telecom',
        filial: 4
      },
      {
        parceiro: 'Raniere',
        filial: 6
      },
      {
        parceiro: 'Linknet',
        filial: 1
      }

    ],
    agendamentos: [
      'Todos',
      'Hoje',
      'Amanha',
      'Semana'
    ],
    status: [
      'Todos',
      'Agendado',
      'Tratando',
      'Vencido',
      'Não Tratado'
    ]

  }),

  computed: {
    boletosFiltrados () {
      // eslint-disable-next-line array-callback-return
      return this.boletos.filter((boleto) => {
        if (this.filtro.parceiro === 0 || this.filtro.parceiro === '') {
          return boleto
        } else if (this.filtro.parceiro === boleto.filial_id) {
          return boleto
        }
        // eslint-disable-next-line array-callback-return
      }).filter((boleto) => {
        if (this.filtro.status === '' || this.filtro.status === 'Todos') {
          return boleto
        } else if (boleto.cobrancas.length > 0) {
          if (boleto.cobrancas[boleto.cobrancas.length - 1].status.toLowerCase() === this.filtro.status.toLowerCase()) {
            return boleto
          }
        } else if (boleto.cobrancas.length === 0) {
          if (this.filtro.status === 'Não Tratado') {
            return boleto
          }
        }
        // eslint-disable-next-line array-callback-return
      }).filter((boleto) => {
        if (this.filtro.agendamento === '' || this.filtro.agendamento === 'Todos') {
          return boleto
        } else if (boleto.cobrancas.length > 0) {
          const dataAgendamento = this.formatarData(boleto.cobrancas[boleto.cobrancas.length - 1].dataAgendamento)
          const hoje = moment().format('DD-MM-YYYY')
          const amanha = moment().add(1, 'days').format('DD-MM-YYYY')
          const semana = moment().add(6, 'days').format('DD-MM-YYYY')
          if (dataAgendamento === hoje && this.filtro.agendamento === 'Hoje') {
            return boleto
          }
          if (dataAgendamento === amanha && this.filtro.agendamento === 'Amanha') {
            return boleto
          }
          if (dataAgendamento <= semana && dataAgendamento >= hoje && this.filtro.agendamento === 'Semana') {
            return boleto
          }
        }
      })
    }

  },
  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.boletosFiltradoParceiro(this.$store.getters['ixc/listar_boletosixc'])
  },

  methods: {
    boletosFiltradoParceiro (listaBoletos) {
      const filial = this.filialParceiro(this.usuario)
      if (filial === 0) {
        this.boletos = listaBoletos
      }
      if (filial === 4) {
        listaBoletos.forEach((boleto) => {
          if (boleto.filial_id === filial || boleto.filial_id === 2) {
            this.boletos.push(boleto)
          }
        })
      }
      if (filial === 4) {
        listaBoletos.forEach((boleto) => {
          if (boleto.filial_id === filial || boleto.filial_id === 2) {
            this.boletos.push(boleto)
          }
        })
      }
      if (filial === 6) {
        listaBoletos.forEach((boleto) => {
          if (boleto.filial_id === filial) {
            this.boletos.push(boleto)
          }
        })
      }
      if (filial === 1) {
        listaBoletos.forEach((boleto) => {
          if (boleto.filial_id === filial) {
            this.boletos.push(boleto)
          }
        })
      }
    },

    filialParceiro (usuario) {
      let filial = 0
      PARCEIROS.forEach((parceiro) => {
        if (usuario.email === parceiro.email) {
          filial = parceiro.filial
        }
      })
      return filial
    },

    salvar (data) {
      this.$store.dispatch('cobrancas/criarCobranca', data.cobranca)
        .then((response) => {
          const dados = {
            cobranca: response.data,
            boletoId: data.boletoId
          }
          this.$store.commit('ixc/adicionar_cobranca', dados)
          this.$toast.success('Permissão criada')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    statusCobranca (cobrancas) {
      if (cobrancas.length !== 0) {
        return cobrancas[cobrancas.length - 1].status
      } else {
        return ''
      }
    },

    agendamentoCobranca (cobrancas) {
      if (cobrancas.length !== 0) {
        return cobrancas[cobrancas.length - 1].dataAgendamento !== null ? this.formatarData(cobrancas[cobrancas.length - 1].dataAgendamento) : ''
      } else {
        return ''
      }
    },

    tipoAgendamentoCobranca (cobrancas) {
      if (cobrancas.length !== 0) {
        return cobrancas[cobrancas.length - 1].tipoAgendamento !== null ? cobrancas[cobrancas.length - 1].tipoAgendamento : ''
      } else {
        return ''
      }
    },

    corDaCobranca (cobrancas) {
      const status = this.statusCobranca(cobrancas)

      if (status === 'AGENDADO') {
        return 'color:green'
      }
      if (status === 'VENCIDO') {
        return 'color:red'
      }
      if (status === 'TRATANDO') {
        return 'color:blue'
      }
    },

    formatarData (data) {
      return moment(data).format('DD-MM-YYYY')
    },

    filial (id) {
      if (id === 1) {
        return 'LINKNET'
      }
      if (id === 4) {
        return 'ON TELECOM'
      }
      if (id === 6) {
        return 'RANIERE'
      }
    }
  }

}
</script>
