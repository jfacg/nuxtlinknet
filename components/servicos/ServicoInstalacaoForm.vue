
<template>
  <form>
    <v-text-field
      v-model="servico.tipo"
      name="servicoTipo"
      label="Tipo de Serviço"
      type="text"
      disabled
    />
    <v-text-field
      v-model="cliente.name"
      name="cliente"
      label="Nome do Cliente"
      type="text"
      disabled
    />
    <v-text-field
      v-model="servico.dataAgendamento"
      name="dataAgendamento"
      label="Data do Agendamento"
      type="datetime-local"
    />
    <v-select
      v-model="servico.vencimento"
      :items="diaVencimento"
      label="Dia do Vencimento"
      name="vencimento"
    />

    <v-text-field
      v-model="servico.valorInstalacao"
      name="valorInstalacao"
      label="Valor da Instalação R$"
      type="text"
    />

    <v-select
      v-model="servico.pagamento"
      :items="pagamentoTipo"
      label="Forma de Pagamento"
      name="pagamento"
    />
    <v-select
      v-model="servico.plano"
      label="Plano de Velocidade"
      :items="planos"
      item-text="nome"
      item-value="nome"
      name="plano"
    />
    <v-select
      :items="vendedores"
      label="Nome do Vendedor"
      name="vendedor"
    >
      <template #item="{item}">
        {{ item.name }}
      </template>
      <template #selection="{item}">
        {{ vendedorSelecionado(item) }}
      </template>
    </v-select>
    <v-combobox
      v-model="servico.contato"
      label="Meio da Venda"
      :items="contatos"
      item-text="nome"
      item-value="nome"
      :return-object="false"
    />
    <v-textarea
      v-model="servico.observacao"
      name="observacao"
      label="Observações"
    />
    <v-btn
      color="primary"
      large
      @click.prevent="salvar"
    >
      Salvar
    </v-btn>
  </form>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-console */
import moment from 'moment'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicoInstalacaoForm',

  data: () => ({
    servicoTipos: [
      'INSTALAÇÃO',
      'MUDANÇA DE ENDEREÇO',
      'MIGRAÇÃO'
    ],
    diaVencimento: [
      5, 10, 15, 20, 25, 30
    ],
    pagamentoTipo: [
      'AVISTA',
      'BOLETO',
      'CARTÃO',
      'PIX'
    ],
    servico: {
      tipo: '',
      dataAgendamento: '',
      dataVencimento: '',
      dataExecucao: '',
      dataFechamento: '',
      vencimento: '',
      valorInstalacao: '',
      pagamento: '',
      observacao: '',
      plano: '',
      status: '',
      historico: '',
      usuario_id: '',
      tecnico_id: null,
      cliente_id: '',
      vendedor_id: '',
      contato: ''
    },
    contatos: [
      'WHATSAPP',
      'FACEBOOK',
      'INSTAGRAM',
      'PANFLETOS',
      'AMIGOS'
    ],
    // cliente: {},
    planos: [],
    vendedores: [],
    cliente: {
      id: ''
    }

  }),

  created () {
    this.servico.tipo = 'INSTALAÇÃO'
    this.buscarCliente()
    this.buscarPlanos()
    this.buscarVendedores()
  },

  methods: {
    buscarCliente () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/clientes/' + this.$route.params.idCliente)
        .then((response) => {
          this.cliente = response.data
        })
    },
    buscarPlanos () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/ixc/planos')
        .then((response) => {
          this.planos = response.data
        })
    },

    buscarVendedores () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/usuarios')
        .then((response) => {
          this.vendedores = response.data
        })
    },

    salvar () {
      this.servico.cliente_id = this.cliente.id
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.servico.status = 'AGENDADO'
      this.servico.dataVencimento = moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('submit', this.servico)
    },

    vendedorSelecionado (item) {
      this.servico.vendedor_id = item.id
      return item.name
    }

  }

}
</script>
