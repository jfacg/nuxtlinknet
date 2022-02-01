
<template>
  <v-container>
    <v-layout>
      <v-row>
        <v-col>
          <div
            v-for="servico in servicos"
            :key="servico.id"
          >
            <v-dialog
              v-model="dialogServico"
              persistent
              max-width="500"
            >
              <template #activator="{ on, attrs }">
                <div v-if="servico.tipo === 'INSTALAÇÃO'">
                  <v-card
                    link
                    v-bind="attrs"
                    :color="verificarVencimento(servico.dataAgendamento)"
                    max-width="400"
                    v-on="on"
                    @click="selecionarServico(servico)"
                  >
                    <v-card-title>
                      <span>{{ servico.tipo }} - {{ servico.status }}</span>
                    </v-card-title>
                    <v-divider />
                    <v-card-subtitle>
                      {{ servico.cliente.name }} <br>
                      {{ formatarDataHora(servico.dataAgendamento) }} <br>
                      {{ servico.cliente.street }}, {{ servico.cliente.number }} <br>
                      {{ servico.cliente.district }} <br>
                    </v-card-subtitle>
                  </v-card>
                  <br>
                </div>
                <div v-else>
                  <v-card
                    link
                    v-bind="attrs"
                    :color="verificarVencimento(servico.dataAgendamento)"
                    max-width="400"
                    v-on="on"
                    @click="selecionarServico(servico)"
                  >
                    <v-card-title>
                      <span>{{ servico.tipo }} - {{ servico.status }}</span>
                    </v-card-title>
                    <v-divider />
                    <v-card-subtitle>
                      {{ servico.clienteNome }} <br>
                      {{ formatarDataHora(servico.dataAgendamento) }} <br>
                      {{ servico.logradouro }}, {{ servico.numero }} <br>
                      {{ servico.bairro }} <br>
                    </v-card-subtitle>
                  </v-card>
                  <br>
                </div>
              </template>

              <v-card>
                <v-card-text v-if="servicoSelecionado != null">
                  <br>
                  <v-card>
                    <v-card-title
                      class="text-h5"
                      style="background:#385F73; color:white;"
                    >
                      DADOS DO CLIENTE
                    </v-card-title>

                    <v-card-text>
                      <div v-if="servicoSelecionado.tipo === 'INSTALAÇÃO'">
                        <br>
                        Cliente: {{ servicoSelecionado.cliente.name }} <br>
                        Data de Nascimento: {{ formatarData(servicoSelecionado.cliente.birthday) }} <br>
                        CPF: {{ formatarCpf(servicoSelecionado.cliente.cpf) }}<br>
                        Email: {{ servicoSelecionado.cliente.email }}<br>
                        Contato 1: {{ formatarTelefone(servicoSelecionado.cliente.cellPhone1) }} <br>
                        Contato 2: {{ servicoSelecionado.cliente.cellPhone2 ? formatarTelefone(servicoSelecionado.cliente.cellPhone2) : '' }}<br>
                        Endereço: {{ servicoSelecionado.cliente.street }}, {{ servicoSelecionado.cliente.number }}<br>
                        Complemento: {{ servicoSelecionado.cliente.complement }}<br>
                        Bairro: {{ servicoSelecionado.cliente.district }} - CEP: {{ servicoSelecionado.cliente.cep }}<br>
                        Cidade: {{ servicoSelecionado.cliente.city }} - {{ servicoSelecionado.cliente.state }}<br>
                      </div>
                      <div v-else>
                        <br>
                        Cliente: {{ servicoSelecionado.clienteNome }} <br>
                        CPF: {{ servicoSelecionado.clienteCpf }}<br>
                        Email: {{ servicoSelecionado.clienteEmail }}<br>
                        Contato 1: {{ servicoSelecionado.clienteContato }} <br>
                        Endereço: {{ servicoSelecionado.logradouro }}, {{ servicoSelecionado.numero }}<br>
                        Complemento: {{ servicoSelecionado.complemento }}<br>
                        Bairro: {{ servicoSelecionado.bairro }} - CEP: {{ servicoSelecionado.cep }}<br>
                        Cidade: {{ servicoSelecionado.cidade }} - {{ servicoSelecionado.uf }}<br>
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
                      <div v-if="servicoSelecionado.tipo === 'INSTALAÇÃO'">
                        <br>
                        Serviço: {{ servicoSelecionado.tipo }} <br>
                        Agendamento: {{ formatarDataHora(servicoSelecionado.dataAgendamento) }}<br>
                        Plano: {{ servicoSelecionado.plano }}<br>
                        Valor: R$ {{ servicoSelecionado.valorPlano }}<br>
                        Vencimento: {{ formatarDataHora(servicoSelecionado.vencimento) }}<br>
                        Boleto Digital: {{ servicoSelecionado.boletodigital === 'S' ? 'Sim' : 'Não' }}<br>
                        Instalação: {{ servicoSelecionado.pagamento }}<br>
                        Valor: R$ {{ servicoSelecionado.valorInstalacao }}<br>
                        Vendedor: {{ servicoSelecionado.vendedor.name }}<br>
                        Venda via: {{ servicoSelecionado.contato }}<br>
                        <div v-if="servicoSelecionado.contato === 'INDICACAO' ">
                          Indicação: {{ servicoSelecionado.indicacao }}<br>
                        </div>
                        Observação: {{ servicoSelecionado.observacao }}<br>
                        <br>
                      </div>
                      <div v-else>
                        <br>
                        Serviço: {{ servicoSelecionado.tipo }} <br>
                        Agendamento: {{ formatarDataHora(servicoSelecionado.dataAgendamento) }}<br>
                        <!-- Plano: {{ servicoSelecionado.plano }}<br> -->
                        <!-- Valor: R$ {{ servicoSelecionado.valorPlano }}<br> -->
                        Vencimento: {{ formatarDataHora(servicoSelecionado.vencimento) }}<br>
                        Boleto Digital: {{ servicoSelecionado.boletodigital === 'S' ? 'Sim' : 'Não' }}<br>
                        <!-- Instalação: {{ servicoSelecionado.pagamento }}<br> -->
                        <!-- Valor: R$ {{ servicoSelecionado.valorInstalacao }}<br> -->
                        <!-- Vendedor: {{ servicoSelecionado.vendedor.name }}<br> -->
                        <!-- Venda via: {{ servicoSelecionado.contato }}<br> -->
                        <!-- <div v-if="servicoSelecionado.contato === 'INDICACAO' ">
                          Indicação: {{ servicoSelecionado.indicacao }}<br>
                        </div> -->
                        Observação: {{ servicoSelecionado.observacao }}<br>
                        <br>
                      </div>
                      <v-divider />
                      <br>
                      <div v-if="servicoSelecionado.ixc">
                        <span
                          v-for="login in servicoSelecionado.ixc.logins"
                          :key="login.id"
                        >

                          PPPoe: {{ login.login }} <br>
                          Senha: {{ login.senha }}<br>
                        </span>
                      </div>
                      <br>
                      <v-divider />
                      <br>
                      Abertura: {{ formatarDataHora(servicoSelecionado.dataAbertura) }}<br>
                      Vencimento: {{ formatarDataHora(servicoSelecionado.dataVencimento) }}<br>
                      Execução: {{ formatarDataHora(servicoSelecionado.dataExecucao) }}<br>
                      Status: {{ servicoSelecionado.status }}<br>
                      Técnico: {{ servicoSelecionado.tecnico ? servicoSelecionado.tecnico.name : '' }}
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogServico = false"
                  >
                    Sair
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import moment from 'moment'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'Atividades',

  data: () => ({
    autenticado: {},
    servicos: [],
    servicoSelecionado: null,
    dialogServico: false

  }),

  created () {
    this.autenticado = this.$store.getters['auth/usuarioAutenticado']
    this.buscarServicos()
  },

  methods: {

    buscarServicos () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/servicos/listarportecnico/' + this.autenticado.id)
        .then((response) => {
          this.servicos = response.data
        })
    },

    formatarDataHora (data) {
      return moment(data).format('DD/MM/YYYY HH:mm')
    },
    formatarData (data) {
      return moment(data).format('DD/MM/YYYY')
    },

    formatarTelefone (telefone) {
      const parte1 = telefone.slice(0, 2)
      const parte2 = telefone.slice(2, 7)
      const parte3 = telefone.slice(7, 11)
      return '(' + parte1 + ') ' + parte2 + '-' + parte3
    },

    formatarCpf (cpf) {
      const parte1 = cpf.slice(0, 3)
      const parte2 = cpf.slice(3, 6)
      const parte3 = cpf.slice(6, 9)
      const parte4 = cpf.slice(9, 11)
      return `${parte1}.${parte2}.${parte3}-${parte4}`
    },

    selecionarServico (servico) {
      if (servico.tipo === 'INSTALAÇÃO') {
        const cpf = this.formatarCpf(servico.cliente.cpf)
        this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/buscarPorCpf/' + cpf)
          .then((response) => {
            this.servicoSelecionado = servico
            this.servicoSelecionado.ixc = response.data
          })
      } else {
        this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/' + servico.clienteIdIxc)
          .then((response) => {
            this.servicoSelecionado = servico
            this.servicoSelecionado.ixc = response
          })
      }
    },

    verificarVencimento (data) {
      const vencimento = moment(new Date(data))
      const hoje = moment(new Date())
      if (moment(vencimento).isAfter(hoje)) {
        return 'green'
      } else {
        return 'red'
      }
    }

  }

}

</script>
