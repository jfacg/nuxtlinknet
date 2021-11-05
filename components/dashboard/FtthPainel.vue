
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
                  Total
                </v-card-title>
                <v-card-text>
                  Projetos: {{ contadores.projetos }} <br>
                  Caixas: {{ contadores.caixas }} <br>
                  Portas: {{ contadores.portas }}
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
    contadores: {
      projetos: 0,
      caixas: 0,
      portas: 0
    },
    projetos: []

  }),

  mounted () {
    this.projetos = this.$store.getters['projetos/listar_projetos']
    this.informacoesProjetos(this.projetos)
  },

  methods: {
    informacoesProjetos (projetos) {
      this.contadores.projetos = projetos.length
      projetos.forEach((projeto) => {
        this.contadores.caixas = projeto.boxes.length + this.contadores.caixas
        projeto.boxes.forEach((caixa) => {
          this.contadores.portas = caixa.ports.length + this.contadores.portas
        })
      })
    }
  }
}

</script>
