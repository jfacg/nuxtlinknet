
<template>
  <form>
    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          :value="servico.cliente.name"
          name="cliente"
          label="Nome do Cliente"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          :value="servico.tipo"
          name="servicoTipo"
          label="Tipo de Serviço"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          name="dataAgendamento"
          label="Data do Agendamento"
          type="text"
          :value="servico.dataAgendamento"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          :value="servico.vendedor.name"
          name="vendedor"
          label="Vendedor"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          :value="servico.contato"
          name="contato"
          label="Venda Via"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          :value="servico.indicacao"
          name="indicacao"
          label="Cliente que indicou"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          v-model="servico.valorInstalacao"
          name="valorInstalacao"
          label="Valor da Instalação R$"
          type="text"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-select
          v-model="servico.vencimento"
          :items="diaVencimento"
          label="Dia do Vencimento"
          name="vencimento"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-select
          v-model="servico.pagamento"
          :items="pagamentoTipo"
          label="Forma de Pagamento"
          name="pagamento"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-select
          v-model="servico.plano"
          label="Plano de Velocidade"
          :items="planos"
          name="plano"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          v-model="servico.valorPlano"
          name="valorPlano"
          label="Valor do Plano R$"
          type="text"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="servico.observacao"
          name="observacao"
          label="Observações"
        />
      </v-col>
    </v-row>

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
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicoEditarInstalacaoForm',

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
    planos: [],
    cliente: {
      id: ''
    }

  }),

  created () {
    this.servico = { ...this.$store.getters['servicos/listar_servico'] }
    this.buscarPlanos()
  },

  methods: {

    buscarPlanos () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/ixc/planos')
        .then((response) => {
          response.data.forEach((plano) => {
            this.planos.push(plano.nome)
          })
        })
    },

    salvar () {
      // this.servico.cliente_id = this.$store.getters['servicos/listar_servico'].cliente.id
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.$emit('submit', this.servico)
    }

  }

}
</script>
