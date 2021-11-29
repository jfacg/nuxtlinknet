
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading="carregamento"
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <h2>Projeto FTTH - Ocupação</h2>
                </v-col>
                <v-col />
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <CartaoOcupacao :cartao="cartoes.muitoAlto" />
                <CartaoOcupacao :cartao="cartoes.alto" />
                <CartaoOcupacao :cartao="cartoes.moderado" />
                <CartaoOcupacao :cartao="cartoes.baixo" />
                <CartaoOcupacao :cartao="cartoes.nenhum" />
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import { URI_BASE_API, API_VERSION } from '@/config/config'
import CartaoOcupacao from '@/components/projetos/CartaoOcupacao.vue'

export default {
  name: 'ProjetosIndex',
  components: {
    CartaoOcupacao
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Projetos FTTH - Ocupação',
        disabled: true
      }
    ],
    cartoes: {
      muitoAlto: {
        cor: 'red',
        titulo: '100%',
        severidade: 'Muito Alto',
        quantidade: 0,
        caixas: []
      },
      alto: {
        cor: 'purple',
        titulo: '75%',
        severidade: 'Alto',
        quantidade: 0,
        caixas: []
      },
      moderado: {
        cor: 'orange',
        titulo: '50%',
        severidade: 'Moderado',
        quantidade: 0,
        caixas: []
      },
      baixo: {
        cor: 'blue',
        titulo: '25%',
        severidade: 'Baixo',
        quantidade: 0,
        caixas: []
      },
      nenhum: {
        cor: 'green',
        titulo: '0%',
        severidade: 'Nenhum',
        quantidade: 0,
        caixas: []
      }
    },

    carregamento: false,
    search: '',
    caixas: [],
    dialog: false

  }),

  created () {
    this.listarOcupacao()
  },

  methods: {
    listarOcupacao () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/caixas/ocupacao')
        .then((response) => {
          this.caixas = response.data
          this.listarCaixas(this.caixas)
        })
    },

    listarCaixas (caixas) {
      caixas.forEach((caixa) => {
        if (caixa.ocupacao === 0) {
          this.cartoes.nenhum.caixas.push(caixa)
          ++this.cartoes.nenhum.quantidade
        }
        if (caixa.ocupacao > 0 && caixa.ocupacao <= 25) {
          this.cartoes.baixo.caixas.push(caixa)
          ++this.cartoes.baixo.quantidade
        }
        if (caixa.ocupacao > 25 && caixa.ocupacao <= 50) {
          this.cartoes.moderado.caixas.push(caixa)
          ++this.cartoes.moderado.quantidade
        }
        if (caixa.ocupacao > 50 && caixa.ocupacao <= 75) {
          this.cartoes.alto.caixas.push(caixa)
          ++this.cartoes.alto.quantidade
        }
        if (caixa.ocupacao > 75 && caixa.ocupacao <= 100) {
          this.cartoes.muitoAlto.caixas.push(caixa)
          ++this.cartoes.muitoAlto.quantidade
        }
      })
    }

  }

}
</script>
