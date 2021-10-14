
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <div>
              <h2>Novo Usuário</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <UsuarioForm
              :usuario="usuario"
              :update="true"
              @submit="salvar"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import UsuarioForm from '@/components/usuarios/UsuarioForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'
/* eslint-disable no-console */
export default {
  name: 'CriarUsuario',
  components: {
    UsuarioForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/usuarios/' + context.params.id)
      .then((response) => {
        return {
          usuario: response.data
        }
      })
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Usuários',
        disabled: false,
        to: '/usuarios',
        exact: true,
        link: true

      },
      {
        text: 'Novo Usuário',
        disabled: true
      }
    ]
  }),

  methods: {

    salvar (usuario) {
      this.$store.dispatch('usuarios/editarUsuario', usuario)
        .then(() => {
          this.$toast.success('Usuário atualizado')
          this.$router.push('/usuarios')
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
