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
            <div>
              <h2>Novo Projeto</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <ProjetoForm @submit="salvar" />
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

export default {
  name: 'ProjetosCriar',
  components: {
    ProjetoForm
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
        text: 'Criar Novo Projeto',
        disabled: true
      }

    ]

  }),

  methods: {

    salvar (projeto) {
      this.$store.dispatch('projetos/criarProjeto', projeto)
        .then((response) => {
          this.$toast.success('Projeto criado')
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
