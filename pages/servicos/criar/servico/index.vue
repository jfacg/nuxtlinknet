
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          :loading="loading"
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <div>
              <h2>Novo Serviço</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="6"
                sm="12"
              >
                <form>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="cliente"
                        auto-select-first
                        clearable
                        dense
                        :search-input.sync="pesquisar"
                        :items="clientes"
                        item-text="razao"
                        return-object
                        @select="onSelect"
                      />
                      <div v-if="clienteExiste()">
                        <v-select
                          v-model="servico.tipo"
                          :items="servicoTipos"
                          label="Tipo de Serviço"
                          name="tipo"
                          dense
                        />
                      </div>
                      <div v-if="servico.tipo === 'MUDANÇA' ">
                        <v-text-field-cep
                          v-model="servico.cep"
                          name="cep"
                          label="CEP"
                          type="text"
                          dense
                          :options="{
                            outputMask: '########',
                            empty: null,
                            applyAfter: true,
                          }"
                          @change="buscarCep"
                        />
                        <v-text-field
                          v-model="servico.logradouro"
                          name="logradouro"
                          label="Endereço"
                          type="text"
                          dense
                        />
                        <v-text-field
                          v-model="servico.numero"
                          name="numero"
                          label="Numero"
                          type="text"
                          dense
                        />
                        <v-text-field
                          v-model="servico.complemento"
                          name="complemento"
                          label="Complemento"
                          type="text"
                          dense
                        />
                        <v-text-field
                          v-model.trim="servico.bairro"
                          name="bairro"
                          label="Bairro"
                          type="text"
                          dense
                        />
                        <v-text-field
                          v-model.trim="servico.cidade"
                          name="cidade"
                          label="Cidade"
                          type="text"
                          dense
                        />
                        <v-text-field
                          v-model.trim="servico.uf"
                          name="uf"
                          label="Estado"
                          type="text"
                          dense
                        />
                        <v-textarea
                          v-model="servico.observacao"
                          name="observacao"
                          label="Observação"
                          :value="servico.observacao"
                          hint="Observação"
                        />
                        <v-text-field
                          v-model="servico.dataAgendamento"
                          name="dataAgendamento"
                          label="Data do Agendamento"
                          type="datetime-local"
                        />
                        <v-btn
                          color="primary"
                          large
                          @click.prevent="agendar"
                        >
                          Salvar
                        </v-btn>
                      </div>
                      <div v-if="servico.tipo === 'MIGRAÇÃO' || servico.tipo === 'RETIRADA' || servico.tipo === 'RECEBIMENTO' ">
                        <v-textarea
                          v-model="servico.observacao"
                          name="observacao"
                          label="Observação"
                          :value="servico.observacao"
                          hint="Observação"
                        />
                        <v-text-field
                          v-model="servico.dataAgendamento"
                          name="dataAgendamento"
                          label="Data do Agendamento"
                          type="datetime-local"
                        />
                        <v-btn
                          color="primary"
                          large
                          @click.prevent="agendar"
                        >
                          Salvar
                        </v-btn>
                      </div>
                      <div v-if="servico.tipo === 'REPARO' ">
                        <v-text-field
                          v-model="servico.reclamante"
                          name="reclamante"
                          label="Reclamante"
                          type="text"
                          dense
                        />
                        <v-textarea
                          v-model="servico.relatoCliente"
                          name="observacao"
                          label="Relato do Cliente"
                          :value="servico.observacao"
                          hint="Relato do Cliente"
                          dense
                        />

                        <v-select
                          v-model="servico.tipoReclamacao_id"
                          label="Tipo de Reclamação"
                          :items="tiposReclamacao"
                          item-text="tipoNome"
                          item-value="id"
                          name="plano"
                          dense
                        />

                        <v-text-field
                          v-model="servico.dataAgendamento"
                          name="dataAgendamento"
                          label="Data do Agendamento"
                          type="datetime-local"
                          dense
                        />
                        <v-btn
                          v-if="liberaBotao()"
                          color="primary"
                          large
                          @click.prevent="agendar"
                        >
                          Salvar
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </form>
              </v-col>
              <v-col
                cols="12"
                md="6"
                sm="12"
              >
                <v-card
                  v-if="clienteExiste()"
                  elevation="4"
                  pa-4
                  color="blue lighten-4"
                >
                  <v-card-title>
                    <h2>Dados do Cliente</h2>
                  </v-card-title>
                  <v-card-text>
                    Cód IXC: {{ cliente.id }} <br>
                    Cliente: {{ cliente.razao }} <br>
                    Endereço: {{ cliente.endereco }}, {{ cliente.numero }} <br>
                    Complemento: {{ cliente.complemento }} <br>
                    Bairro: {{ cliente.bairro }} - Cep: {{ cliente.cep }} <br>
                    <br>
                    Email: {{ cliente.email }} <br>
                    Contato: {{ cliente.telefone_celular }} <br>
                  </v-card-text>
                </v-card>
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
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicosCriar',
  components: {

  },
  mixins: [validationMixin],

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Servicos',
        disabled: false,
        to: '/servicos',
        exact: true,
        link: true

      },
      {
        text: 'Novo Servico',
        disabled: true
      }
    ],
    loading: false,
    pesquisar: null,
    servicoTipos: [
      'MUDANÇA',
      'MIGRAÇÃO',
      'REPARO',
      'RECEBIMENTO',
      'RETIRADA'
    ],
    servico: {
      tipo: '',
      status: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      complemento: '',
      antigoCep: '',
      antigoLogradouro: '',
      antigoNumero: '',
      antigoBairro: '',
      antigaCidade: '',
      antigaUf: '',
      antigoComplemento: '',
      observacao: '',
      dataAgendamento: '',
      clienteNome: '',
      clienteCpf: '',
      clienteIdIxc: '',
      clienteEmail: '',
      clienteContato: '',
      reclamante: '',
      tipoReclamacao_id: '',
      relatoCliente: ''
    },
    clientes: [],
    cliente: null,
    tiposReclamacao: []

  }),

  validations: {
    servico: {
      reclamante: {
        required
      },
      tipoReclamacao_id: {
        required
      },
      relatoCliente: {
        required
      },
      dataAgendamento: {
        required
      }
    }
  },

  watch: {
    pesquisar (val) {
      this.loading = true

      if (val != null && val.length > 2) {
        this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cliente/buscarPorNome/' + val)
          .then((response) => {
            this.clientes = response.data
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => (this.loading = false))
      }

      if (val === null) {
        this.servico.tipo = ''
        this.loading = false
      }
    },

    cliente (val) {
      this.servico.antigoCep = val.cep
      this.servico.antigoLogradouro = val.endereco
      this.servico.antigoNumero = val.numero
      this.servico.antigoBairro = val.bairro
      this.servico.antigaCidade = val.cidade
      this.servico.antigaUf = val.uf
      this.servico.antigoComplemento = val.complemento
      this.servico.clienteNome = val.razao
      this.servico.clienteCpf = val.cnpj_cpf
      this.servico.clienteIdIxc = val.id
      this.servico.clienteEmail = val.email
      this.servico.clienteContato = val.telefone_celular
    }

  },

  created () {
    this.listarTipos()
  },

  methods: {
    agendar () {
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.servico.dataVencimento = moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss')
      this.servico.status = 'AGENDADO'
      if (this.servico.tipo !== 'INSTALAÇÃO' && this.servico.tipo !== 'MUDANÇA') {
        this.dadosClienteIxc()
      }

      this.$axios.$post(URI_BASE_API + API_VERSION + '/servicos', this.servico)
        .then(() => {
          this.$toast.success('Servico criado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors.response.data)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    liberaBotao () {
      const reclamante = this.$v.servico.reclamante.required
      // eslint-disable-next-line camelcase
      const tipoReclamacao_id = this.$v.servico.tipoReclamacao_id.required
      const relatoCliente = this.$v.servico.relatoCliente.required
      const dataAgendamento = this.$v.servico.dataAgendamento.required

      // eslint-disable-next-line camelcase
      if (reclamante && relatoCliente && tipoReclamacao_id && dataAgendamento) {
        return true
      } else {
        return false
      }
    },

    dadosClienteIxc () {
      this.servico.cep = this.cliente.cep
      this.servico.logradouro = this.cliente.endereco
      this.servico.numero = this.cliente.numero
      this.servico.bairro = this.cliente.bairro
      this.servico.cidade = this.cliente.cidade
      this.servico.uf = this.cliente.uf
      this.servico.complemento = this.cliente.complemento
      this.servico.clienteNome = this.cliente.razao
      this.servico.clienteCpf = this.cliente.cnpj_cpf
      this.servico.clienteIdIxc = this.cliente.id
      this.servico.clienteEmail = this.cliente.email
      this.servico.clienteContato = this.cliente.telefone_celular
    },

    clienteExiste () {
      if (this.cliente !== null) {
        return true
      } else {
        return false
      }
    },

    listarTipos () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/tipos')
        .then((response) => {
          this.tiposReclamacao = response.data
        })
    },

    onSelect (cliente) {

    },

    buscarCep () {
      this.$viaCep.buscarCep(this.servico.cep).then((cep) => {
        this.servico.logradouro = cep.logradouro
        this.servico.bairro = cep.bairro
        this.servico.cidade = cep.localidade
        this.servico.uf = cep.uf
      })
    }

  }

}
</script>
