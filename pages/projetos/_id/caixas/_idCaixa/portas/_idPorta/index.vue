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
              <h2>Atualizar Porta: {{ porta.name }}</h2>
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
                    v-model.trim="projeto.name"
                    name="name"
                    label="Nome do Projeto"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model.trim="porta.name"
                    name="name"
                    label="Nome da Porta"
                    type="text"
                    disabled
                  />
                  <v-text-field
                    v-model.trim="porta.cableCode"
                    name="cableCode"
                    label="Código do Cabo"
                    type="number"
                  />
                  <v-text-field
                    v-model.trim="porta.clientIxc_id"
                    name="clientIxc_id"
                    label="Código do Cliente no IXC"
                    type="number"
                  />
                  <v-text-field
                    v-model.trim="porta.partner"
                    name="partner"
                    label="Login do Cliente do Parceiro"
                    type="text"
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
  name: 'PortCreateUpdate',

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
        to: '/projects',
        exact: true,
        link: true
      },
      {
        text: 'Projeto',
        disabled: false,
        to: '',
        exact: true,
        link: true
      },
      {
        text: 'Caixa',
        disabled: false,
        to: '',
        exact: true,
        link: true
      },
      {
        text: 'Editar Porta',
        disabled: true
      }

    ],
    caixa: {},
    porta: {}

  }),

  created () {
    this.itemsBreadcrumbs[2].to = '/projetos/' + this.$route.params.id + '/caixas'
    this.itemsBreadcrumbs[3].to = '/projetos/' + this.$route.params.id + '/caixas/' + this.$route.params.idCaixa + '/portas'
    this.buscarPorta()
  },

  methods: {
    buscarPorta () {
      this.caixa = this.projeto.boxes.find(caixa => caixa.id === parseInt(this.$route.params.idCaixa))
      this.porta = this.caixa.ports.find(porta => porta.id === parseInt(this.$route.params.idPorta))
    },

    salvar () {
      this.porta.status = 'ATIVA'
      const projetoCaixaPorta = { projetoId: this.projeto.id, caixaId: this.caixa.id, porta: this.porta }
      this.$store.dispatch('projetos/editarProjetoCaixaPorta', projetoCaixaPorta)
        .then((response) => {
          this.$toast.success('Caixa atualizado')
          this.$router.push('/projetos/' + this.$route.params.id + '/caixas/' + this.$route.params.idCaixa + '/portas')
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

  // mounted () {
  //   this.type = this.$route.params.type
  //   const params = this.$route.params
  //   if (params.type === 'update' && params.id !== 0) {
  //     this.getPort(params).then((response) => {
  //       this.port = response
  //     })
  //   }
  // },

  // computed: {

  // },

  // methods: {
  //   ...mapActions([
  //     'updatePort',
  //     'getPort'
  //   ]),
  //   submit () {
  //     if (this.type === 'update') {
  //       if (this.port.cableCode !== '') {
  //         this.port.status = 'ATIVA'
  //       } else {
  //         this.port.status = 'VAGA'
  //       }
  //       this.updatePort(this.port)
  //         .then(response => {
  //           this.$router.push({ name: 'projectBoxesPorts', params: { id: this.port.box_id } })
  //           this.$vToastify.success('Porta atualizada!', 'Projetos')
  //         })
  //         .catch((errors) => {
  //           this.$vToastify.error(errors.data.message, 'Falha')
  //           const buzy = errors.data.data[0]
  //           if (buzy) {
  //             this.$vToastify.error(`Caixa: ${buzy.name}`, 'Falha')
  //           }
  //         })
  //     }
  //   }

  // }
}
</script>
