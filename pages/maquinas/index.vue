/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Maquinas de Fusão</h2>
            </div>
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
                      Maquina
                    </th>
                    <th class="text-left">
                      Descrição
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
                    v-for="maquina in maquinas"
                    :key="maquina.id"
                  >
                    <td>{{ maquina.id }}</td>
                    <td>{{ maquina.maquinaNome }}</td>
                    <td>{{ maquina.maquinaDescricao }}</td>
                    <td>{{ maquina.maquinaStatus }}</td>
                    <td>
                      <v-tooltip
                        v-if="mostrarSolicitar(maquina)"
                        bottom
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            color="orange"
                            x-small
                            icon
                            link
                            exact
                            v-on="on"
                            @click.stop="solicitar(maquina)"
                          >
                            <v-icon>check</v-icon>
                          </v-btn>
                        </template>
                        <span>Solicitar</span>
                      </v-tooltip>
                      <v-tooltip
                        v-if="mostrarDevolver(maquina)"
                        bottom
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            icon
                            link
                            exact
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="devolver(maquina)"
                          >
                            <v-icon>close</v-icon>
                          </v-btn>
                        </template>
                        <span>Devolver</span>
                      </v-tooltip>
                      <v-tooltip
                        v-if="mostrarSupervisor(maquina)"
                        bottom
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            icon
                            link
                            exact
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="receber(maquina)"
                          >
                            <v-icon>refresh</v-icon>
                          </v-btn>
                        </template>
                        <span>Receber</span>
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
  name: 'MaquinasIndex',

  components: {
  },

  // asyncData (context) {
  //   return context.$axios.$get(URI_BASE_API + API_VERSION + '/maquinas')
  //     .then((response) => {
  //       return {
  //         consultaMaquinas: response.data
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
        text: 'Maquinas',
        disabled: true
      }
    ],
    carregamento: false,
    maquinas: [],
    data: [],
    file_name: '',
    checked: false,
    usuario: null,

    token: '5378564551:AAEeYFReaur4MmKY-GAyewznFhVB1NKq0zo',
    chatId: -737937328

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
    this.consultarMaquinas()
  },

  methods: {

    consultarMaquinas () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/maquinas')
        .then((response) => {
          this.maquinas = response.data
          // let teste = this.maquinas[0].maquinaStatus
          // teste = teste.split(' ')[0]
          // console.log(teste)
        })
    },

    mostrarSolicitar (maquina) {
      if (maquina.maquinaStatus === 'ESTOQUE') {
        return true
      }

      return false
    },

    mostrarDevolver (maquina) {
      const status = maquina.maquinaStatus.split(' ')[0]
      if (maquina.maquinaStatus !== 'ESTOQUE' && status !== 'Devolvido') {
        return true
      }

      return false
    },

    mostrarSupervisor (maquina) {
      const status = maquina.maquinaStatus.split(' ')[0]
      if (status === 'Devolvido') {
        if (this.usuario.roles[0].name === 'Administrador' || this.usuario.roles[0].name === 'Supervisor') {
          return true
        }
      }

      return false
    },

    solicitar (maquina) {
      maquina.maquinaStatus = this.$store.getters['auth/usuarioAutenticado'].nick_name
      maquina.usuario = this.$store.getters['auth/usuarioAutenticado'].nick_name
      maquina.titulo = 'SOLICITAÇÃO DE MAQUINA'
      // const texto = `Solicitante: ${this.usuario.nick_name}` + '\n' + `Maquina: ${maquina.maquinaNome}`

      // console.log(texto)

      this.$axios.$put(URI_BASE_API + API_VERSION + '/maquinas/' + maquina.id, maquina)
        .then((response) => {
          // this.enviarTelegram(texto)
          this.$toast.success('Maquina Solicitada')
        })
    },

    devolver (maquina) {
      maquina.maquinaStatus = 'Devolvido ' + this.$store.getters['auth/usuarioAutenticado'].nick_name
      maquina.usuario = this.$store.getters['auth/usuarioAutenticado'].nick_name
      maquina.titulo = 'DEVOLUÇÃO DE MAQUINA'

      this.$axios.$put(URI_BASE_API + API_VERSION + '/maquinas/' + maquina.id, maquina)
        .then((response) => {
          this.$toast.success('Maquina Devolvida')
        })
    },

    receber (maquina) {
      maquina.maquinaStatus = 'ESTOQUE'
      maquina.usuario = this.$store.getters['auth/usuarioAutenticado'].nick_name
      maquina.titulo = 'RECEBIMENTO DE MAQUINA'

      this.$axios.$put(URI_BASE_API + API_VERSION + '/maquinas/' + maquina.id, maquina)
        .then((response) => {
          this.$toast.success('Maquina Recebida')
        })
    },

    enviarTelegram (texto) {
      this.$axios.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${texto}`)
        .then(() => {
          console.log('deu certo')
        })
    }

  }

}
</script>
