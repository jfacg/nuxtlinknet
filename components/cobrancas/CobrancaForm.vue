
<template>
  <form>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-text-field
          :value="boletoEditado.client_ixc.razao"
          name="cliente"
          label="Cliente"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-text-field
          :value="clienteEndereco(boletoEditado.client_ixc)"
          name="endereco"
          label="Endereço"
          type="text"
          disabled
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          name="vencimento"
          label="Data de Vencimento"
          type="text"
          :value="formatarData(boletoEditado.data_vencimento)"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          :value="boletoEditado.valor"
          name="valor"
          label="Valor"
          type="text"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          :value="boletoEditado.client_ixc.telefone_celular"
          name="contato"
          label="Contato"
          type="text"
          disabled
        />
      </v-col>
    </v-row>

    <v-simple-table
      height="150px"
      fixed-header
      dense
    >
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Data
            </th>
            <th class="text-left">
              Comentário
            </th>
            <th class="text-left">
              Agendamento
            </th>
            <th class="text-left">
              Tipo
            </th>
            <th class="text-left">
              Usuario
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cobranca in boletoEditado.cobrancas"
            :key="cobranca.id"
          >
            <td>{{ formatarData(cobranca.created_at) }}</td>
            <td>{{ cobranca.mensagem ? cobranca.mensagem : '' }}</td>
            <td>{{ cobranca.dataAgendamento !== null ? formatarData(cobranca.dataAgendamento) : '' }}</td>
            <td>{{ cobranca.tipoAgendamento !== null ? cobranca.tipoAgendamento : '' }}</td>
            <td>{{ cobranca.usuario ? cobranca.usuario.nick_name : '' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-textarea
      v-model="cobrancaEditada.mensagem"
      outlined
      name="mensagem"
      label="Acordo com o cliente"
    />
    <v-row>
      <v-col
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-text-field
          v-model="cobrancaEditada.dataAgendamento"
          name="dataAgendamento"
          label="Data do Agendamento"
          type="date"
        />
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-select
          v-if="cobrancaEditada.dataAgendamento !== null"
          v-model="cobrancaEditada.tipoAgendamento"
          :items="tipoAgendamento"
          label="Tipo"
        />
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      large
      :disabled="desativar"
      @click.prevent="salvar"
    >
      Salvar
    </v-btn>
  </form>
</template>

<script>
/* eslint-disable no-console */
import moment from 'moment'

export default {
  name: 'CobrancaForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    boletoixc: {
      type: Object,
      required: false
    }

  },
  data: () => ({
    cobrancaEditada: {
      dataAgendamento: null,
      tipoAgendamento: null,
      usuario_id: '',
      boletoixc_id: '',
      status: '',
      mensagem: ''
    },

    boletoEditado: {
      id: '',
      cobrancas: []
    },

    tipoAgendamento: [
      'COBRANCA',
      'PAGAMENTO',
      'RETIRADA',
      'VISITA'

    ]
  }),

  computed: {
    desativar () {
      if (this.cobrancaEditada.mensagem === '') {
        return true
      } else {
        return false
      }
    }
  },

  created () {
    this.boletoEditado = this.boletoixc
  },

  methods: {
    salvar () {
      this.cobrancaEditada.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.cobrancaEditada.boletoixc_id = this.boletoEditado.id
      if (this.cobrancaEditada.dataAgendamento !== null) {
        this.cobrancaEditada.status = 'AGENDADO'
      } else {
        this.cobrancaEditada.status = 'TRATANDO'
      }

      const data = {
        cobranca: this.cobrancaEditada,
        boletoId: this.boletoEditado.id
      }

      this.$emit('submit', data)
      this.resetCobrancaEditata()
    },

    resetCobrancaEditata () {
      const cobrancaEditada = {
        dataAgendamento: null,
        tipoAgendamento: null,
        usuario_id: '',
        boletoixc_id: '',
        status: '',
        mensagem: ''
      }
      this.cobrancaEditada = cobrancaEditada
    },

    formatarData (data) {
      return moment(data).format('DD-MM-YYYY')
    },

    clienteEndereco (cliente) {
      return cliente.endereco + ', ' + cliente.numero + ' - ' + cliente.bairro
    }

  }
}

</script>
