
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <v-row>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
                md="6"
              >
                <div>
                  <h2>Lista de Contas Watch</h2>
                </div>
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
                md="6"
              >
                <!-- <h2>Contas Gerenciar: {{ contarContas() }}</h2> -->
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              height="300px"
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">
                      #
                    </th>
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Telefone
                    </th>
                    <th class="text-left">
                      CPF
                    </th>
                    <th class="text-left">
                      Empresa
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="conta in contasFiltradas"
                    :key="conta.id"
                  >
                    <td>{{ conta.id }}</td>
                    <td>{{ conta.email }}</td>
                    <td>{{ conta.telefone }}</td>
                    <td>{{ conta.cpf }}</td>
                    <td>{{ conta.empresa ? conta.empresa.nome : '' }}</td>
                    <td>{{ conta.status }}</td>
                    <td width="200px">
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="orange"
                            v-bind="attrs"
                            x-small
                            icon
                            link
                            exact
                            v-on="on"
                            @click.stop="acao(conta, 'BLOQUEADA')"
                          >
                            <v-icon>mdi-lock</v-icon>
                          </v-btn>
                        </template>
                        <span>Bloqueio</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="green"
                            v-bind="attrs"
                            x-small
                            icon
                            link
                            exact
                            v-on="on"
                            @click.stop="acao(conta, 'ATIVA')"
                          >
                            <v-icon>mdi-lock-open</v-icon>
                          </v-btn>
                        </template>
                        <span>Desbloqueio</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="red"
                            v-bind="attrs"
                            x-small
                            icon
                            link
                            exact
                            v-on="on"
                            @click.stop="acao(conta, 'DESATIVADA')"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Desativar</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="purple"
                            v-bind="attrs"
                            x-small
                            icon
                            link
                            exact
                            v-on="on"
                            @click.stop="acao(conta, 'ATIVA')"
                          >
                            <v-icon>mdi-play-circle</v-icon>
                          </v-btn>
                        </template>
                        <span>Reativar</span>
                      </v-tooltip>
                      <v-tooltip
                        v-if="verificarPermissao('admin')"
                        bottom
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            icon
                            link
                            exact
                            :to="{name: 'watches-editar-id', params: {id: conta.id}}"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </template>
                        <span>Editar</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
  name: 'WatchIndex',

  // asyncData (context) {
  //   return context.$axios.$get(URI_BASE_API + API_VERSION + '/watches')
  //     .then((response) => {
  //       return {
  //         consultaWatch: response.data
  //       }
  //     })
  // },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Contas Watch',
        disabled: true
      }

    ],
    contasWatch: [],
    contasFiltradas: [],
    usuario: {},
    status: ''

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.listarContas()
  },

  methods: {
    listarContas () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/watches')
        .then((response) => {
          this.contasWatch = response.data.data
          this.filtrarStatus()
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    verificarPermissao (item) {
      const permissoes = []

      this.$store.getters['auth/usuarioAutenticado'].roles.forEach((funcao) => {
        funcao.permissions.forEach((permissao) => {
          permissoes.push(permissao)
        })
      })
      let result = false
      permissoes.forEach((permission) => {
        if (permission.name === item || item === '') {
          result = true
          return result
        }
      })
      return result
    },

    acao (conta, status) {
      conta.status = status
      this.$axios.put(URI_BASE_API + API_VERSION + '/watches/' + conta.id, conta)
        .then((response) => {
          this.$toast.success('Ação realizada')
          this.$router.push('/watches/gerencia')
          this.listarContas()
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    filtrarStatus () {
      this.contasFiltradas = []
      this.contasWatch.forEach((conta) => {
        if (conta.status !== 'ATIVA' && conta.status !== 'BLOQUEADA' && conta.status !== 'DESATIVADA') {
          this.contasFiltradas.push(conta)
        }
      })
    },

    contarContas () {
      let contador = 0
      this.contasWatch.forEach((conta) => {
        if (conta.status !== 'ATIVA' && conta.status !== 'BLOQUEADA') {
          contador = contador + 1
        }
      })
      return contador
    }

  }

}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
/* #create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
} */
</style>
