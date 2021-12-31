<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card class="elevation-12">
          <v-app-bar
            color="primary"
            dark
          >
            Entre com seu LOGIN
          </v-app-bar>
          <v-card-subtitle>Linknet Telecom</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="usuario.email"
                append-icon="email"
                type="email"
                name="email"
                label="Email"
              />
              <v-text-field
                v-model.trim="usuario.password"
                append-icon="lock"
                type="password"
                name="password"
                label="Senha"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              large
              @click.stop="submit"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { URI_BASE_API, TOKEN_NAME, API_VERSION } from '@/config/config'
import { } from 'vuex'
export default {
  name: 'Auth',
  layout: 'auth',
  middleware: ['chek-auth'],
  data () {
    return {
      usuario: {
        email: '',
        password: ''
      }
    }
  },

  created () {

  },

  methods: {
    submit () {
      // this.$store.dispatch('auth/autenticar', this.usuario)
      //   .then((response) => {
      //     const usuario = this.$store.getters['auth/usuarioAutenticado']
      //     // eslint-disable-next-line no-console
      //     console.log(response)
      //     if (usuario.roles[0].name === 'Tecnico') {
      //       this.$router.push('/atividades')
      //     } else {
      //       this.$router.push('/dashboard')
      //     }
      //   })

      this.$axios.post(URI_BASE_API + 'sanctum/token', this.usuario)
        .then((response) => {
          const token = response.data.token
          localStorage.setItem(TOKEN_NAME, token)
          this.$storage.setUniversal(TOKEN_NAME, token)
          this.$store.commit('auth/set_token', token)
          this.$store.commit('auth/set_autenticado', true)
          this.$store.dispatch('auth/autenticado', token)

          this.$axios.get(URI_BASE_API + 'auth/me', {
            headers: {
              common: {
                Authorization: 'Bearer ' + token
              }
            }
          })
            .then((response) => {
              const usuarioAutenticado = response.data
              const funcao = usuarioAutenticado.roles[0]
              this.$store.commit('auth/set_usuario', usuarioAutenticado)
              this.$store.commit('auth/set_token', token)
              this.$store.commit('auth/set_autenticado', true)

              if (usuarioAutenticado.roles[0].name === 'Tecnico') {
                this.$router.push('/atividades')
              } else {
                this.$router.push('/')
              }

              this.$axios.$get(URI_BASE_API + API_VERSION + '/funcoes/' + funcao.id + '/permissoes')
                .then((response) => {
                  const permissoes = response.data
                  this.$store.commit('permissoes/set_permissoes', permissoes)
                })
            })
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    }
  }
}
</script>
