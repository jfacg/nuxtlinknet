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
              <h2>Atualizar Caixa</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <form>
                  <v-text-field
                    v-model="caixaEditada.name"
                    name="name"
                    label="Nome do Projeto"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model="caixaEditada.address"
                    name="address"
                    label="Endereço"
                    type="text"
                    @input="toUpperCase(caixaEditada.address)"
                  />
                  <v-text-field
                    v-model="caixaEditada.signal"
                    name="signal"
                    label="Sinal"
                    type="number"
                  />
                  <v-btn
                    color="primary"
                    large
                    @click.prevent="salvar"
                  >
                    Salvar
                  </v-btn>
                </form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ProjetoCaixaEdit',
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
        text: 'Caixas',
        disabled: false,
        to: '',
        exact: true,
        link: true
      },
      {
        text: 'Editar Caixa',
        disabled: true
      }
    ],
    caixaEditada: {
      status: ''
    }

  }),

  created () {
    this.itemsBreadcrumbs[2].to = '/projetos/' + this.$route.params.id + '/caixas'
    this.caixaEditada = this.projeto.boxes.find(caixa => caixa.id === parseInt(this.$route.params.idCaixa))
  },

  methods: {
    salvar (projeto) {
      this.caixaEditada.status = 'ATIVA'
      const projetoCaixa = { projetoId: this.projeto.id, caixa: this.caixaEditada }
      this.$store.dispatch('projetos/editarProjetoCaixa', projetoCaixa)
        .then(() => {
          this.$toast.success('Caixa atualizado')
          this.$router.push('/projetos/' + this.$route.params.id + '/caixas')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },
    toUpperCase (text) {
      this.caixaEditada.address = text.toUpperCase()
    }
  }

}
</script>
