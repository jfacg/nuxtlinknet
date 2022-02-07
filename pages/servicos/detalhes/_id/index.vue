
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
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
                    <div v-if="servico.tipo === 'INSTALAÇÃO'">
                      <br>
                      Cliente: {{ servico.cliente.name }} <br>
                      Data de Nascimento: {{ servico.cliente.birthday }} <br>
                      CPF: {{ formataCpf(servico.cliente.cpf) }}<br>
                      RG: {{ servico.cliente.rg }}<br>
                      Email: {{ servico.cliente.email }}<br>
                      Contato 1: {{ formataCelular(servico.cliente.cellPhone1) }} - Contato 2: {{ formataCelular(servico.cliente.cellPhone2 ? servico.cliente.cellPhone2 : '' ) }}<br>
                      <!-- Contato 1: {{ formatarTelefone(servico.cliente.cellPhone1) }} - Contato 2: {{ formatarTelefone(servico.cliente.cellPhone2 ? servico.cliente.cellPhone2 : '' ) }}<br> -->
                      Endereço: {{ servico.cliente.street }}, {{ servico.cliente.number }}<br>
                      Complemento: {{ servico.cliente.complement }}<br>
                      Bairro: {{ servico.cliente.district }} - CEP: {{ servico.cliente.cep }}<br>
                      Cidade: {{ servico.cliente.city }} - {{ servico.cliente.state }}<br>
                    </div>

                    <div v-if="servico.tipo !== 'INSTALAÇÃO'">
                      <br>
                      Cliente: {{ servico.clienteNome }} <br>
                      CPF: {{ servico.clienteCpf }}<br>
                      Email: {{ servico.clienteEmail }}<br>
                      Contato: {{ servico.clienteContato }}<br>
                      Endereço: {{ servico.logradouro }}, {{ servico.numero }}<br>
                      Complemento: {{ servico.complemento }}<br>
                      Bairro: {{ servico.bairro }} - CEP: {{ servico.cep }}<br>
                      Cidade: {{ servico.cidade }} - {{ servico.uf }}<br>
                    </div>
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
                    <div v-if="servico.tipo === 'INSTALAÇÃO'">
                      <br>
                      Tipo do Serviço: {{ servico.tipo }} <br>
                      Data de Agendamento: {{ servico.dataAgendamento }}<br>
                      Plano: {{ servico.plano }}<br>
                      Valor do Plano: {{ servico.valorPlano }}<br>
                      Data Vencimento: {{ servico.vencimento }}<br>
                      Boleto Digital: {{ servico.boletodigital === "S" ? 'SIM' : 'NÃO' }}<br>
                      Pagamento da Instalação: {{ servico.pagamento }}<br>
                      Valor da Instalação: {{ servico.valorInstalacao }}<br>
                      Vendedor: {{ servico.vendedor ? servico.vendedor.name : '' }}<br>
                      Venda via: {{ servico.contato }}<br>
                      <div v-if="servico.contato === 'INDICACAO' ">
                        Cliente que indicou: {{ servico.indicacao }}<br>
                      </div>
                      Reclamação: {{ servico.tipo.tipoNome }}<br>
                      Reclamante: {{ servico.reclamante }}<br>
                      Relato do cliente: {{ servico.relatoCliente }}<br>
                      Observação: {{ servico.observacao }}<br>
                      <br>
                    </div>
                    <div v-if="servico.tipo !== 'INSTALAÇÃO'">
                      <br>
                      Tipo do Serviço: {{ servico.tipo }} <br>
                      Data de Agendamento: {{ servico.dataAgendamento }}<br>
                      Data Vencimento: {{ servico.vencimento }}<br>
                      Boleto Digital: {{ servico.boletodigital === "S" ? 'SIM' : 'NÃO' }}<br>
                      Reclamação: {{ servico.tipo_reclamacao ? servico.tipo_reclamacao.tipoNome : '' }}<br>
                      Reclamante: {{ servico.reclamante }}<br>
                      Relato do cliente: {{ servico.relatoCliente }}<br>
                      Observação: {{ servico.observacao }}<br>
                      <br>
                    </div>
                    <v-divider />
                    <br>
                    <div v-if="servico.ixccliente !== null">
                      <span
                        v-for="login in servico.ixccliente.logins"
                        :key="login.id"
                      >

                        PPPoe: {{ login.login }} <br>
                        Senha: {{ login.senha }}<br>
                      </span>
                    </div>
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
                        <v-textarea
                          v-model="motivo"
                          name="motivo"
                          label="Motivo do Remanejamento"
                          hint="Motivo do Remanejamento"
                          dense
                        />
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
                          v-if="novoTecnico !== '' && motivo !== '' "
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
                        <v-textarea
                          v-model="motivo"
                          name="motivo"
                          label="Motivo do Reagendamento"
                          hint="Motivo do Reagendamento"
                          dense
                        />
                        <v-text-field
                          v-model="novaDataAgendamento"
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
                          v-if="novaDataAgendamento !== '' && motivo !== '' "
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
                      <v-card-text>
                        <v-textarea
                          v-model="motivo"
                          name="motivo"
                          label="Motivo do Reagendamento"
                          hint="Motivo do Reagendamento"
                          dense
                        />
                      </v-card-text>
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
                          v-if="motivo !== '' "
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
                        Cancelar Servico
                      </v-card-title>
                      <v-card-text>
                        <v-textarea
                          v-model="motivo"
                          name="motivo"
                          label="Motivo do Reagendamento"
                          hint="Motivo do Reagendamento"
                          dense
                        />
                      </v-card-text>
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
                          v-if="motivo !== '' "
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

    dialogDespachar: false,
    dialogRemanejar: false,
    dialogReagendar: false,
    dialogBaixar: false,
    dialogCancelar: false,
    tecnicos: [],
    servico: {
      ixccliente: null
    },
    motivo: '',
    novoTecnico: '',
    novaDataAgendamento: ''

  }),

  created () {
    this.buscarServico()
    this.listarTecnicos()
  },

  methods: {
    buscarServico () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/' + this.$route.params.id)
        .then((servico) => {
          this.servico = servico
          console.log(servico.ixccliente)
        })
    },

    dadosixc () {
      if (this.servico.tipo === 'INSTALAÇÃO') {
        const cpf = this.formataCpf(this.servico.cliente.cpf)
        this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/buscarPorCpf/' + cpf)
          .then((ixc) => {
            this.servico.ixc = ixc.data
          })
      }

      if (this.servico.tipo !== 'INSTALAÇÃO') {
        this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/' + this.servico.clienteIdIxc)
          .then((ixc) => {
            this.servico.ixc = ixc
          })
      }
    },

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
      this.servico.status = 'DESPACHADO'
      this.servico.tecnico_id = this.novoTecnico

      this.$store.dispatch('servicos/editarServico', this.servico)
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
      this.servico.status = 'REMANEJADO'
      this.servico.observacao = this.servico.observacao + ' -> ' + this.motivo
      this.servico.tecnico_id = this.novoTecnico

      this.$store.dispatch('servicos/editarServico', this.servico)
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
      this.servico.status = 'REAGENDADO'
      this.servico.tecnico_id = null
      this.servico.observacao = this.servico.observacao + ' -> ' + this.motivo
      this.servico.dataAgendamento = this.novaDataAgendamento

      this.$store.dispatch('servicos/editarServico', this.servico)
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
      this.servico.status = 'EXECUTADO'
      this.servico.dataExecucao = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.servico.observacao = this.servico.observacao + ' -> ' + this.motivo

      this.$store.dispatch('servicos/editarServico', this.servico)
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
      this.servico.status = 'CANCELADO'
      this.servico.dataExecucao = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.servico.observacao = this.servico.observacao + ' -> ' + this.motivo

      this.$store.dispatch('servicos/editarServico', this.servico)
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
      this.novoTecnico = item.id

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
    },

    formataCelular (cell) {
      const cpfOriginal = cell
      let cellFormatado = ''

      cellFormatado = cpfOriginal.replace(/(\d{2})(\d{5})(\d{4})/,
        function (regex, argumento1, argumento2, argumento3) {
          return `(${argumento1}) ${argumento2}-${argumento3}`
        })

      return cellFormatado
    },

    formatarCpf (cpf) {
      const parte1 = cpf.slice(0, 3)
      const parte2 = cpf.slice(3, 6)
      const parte3 = cpf.slice(6, 9)
      const parte4 = cpf.slice(9, 11)
      return `${parte1}.${parte2}.${parte3}-${parte4}`
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
    }
  }
}
</script>
