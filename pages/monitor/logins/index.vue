/* eslint-disable vue/no-template-shadow */

<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card elevation="24">
          <v-card-title>
            <div>
              <h2>Monitoramento Logins</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-card>
                <v-card-title>
                  Logins Offline
                </v-card-title>
                <v-card-subtitle>
                  Offline: {{ offline }}
                </v-card-subtitle>
                <v-card-text>
                  <v-btn
                    v-if="ativo"
                    color="primary"
                    @click="ativar"
                  >
                    Ativar
                  </v-btn>
                  <v-btn
                    v-if="!ativo"
                    color="primary"
                    @click="desativar"
                  >
                    Desativar
                  </v-btn>
                </v-card-text>
              </v-card>
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
  name: 'MaquinasIndex',

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
    tempo: null,
    offline: 0,
    offline2: 0,
    ativo: true

  }),

  created () {
    this.consulta()
    console.log(this.tempo)
  },

  methods: {
    ativar () {
      this.tempo = setInterval(this.atualisar, 10000)
      this.ativo = false
    },

    desativar () {
      clearInterval(this.tempo)
      this.tempo = null
      this.ativo = true
    },

    atualisar () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/loginoffline')
        .then((response) => {
          this.offline2 = response.offline
          if ((this.offline2 - this.offline) > 5) {
            console.log('5 ou + logins desconectaram')
          }

          if ((this.offline - this.offline2) > 5) {
            console.log('5 ou + logins conectaram')
          }

          this.offline = this.offline2
        })

      console.log(this.tempo)
    },

    consulta () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/loginoffline')
        .then((response) => {
          this.offline = response.offline
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
          this.$router.push('/maquinas')
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
