
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
              <h2>Editar Serviço</h2>
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
                      <v-text-field
                        v-model="servico.tipo"
                        name="tipo"
                        label="Tipo"
                        type="text"
                        dense
                        disabled
                      />
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
                      </div>
                      <v-btn
                        color="primary"
                        large
                        @click.prevent="salvar"
                      >
                        Salvar
                      </v-btn>
                    </v-col>
                  </v-row>
                </form>
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
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ServicosCriar',
  components: {

  },

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

    servico: {
      tipo: '',
      status: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      antigoCep: '',
      antigoLogradouro: '',
      antigoNumero: '',
      antigoBairro: '',
      antigaCidade: '',
      antigaUf: '',
      dataAgendamento: '',
      clienteNome: '',
      clienteCpf: '',
      clienteIdIxc: '',
      clienteEmail: '',
      clienteContato: ''
    }

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
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    salvar () {
      this.servico.usuario_id = this.$store.getters['auth/usuarioAutenticado'].id
      this.$axios.$put(URI_BASE_API + API_VERSION + '/servicos/' + this.servico.id, this.servico)
        .then(() => {
          this.$toast.success('Servico Editado')
          this.$router.push('/servicos')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
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
