
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
                  <v-btn
                    color="primary"
                    elevation="10"
                    class="mt-2"
                    exact
                    link
                    to="/watches/criar"
                    @click.stop="$emit('input', false)"
                  >
                    Nova Conta
                    <v-icon right>
                      add
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
                md="6"
              >
                <h2>Contas Ativas: {{ contarContas() }}</h2>
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
                    v-for="conta in contasWatch"
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
                            @click.stop="acao(conta, 'BLOQUEAR')"
                          >
                            <v-icon>mdi-lock</v-icon>
                          </v-btn>
                        </template>
                        <span>Bloquear</span>
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
                            @click.stop="acao(conta, 'DESBLOQUEAR')"
                          >
                            <v-icon>mdi-lock-open</v-icon>
                          </v-btn>
                        </template>
                        <span>Desbloquear</span>
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
                            @click.stop="acao(conta, 'DESATIVAR')"
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
                            @click.stop="acao(conta, 'REATIVAR')"
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

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/watches')
      .then((response) => {
        return {
          consultaWatch: response.data
        }
      })
  },

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
    usuario: {}

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.filtrarEmpresa()
  },

  methods: {
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
          this.$toast.success('Bloqueio solicitado')
          this.$router.push('/watches')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    filtrarEmpresa () {
      if (this.usuario.roles[0].name === 'Administrador') {
        this.contasWatch = this.consultaWatch
      } else {
        this.consultaWatch.forEach((conta) => {
          if (conta.empresa_id === this.usuario.empresa_id) {
            this.contasWatch.push(conta)
          }
        })
      }
    },

    contarContas () {
      let contador = 0
      this.contasWatch.forEach((conta) => {
        if (conta.status === 'ATIVA' || conta.status === 'BLOQUEADA') {
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
