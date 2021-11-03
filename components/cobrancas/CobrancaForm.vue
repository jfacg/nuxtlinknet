
<template>
  <form>
    <v-text-field
      v-model="boletoEditado.client_ixc.razao"
      name="cliene"
      label="Cliente"
      type="text"
      disabled
    />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
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
        md="4"
      >
        <v-text-field
          :value="boletoEditado.valor"
          name="valor"
          label="Valor"
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
            <td>{{ cobranca.mensagem }}</td>
            <td>{{ cobranca.dataAgendamento ? formatarData(cobranca.dataAgendamento) : '' }}</td>
            <td>{{ cobranca.usuario.nick_name }}</td>
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
    <v-text-field
      v-model="cobrancaEditada.dataAgendamento"
      name="dataAgendamento"
      label="Data do Agendamento"
      type="date"
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
      usuario_id: '',
      boletoixc_id: '',
      status: '',
      mensagem: ''
    },

    boletoEditado: {
      id: '',
      cobrancas: []
    }
  }),

  computed: {

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
      this.cobrancaEditada.mensagem = ''
    },

    formatarData (data) {
      return moment(data).format('DD-MM-YYYY')
    }
  }
}

</script>
