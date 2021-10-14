
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
              <h2>Listar de Permissões</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                @click.prevent="associarPermissoes"
              >
                Associar Permissões
                <v-icon right>
                  add
                </v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs" />
          </v-card-subtitle>
          <v-card-text>
            <v-layout
              row
              wrap
            >
              <v-flex
                v-for="permissao in listarPermissoes"
                :key="permissao.id"
                cols="12"
                md="2"
                lg="1"
              >
                <v-checkbox
                  v-model="funcaoPermissoes"
                  :label="permissao.name"
                  :value="permissao.id"
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

/* eslint-disable no-console */
export default {
  name: 'FuncaoEditar',

  data: () => ({
    itemsBreadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Funções',
        disabled: false,
        to: '/funcoes',
        exact: true,
        link: true
      },
      {
        text: 'Associar Permissões',
        disabled: true
      }
    ],
    funcaoPermissoes: []
  }),

  computed: {
    listarPermissoes () {
      return this.$store.getters['permissoes/listar_permissoes']
    },

    permissoesAssociadas () {
      return this.$store.getters['funcoes/listar_permissoes_associadas']
    }
  },

  mounted () {
    this.$store.dispatch('funcoes/listaPermissoesAssociadas', this.$route.params)
      .then(() => {
        this.verificarPermissoes()
      })
  },

  methods: {

    associarPermissoes () {
      const params = { ...this.$route.params, permissions: this.funcaoPermissoes }
      this.$store.dispatch('funcoes/associarPermissoes', params)
        .then(() => {
          this.$toast.success('Função atualizado')
          this.$router.push('/funcoes')
        })
        .catch((errors) => {
          const messages = Object.values(errors)
          messages.forEach((error) => {
            this.$toast.error(error.toString())
          })
        })
    },

    verificarPermissoes () {
      return this.permissoesAssociadas.forEach((permissao) => {
        this.funcaoPermissoes.push(permissao.id)
      })
    }

  }
}
</script>
