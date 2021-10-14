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
              <h2>Novo Cliente</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <ClienteForm @submit="salvar" />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ClienteForm from '@/components/clientes/ClienteForm.vue'

export default {
  name: 'ClientesCriar',
  components: {
    ClienteForm
  },

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Clientes',
        disabled: false,
        to: '/clientes',
        exact: true,
        link: true

      },
      {
        text: 'Criar Novo Cliente',
        disabled: true
      }

    ]
  }),

  methods: {

    salvar (cliente) {
      this.$store.dispatch('clientes/criarCliente', cliente)
        .then((response) => {
          this.$toast.success('Cliente criada')
          this.$router.push('/clientes')
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
