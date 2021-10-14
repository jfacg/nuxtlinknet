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
  methods: {
    submit () {
      this.$store.dispatch('auth/autenticar', this.usuario)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
