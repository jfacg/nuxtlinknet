
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
          md6
        >
          <v-card-title>
            <div>
              <h2>Detalhes do Serviço</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title
                    class="text-h5"
                    style="background:#385F73; color:white;"
                  >
                    DADOS DO CLIENTE
                  </v-card-title>

                  <v-card-text>
                    <br>
                    Cliente: {{ servico.cliente.name }} <br>
                    Data de Nascimento: {{ servico.cliente.birthday }} <br>
                    CPF: {{ servico.cliente.cpf }}<br>
                    Email: {{ servico.cliente.email }}<br>
                    Contato 1: {{ servico.cliente.cellPhone1 }} - Contato 2: {{ servico.cliente.cellPhone2 ? servico.cliente.cellPhone2 : '' }}<br>
                    Endereço: {{ servico.cliente.street }}, {{ servico.cliente.number }}<br>
                    Complemento: {{ servico.cliente.complement }}<br>
                    Bairro: {{ servico.cliente.district }} - CEP: {{ servico.cliente.cep }}<br>
                    Cidade: {{ servico.cliente.city }} - {{ servico.cliente.state }}<br>
                  </v-card-text>
                </v-card>
                <br>
                <v-card>
                  <v-card-title
                    class="text-h5"
                    style="background:#385F73; color:white;"
                  >
                    DADOS DO SERVIÇO
                  </v-card-title>

                  <v-card-text>
                    <br>
                    Tipo do Serviço: {{ servico.tipo }} <br>
                    Data de Agendamento: {{ servico.dataAgendamento }}<br>
                    Plano: {{ servico.plano }}<br>
                    Valor do Plano: {{ servico.valorPlano }}<br>
                    Data Vencimento: {{ servico.vencimento }}<br>
                    Pagamento da Instalação: {{ servico.pagamento }}<br>
                    Valor da Instalação: {{ servico.valorInstalacao }}<br>
                    Vendedor: {{ servico.vendedor.name }}<br>
                    Venda via: {{ servico.contato }}<br>
                    <div v-if="servico.contato === 'INDICACAO' ">
                      Cliente que indicou: {{ servico.indicacao }}<br>
                    </div>
                    Observação: {{ servico.observacao }}<br>
                    <br>
                    <v-divider />
                    <br>
                    Data da Abertura do Serviço: {{ servico.dataAbertura }}<br>
                    Data do Vencimento do Serviço: {{ servico.dataVencimento }}<br>
                    Data da Execução do Serviço: {{ servico.dataExecucao }}<br>
                    Status do Serviço: {{ servico.status }}<br>
                    Despachado para o Técnico: {{ servico.tecnico ? servico.tecnico.name : '' }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-flex
                  v-if="mostrarDialogDespachar(servico.status)"
                  ma-1
                >
                  <v-dialog
                    v-model="dialogDespachar"
                    persistent
                    max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Despachar Serviço
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Despachar para o técnico
                      </v-card-title>
                      <v-card-text>
                        <v-select
                          :items="tecnicos"
                          label="Nome do Técnico"
                          name="tecnico"
                        >
                          <template #item="{item}">
                            {{ item.name }}
                          </template>
                          <template #selection="{item}">
                            {{ tecnicoSelecionado(item) }}
                          </template>
                        </v-select>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          text
                          @click="dialogDespachar = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.stop="despachar"
                        >
                          Despachar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <!-- DESPACHAR -->

                <v-flex
                  v-if="mostrarDialogRemanejar(servico.status)"
                  ma-1
                >
                  <v-dialog
                    v-model="dialogRemanejar"
                    persistent
                    max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        color="info"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Remanejar Serviço
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Remanejar para o técnico
                      </v-card-title>
                      <v-card-text>
                        <v-select
                          :items="tecnicos"
                          label="Nome do Técnico"
                          name="tecnico"
                        >
                          <template #item="{item}">
                            {{ item.name }}
                          </template>
                          <template #selection="{item}">
                            {{ tecnicoSelecionado(item) }}
                          </template>
                        </v-select>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          text
                          @click="dialogRemanejar = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.stop="remanejar"
                        >
                          Remanejar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <!-- REMANEJAR -->

                <v-flex
                  v-if="mostrarDialogReagendar(servico.status)"
                  ma-1
                >
                  <v-dialog
                    v-model="dialogReagendar"
                    persistent
                    max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        color="warning"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Reagendar Serviço
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Reagendar Servico
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="servicoEditado.dataAgendamento"
                          name="dataAgendamento"
                          label="Data do Agendamento"
                          type="datetime-local"
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          text
                          @click="dialogReagendar = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.stop="reagendar"
                        >
                          Reagendar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <!-- REAGENDAR -->

                <v-flex
                  v-if="mostrarDialogBaixar(servico.status)"
                  ma-1
                >
                  <v-dialog
                    v-model="dialogBaixar"
                    persistent
                    max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        color="success"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Baixar Serviço
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Baixar Servico
                      </v-card-title>
                      <v-card-text />
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          text
                          @click="dialogBaixar = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.stop="baixar"
                        >
                          Baixar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <!-- BAIXAR -->

                <v-flex
                  v-if="mostrarDialogCancelar(servico.status)"
                  ma-1
                >
                  <v-dialog
                    v-model="dialogCancelar"
                    persistent
                    max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        color="error"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Cancelar Serviço
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Baixar Servico
                      </v-card-title>
                      <v-card-text />
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          text
                          @click="dialogCancelar = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.stop="cancelar"
                        >
                          Cancelar Serviço
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- CANCELAR -->
                </v-flex>
              </v-col>
            </v-row>
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
  name: 'ServicosDetalhes',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/' + context.params.id)
      .then((response) => {
        return {
          servico: response
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
        text: 'Detalhes do Serviço',
        disabled: true
      }

    ],
    servicoEditado: {
      tecnico_id: '',
      usuario_id: '',
      status: '',
      dataExecucao: ''
    },
    dialogDespachar: false,
    dialogRemanejar: false,
    dialogReagendar: false,
    dialogBaixar: false,
    dialogCancelar: false,
    tecnicos: []

  }),

  created () {
    this.servicoEditado = this.servico
    this.listarTecnicos()
  },

  methods: {
    listarTecnicos () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/usuarios')
        .then((response) => {
          this.tecnicos = response
        })
    },

    mostrarDialogDespachar (status) {
      const liberados = ['AGENDADO', 'REAGENDADO']
      let mostrar = false
      liberados.forEach((e) => {
        if (e === status) {
          mostrar = true
        }
      })
      return mostrar
    },

    mostrarDialogRemanejar (status) {
      const liberados = ['AGENDADO', 'REAGENDADO', 'DESPACHADO', 'REMANEJADO']
      let mostrar = false
      liberados.forEach((e) => {
        if (e === status) {
          mostrar = true
        }
      })
      return mostrar
    },

    mostrarDialogReagendar (status) {
      const liberados = ['AGENDADO', 'REAGENDADO', 'DESPACHADO', 'REMANEJADO']

      let mostrar = false
      liberados.forEach((e) => {
        if (e === status) {
          mostrar = true
        }
      })
      return mostrar
    },

    mostrarDialogBaixar (status) {
      const liberados = ['DESPACHADO', 'REMANEJADO']

      let mostrar = false
      liberados.forEach((e) => {
        if (e === status) {
          mostrar = true
        }
      })
      return mostrar
    },

    mostrarDialogCancelar (status) {
      const liberados = ['AGENDADO', 'REAGENDADO', 'DESPACHADO', 'REMANEJADO']

      let mostrar = false
      liberados.forEach((e) => {
        if (e === status) {
          mostrar = true
        }
      })
      return mostrar
    },

    despachar () {
      this.servicoEditado.status = 'DESPACHADO'

      this.$store.dispatch('servicos/editarServico', this.servicoEditado)
        .then(() => {
          this.dialogDespachar = false
          this.$toast.success('Servico Despachado')
          // this.$nuxt.refresh()
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    remanejar () {
      this.servicoEditado.status = 'REMANEJADO'

      this.$store.dispatch('servicos/editarServico', this.servicoEditado)
        .then(() => {
          this.dialogRemanejar = false
          this.$toast.success('Servico Remanejado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    reagendar () {
      this.servicoEditado.status = 'REAGENDADO'
      this.servicoEditado.tecnico_id = null

      this.$store.dispatch('servicos/editarServico', this.servicoEditado)
        .then(() => {
          this.dialogReagendar = false
          this.$toast.success('Servico Reagendado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    baixar () {
      this.servicoEditado.status = 'EXECUTADO'
      this.servicoEditado.dataExecucao = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.servicoEditado.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id

      this.$store.dispatch('servicos/editarServico', this.servicoEditado)
        .then(() => {
          this.dialogBaixar = false
          this.$toast.success('Servico Reagendado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    cancelar () {
      this.servicoEditado.status = 'CANCELADO'
      this.servicoEditado.dataExecucao = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.servicoEditado.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id

      this.$store.dispatch('servicos/editarServico', this.servicoEditado)
        .then(() => {
          this.dialogBaixar = false
          this.$toast.success('Servico Reagendado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    tecnicoSelecionado (item) {
      this.servicoEditado.tecnico_id = item.id
      return item.name
    },

    excluir () {
      this.$store.dispatch('projetos/excluirProjeto', this.projeto)
        .then(() => {
          this.$router.push('/projetos')
          this.$toast.success('Projeto excluido')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    }
  }
}
</script>
