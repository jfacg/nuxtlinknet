
<template>
  <v-row>
    <v-col>
      <v-card
        outlined
        shaped
        hover
      >
        <v-card-title style="background:#385F73; color:white;">
          Projetos FTTH
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="4"
            >
              <v-card
                outlined
                hover
                shaped
                color="#385F73"
                dark
              >
                <v-card-title>
                  Total
                </v-card-title>
                <v-card-text>
                  Projetos: {{ contadores.projetos }} <br>
                  Caixas: {{ contadores.caixas.total }} <br>
                  Portas: {{ contadores.portas.total }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="2"
              sm="4"
            >
              <v-card
                outlined
                hover
                shaped
                color="#385F73"
                dark
              >
                <v-card-title>
                  Ativas
                </v-card-title>
                <v-card-text>
                  Projetos: {{ contadores.projetos }} <br>
                  Caixas: {{ contadores.caixas.ativas }} <br>
                  Portas: {{ contadores.portas.ativas }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="4"
            >
              <v-card
                outlined
                hover
                shaped
                color="#385F73"
                dark
              >
                <v-card-title>
                  Ocupacao
                </v-card-title>
                <v-card-text>
                  Caixa 50%: {{ ocupacao.caixa_50 }} <br>
                  Caixa 75%: {{ ocupacao.caixa_75 }} <br> <br>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'CobrancaForm',

  data: () => ({
    projetos: [],
    contadores: {
      projetos: 0,
      caixas: {
        total: 0,
        ativas: 0
      },
      portas: {
        total: 0,
        ativas: 0
      }
    },
    ocupacao: {
      caixa_50: 0,
      caixa_75: 0
    }

  }),

  mounted () {
    this.projetos = this.$store.getters['projetos/listar_projetos']
    this.informacoesProjetos(this.projetos)
  },

  methods: {
    informacoesProjetos (projetos) {
      this.contadores.projetos = projetos.length
      projetos.forEach((projeto) => {
        this.contadores.caixas.total = projeto.boxes.length + this.contadores.caixas.total
        this.contaCaixaAtiva(projeto.boxes)
        this.ocupacaoCaixa(projeto.boxes)
        projeto.boxes.forEach((caixa) => {
          this.contadores.portas.total = caixa.ports.length + this.contadores.portas.total
          this.contaPortaAtiva(caixa.ports)
        })
      })
    },

    contaCaixaAtiva (caixas) {
      caixas.forEach((caixa) => {
        if (caixa.status === 'ATIVA') {
          this.contadores.caixas.ativas = this.contadores.caixas.ativas + 1
        }
      })
    },

    contaPortaAtiva (portas) {
      portas.forEach((porta) => {
        if (porta.status === 'ATIVA') {
          this.contadores.portas.ativas = this.contadores.portas.ativas + 1
        }
      })
    },

    ocupacaoCaixa (caixas) {
      caixas.forEach((caixa) => {
        let contadorCaixaAtiva = 0
        caixa.ports.forEach((porta) => {
          if (porta.status === 'ATIVA' || porta.status === 'OCUPADA') {
            contadorCaixaAtiva = contadorCaixaAtiva + 1
          }
        })
        if (contadorCaixaAtiva >= (caixa.numberPorts * 0.75)) {
          this.ocupacao.caixa_75 = this.ocupacao.caixa_75 + 1
        }
        if (contadorCaixaAtiva >= (caixa.numberPorts * 0.5) && contadorCaixaAtiva < (caixa.numberPorts * 0.75)) {
          this.ocupacao.caixa_50 = this.ocupacao.caixa_50 + 1
        }
      })
    }
  }
}

</script>
