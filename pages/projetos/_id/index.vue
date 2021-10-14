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
              <h2>Editar Projeto</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <ProjetoForm
                  :projeto="projeto"
                  @submit="salvar"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProjetoForm from '@/components/projetos/ProjetoForm.vue'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ProjetoEditar',

  components: {
    ProjetoForm
  },

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/projetos/' + context.params.id)
      .then((response) => {
        return {
          projeto: response
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
        text: 'Projetos',
        disabled: false,
        to: '/projetos',
        exact: true,
        link: true

      },
      {
        text: 'Editar Projeto',
        disabled: true
      }

    ]

  }),

  methods: {
    salvar (projeto) {
      this.$store.dispatch('projetos/editarProjeto', projeto)
        .then(() => {
          this.$toast.success('Projeto atualizado')
          this.$router.push('/projetos')
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
