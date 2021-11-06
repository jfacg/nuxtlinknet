
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
            <!-- <v-container>
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
                    link
                  >
                    Criar Novo Serviço
                    <v-icon right>
                      add
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    elevation="10"
                    x-small
                    to="/servicos/status/executados"
                    exact
                    link
                  >
                    Listar Serviços Executados
                  </v-btn>
                  <v-divider />
                  <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    name="filter"
                    label="Localizar por Tipo"
                    type="text"
                  />
                </v-col>
              </v-row>
            </v-container> -->
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
                      Responsavel
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="boleto in boletos"
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
                      {{ formatarDataHora(boleto.data_vencimento) }}
                    </td>
                    <td>{{ boleto.valor }}</td>
                    <td>{{ agendamentoCobranca(boleto.cobrancas) }}</td>
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
        text: 'Serviços',
        disabled: true
      }
    ],
    search: '',
    boletos: [],
    usuario: {
      email: ''
    }

  }),

  computed: {

  },
  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.boletosFiltradoParceiro(this.$store.getters['ixc/listar_boletosixc'])
    // this.boletos = this.$store.getters['ixc/listar_boletosixc']
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
        return cobrancas[cobrancas.length - 1].agendamento !== '' ? this.formatarDataHora(cobrancas[cobrancas.length - 1].agendamento) : ''
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

    formatarDataHora (data) {
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
