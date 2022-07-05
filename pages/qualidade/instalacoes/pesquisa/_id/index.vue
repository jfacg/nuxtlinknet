
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
                <v-card>
                  <v-card-text>
                    <br>
                    <v-row>
                      <v-col cols="6">
                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            DADOS DO CLIENTE
                          </v-card-title>
                          <v-card-text v-if="servico !== null">
                            <div>
                              <br>
                              Cliente: {{ servico.cliente.name }} <br>
                              Data de Nascimento: {{ servico.cliente.birthday }} <br>
                              CPF: {{ formataCpf(servico.cliente.cpf) }}<br>
                              RG: {{ servico.cliente.rg }}<br>
                              Email: {{ servico.cliente.email }}<br>
                              Contato 1: {{ formataCelular(servico.cliente.cellPhone1) }} - Contato 2: {{ formataCelular(servico.cliente.cellPhone2 ? servico.cliente.cellPhone2 : '' ) }}<br>
                              Contato 1: {{ formatarTelefone(servico.cliente.cellPhone1) }} - Contato 2: {{ formatarTelefone(servico.cliente.cellPhone2 ? servico.cliente.cellPhone2 : '' ) }}<br>
                              Endereço: {{ servico.cliente.street }}, {{ servico.cliente.number }}<br>
                              Complemento: {{ servico.cliente.complement }}<br>
                              Bairro: {{ servico.cliente.district }} - CEP: {{ servico.cliente.cep }}<br>
                              Cidade: {{ servico.cliente.city }} - {{ servico.cliente.state }}<br>
                            </div>
                          </v-card-text>
                        </v-card>
                        <br>
                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            DADOS DA INSTALAÇÃO
                          </v-card-title>
                          <v-card-text v-if="servico !== null">
                            <div>
                              <br>
                              Tipo do Serviço: {{ servico.tipo }} <br>

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
                              Observação: {{ servico.observacao }}<br>

                              <br>
                              Data da Abertura do Serviço: {{ servico.dataAbertura }}<br>
                              Data de Agendamento: {{ servico.dataAgendamento }}<br>
                              Data do Vencimento do Serviço: {{ servico.dataVencimento }}<br>
                              Data da Execução do Serviço: {{ servico.dataExecucao }}<br>
                              Status do Serviço: {{ servico.status }}<br>
                              Despachado para o Técnico: {{ servico.tecnico ? servico.tecnico.name : '' }}
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            POS INSTALAÇÃO
                          </v-card-title>
                          <v-card-text v-if="servico !== null">
                            <v-form ref="form">
                              <br>

                              <div v-if="fase1()">
                                <h3>{{ servico.pesq_instalacao.fase }}</h3>
                                <br>
                                <v-text-field
                                  v-model="pesquisa.cliente1"
                                  dense
                                  label="Nome do Cliente"
                                />
                                <v-select
                                  v-model="pesquisa.atendimentoTecnico1"
                                  :items="['SIM', 'NÃO']"
                                  label="O técnico atendeu bem?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.atendimentoTecnico1 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoTecnico1"
                                  dense
                                  label="Reclamação do técnico"
                                />
                                <v-select
                                  v-model="pesquisa.instalacaoFisica1"
                                  :items="['SIM', 'NÃO']"
                                  label="Instalação fisica esta adequada?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.instalacaoFisica1 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoInstalacao1"
                                  dense
                                  label="Reclamação da Instalação"
                                />
                                <v-select
                                  v-model="pesquisa.qualidadeInternet1"
                                  :items="['SIM', 'NÃO']"
                                  label="Como esta o funcionamento da Internet?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.qualidadeInternet1 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoIntenet1"
                                  dense
                                  label="Reclamação da Internet"
                                />
                                <v-select
                                  v-model="pesquisa.equipamentoConectado1"
                                  :items="['SIM', 'NÃO']"
                                  label="Todos os equipamentos estão conectados?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.equipamentoConectado1 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoEquipamento1"
                                  dense
                                  label="Reclamação dos Equipamentos"
                                />
                                <v-select
                                  v-model="pesquisa.satisfacao1"
                                  :items="[1, 2, 3, 4, 5]"
                                  label="Nota de satisfação de 1 a 5"
                                  dense
                                />
                                <v-btn
                                  color="primary"
                                  dense
                                  @click.prevent="salvarFase01"
                                >
                                  Salvar Fase 01
                                </v-btn>
                              </div>

                              <div v-if="fase2()">
                                <h3>{{ servico.pesq_instalacao.fase }}</h3>
                                <br>
                                <v-text-field
                                  v-model="pesquisa.cliente2"
                                  dense
                                  label="Nome do Cliente"
                                />
                                <v-select
                                  v-model="pesquisa.qualidadeInternet2"
                                  :items="['SIM', 'NÃO']"
                                  label="Como esta o funcionamento da Internet?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.qualidadeInternet2 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoIntenet2"
                                  dense
                                  label="Reclamação da Internet"
                                />
                                <v-select
                                  v-model="pesquisa.equipamentoConectado2"
                                  :items="['SIM', 'NÃO']"
                                  label="Todos os equipamentos continuam conectados?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.equipamentoConectado2 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoEquipamento2"
                                  dense
                                  label="Reclamação dos Equipamentos"
                                />

                                <v-select
                                  v-model="pesquisa.reclamacao2"
                                  :items="['SIM', 'NÃO']"
                                  label="Existe ou já foi feito alguma reclamação?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.reclamacao2 === 'SIM'"
                                  v-model="pesquisa.reclamacaoReclamacao2"
                                  dense
                                  label="Reclamação do técnico"
                                />
                                <v-select
                                  v-model="pesquisa.satisfacao2"
                                  :items="[1, 2, 3, 4, 5]"
                                  label="Nota de satisfação de 1 a 5"
                                  dense
                                />
                                <v-btn
                                  color="primary"
                                  dense
                                  @click.prevent="salvarFase02"
                                >
                                  Salvar Fase 02
                                </v-btn>
                              </div>

                              <div v-if="fase3()">
                                <h3>{{ servico.pesq_instalacao.fase }}</h3>
                                <br>
                                <v-text-field
                                  v-model="pesquisa.cliente3"
                                  dense
                                  label="Nome do Cliente"
                                />
                                <v-select
                                  v-model="pesquisa.qualidadeInternet3"
                                  :items="['SIM', 'NÃO']"
                                  label="Como esta o funcionamento da Internet?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.qualidadeInternet3 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoIntenet3"
                                  dense
                                  label="Reclamação da Internet"
                                />
                                <v-select
                                  v-model="pesquisa.equipamentoConectado3"
                                  :items="['SIM', 'NÃO']"
                                  label="Todos os equipamentos continuam conectados?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.equipamentoConectado3 === 'NÃO'"
                                  v-model="pesquisa.reclamacaoEquipamento3"
                                  dense
                                  label="Reclamação dos Equipamentos"
                                />

                                <v-select
                                  v-model="pesquisa.reclamacao3"
                                  :items="['SIM', 'NÃO']"
                                  label="Existe ou já foi feito alguma reclamação?"
                                  dense
                                />
                                <v-text-field
                                  v-if="pesquisa.reclamacao3 === 'SIM'"
                                  v-model="pesquisa.reclamacaoReclamacao3"
                                  dense
                                  label="Reclamação do cliente"
                                />

                                <v-select
                                  v-model="pesquisa.satisfacao3"
                                  :items="[1, 2, 3, 4, 5]"
                                  label="Nota de satisfação de 1 a 5"
                                  dense
                                />
                                <v-btn
                                  color="primary"
                                  dense
                                  @click.prevent="salvarFase03"
                                >
                                  Salvar Fase 03
                                </v-btn>
                              </div>
                            </v-form>
                          </v-card-text>
                        </v-card>
                        <br>
                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            CONTATOS COM O CLIENTE
                          </v-card-title>
                          <v-card-text>
                            <v-simple-table
                              fixed-header
                              dense
                            >
                              <template #default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Fase
                                    </th>
                                    <th class="text-left">
                                      Cliente
                                    </th>
                                    <th class="text-left">
                                      Status
                                    </th>
                                    <th class="text-left">
                                      Fase
                                    </th>
                                  </tr>
                                </thead>
                                <tbody v-if="servico !== null">
                                  <tr>
                                    <td>
                                      {{ servico.pesq_instalacao.dataFase1 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.cliente1 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.status1 }}
                                    </td>
                                    <td>
                                      1
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {{ servico.pesq_instalacao.dataFase2 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.cliente2 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.status2 }}
                                    </td>
                                    <td>
                                      2
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {{ servico.pesq_instalacao.dataFase3 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.cliente3 }}
                                    </td>
                                    <td>
                                      {{ servico.pesq_instalacao.status3 }}
                                    </td>
                                    <td>
                                      3
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
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
        text: 'Instalações',
        disabled: false,
        to: '/qualidade/instalacoes',
        exact: true,
        link: true
      },
      {
        text: 'Qualidade',
        disabled: true
      }
    ],
    servico: null,

    detalhes: false,

    model: '',

    pesquisa: {
      cliente1: '',
      atendimentoTecnico1: '',
      reclamacaoTecnico1: '',
      instalacaoFisica1: '',
      reclamacaoInstalacao1: '',
      qualidadeInternet1: '',
      reclamacaoInternet1: '',
      equipamentoConectado1: '',
      reclamacaoEquipamento1: '',
      satisfacao1: '',
      status1: '',

      cliente2: '',
      qualidadeInternet2: '',
      reclamacaoInternet2: '',
      equipamentoConectado2: '',
      reclamacaoEquipamento2: '',
      reclamacao2: '',
      reclamacaoReclamacao2: '',
      satisfacao2: '',
      status2: '',

      cliente3: '',
      qualidadeInternet3: '',
      reclamacaoInternet3: '',
      equipamentoConectado3: '',
      reclamacaoEquipamento3: '',
      reclamacao3: '',
      reclamacaoReclamacao3: '',
      satisfacao3: '',
      status3: ''

    },

    qualidades: null

  }),

  created () {
    this.buscarServico()
  },

  methods: {
    buscarServico () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/' + this.$route.params.id)
        .then((response) => {
          this.servico = response
        })
    },

    salvarFase01 () {
      const fase1 = this.servico.pesq_instalacao
      fase1.cliente1 = this.pesquisa.cliente1
      fase1.atendimentoTecnico1 = this.pesquisa.atendimentoTecnico1
      fase1.reclamacaoTecnico1 = this.pesquisa.reclamacaoTecnico1
      fase1.instalacaoFisica1 = this.pesquisa.instalacaoFisica1
      fase1.reclamacaoInstalacao1 = this.pesquisa.reclamacaoInstalacao1
      fase1.qualidadeInternet1 = this.pesquisa.qualidadeInternet1
      fase1.reclamacaoInternet1 = this.pesquisa.reclamacaoInternet1
      fase1.equipamentoConectado1 = this.pesquisa.equipamentoConectado1
      fase1.reclamacaoEquipamento1 = this.pesquisa.reclamacaoEquipamento1
      fase1.satisfacao1 = this.pesquisa.satisfacao1
      fase1.dataFase1 = moment(new Date()).format('YYYY-MM-DD')
      fase1.fase = 'FASE-02'
      fase1.dataFase2 = moment().add(7, 'days').format('YYYY-MM-DD')
      fase1.dataFase3 = moment().add(14, 'days').format('YYYY-MM-DD')
      if (fase1.atendimentoTecnico1 === 'SIM' && fase1.instalacaoFisica1 === 'SIM' && fase1.qualidadeInternet1 === 'SIM' && fase1.equipamentoConectado1 === 'SIM') {
        fase1.status1 = 'APROVADO'
      } else {
        fase1.status1 = 'REPROVADO'
      }

      this.$axios.$put(URI_BASE_API + API_VERSION + '/pesqInstalacao/' + this.servico.pesq_instalacao.id, this.servico.pesq_instalacao)
        .then((response) => {
          this.$toast.success('Pesquisa Fase 1')
          this.$router.push('/qualidade/instalacoes')
        })
    },

    salvarFase02 () {
      const fase2 = this.servico.pesq_instalacao
      fase2.cliente2 = this.pesquisa.cliente2
      fase2.qualidadeInternet2 = this.pesquisa.qualidadeInternet2
      fase2.reclamacaoInternet2 = this.pesquisa.reclamacaoInternet2
      fase2.equipamentoConectado2 = this.pesquisa.equipamentoConectado2
      fase2.reclamacaoEquipamento2 = this.pesquisa.reclamacaoEquipamento2
      fase2.reclamacao2 = this.pesquisa.reclamacao2
      fase2.reclamacaoReclamacao2 = this.pesquisa.reclamacaoReclamacao2
      fase2.satisfacao2 = this.pesquisa.satisfacao2
      fase2.fase = 'FASE-03'
      fase2.dataFase2 = moment(new Date()).format('YYYY-MM-DD')

      if (fase2.qualidadeInternet2 === 'SIM' && fase2.equipamentoConectado2 === 'SIM' && fase2.reclamacao2 === 'NÃO') {
        fase2.status2 = 'APROVADO'
      } else {
        fase2.status2 = 'REPROVADO'
      }

      this.$axios.$put(URI_BASE_API + API_VERSION + '/pesqInstalacao/' + this.servico.pesq_instalacao.id, this.servico.pesq_instalacao)
        .then((response) => {
          this.$toast.success('Pesquisa Fase 2')
          this.$router.push('/qualidade/instalacoes')
        })
    },

    salvarFase03 () {
      const fase3 = this.servico.pesq_instalacao
      fase3.cliente3 = this.pesquisa.cliente3
      fase3.qualidadeInternet3 = this.pesquisa.qualidadeInternet3
      fase3.reclamacaoInternet3 = this.pesquisa.reclamacaoInternet3
      fase3.equipamentoConectado3 = this.pesquisa.equipamentoConectado3
      fase3.reclamacaoEquipamento3 = this.pesquisa.reclamacaoEquipamento3
      fase3.reclamacao3 = this.pesquisa.reclamacao3
      fase3.reclamacaoReclamacao3 = this.pesquisa.reclamacaoReclamacao3
      fase3.satisfacao3 = this.pesquisa.satisfacao3

      fase3.dataFase3 = moment(new Date()).format('YYYY-MM-DD')
      fase3.fase = 'CONCLUIDO'

      if (fase3.qualidadeInternet3 === 'SIM' && fase3.equipamentoConectado3 === 'SIM' && fase3.reclamacao3 === 'NÃO') {
        fase3.status3 = 'APROVADO'
      } else {
        fase3.status3 = 'REPROVADO'
      }

      this.$axios.$put(URI_BASE_API + API_VERSION + '/pesqInstalacao/' + this.servico.pesq_instalacao.id, this.servico.pesq_instalacao)
        .then((response) => {
          this.$toast.success('Pesquisa Fase 2')
          this.$router.push('/qualidade/instalacoes')
        })
    },

    buscarQualidades () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/qualidades/listarPorservicoId/')
        .then((response) => {
          this.qualidades = response.data
        })
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
    },

    fase1 () {
      if (this.servico.status === 'EXECUTADO') {
        if (this.servico.pesq_instalacao.fase === 'FASE-01') {
          return true
        }
      } else {
        return false
      }
    },

    fase2 () {
      if (this.servico.status === 'EXECUTADO') {
        if (this.servico.pesq_instalacao.fase === 'FASE-02') {
          return true
        }
      } else {
        return false
      }
    },

    fase3 () {
      if (this.servico.status === 'EXECUTADO') {
        if (this.servico.pesq_instalacao.fase === 'FASE-03' && this.servico.pesq_instalacao.cliente3 === null) {
          return true
        }
      } else {
        return false
      }
    }
  }

}
</script>
