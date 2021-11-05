
<template>
  <v-row>
    <v-col>
      <v-card
        outlined
        shaped
        hover
      >
        <v-card-title style="background:#385F73; color:white;">
          Cobrancas
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
                  Linknet: {{ cobrancas.abertas.linknet }} <br>
                  Raniere: {{ cobrancas.abertas.raniere }} <br>
                  On Telecom: {{ cobrancas.abertas.on }}
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
                  Pendentes
                </v-card-title>
                <v-card-text>
                  Linknet: {{ cobrancas.pendente.linknet }} <br>
                  Raniere: {{ cobrancas.pendente.raniere }} <br>
                  On Telecom: {{ cobrancas.pendente.on }}
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
                  Sem Tratativa
                </v-card-title>
                <v-card-text>
                  Linknet: {{ cobrancas.tratativa.linknet }} <br>
                  Raniere: {{ cobrancas.tratativa.raniere }} <br>
                  On Telecom: {{ cobrancas.tratativa.on }}
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
                  Agendados
                </v-card-title>
                <v-card-text>
                  Linknet: {{ cobrancas.agendado.linknet }} <br>
                  Raniere: {{ cobrancas.agendado.raniere }} <br>
                  On Telecom: {{ cobrancas.agendado.on }}
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
                  Vencidos
                </v-card-title>
                <v-card-text>
                  Linknet: {{ cobrancas.vencido.linknet }} <br>
                  Raniere: {{ cobrancas.vencido.raniere }} <br>
                  On Telecom: {{ cobrancas.vencido.on }}
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
                  Tratando
                </v-card-title>
                <v-card-text>
                  Linknet: {{ cobrancas.tratando.linknet }} <br>
                  Raniere: {{ cobrancas.tratando.raniere }} <br>
                  On Telecom: {{ cobrancas.tratando.on }}
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
  name: 'CobrancaPainel',

  // boletos: {
  //   type: Object,
  //   required: false
  // },

  data: () => ({
    cobrancas: {
      abertas: {
        linknet: 0,
        raniere: 0,
        on: 0
      },
      tratando: {
        linknet: 0,
        raniere: 0,
        on: 0
      },
      agendado: {
        linknet: 0,
        raniere: 0,
        on: 0
      },
      vencido: {
        linknet: 0,
        raniere: 0,
        on: 0
      },
      pendente: {
        linknet: 0,
        raniere: 0,
        on: 0
      },
      tratativa: {
        linknet: 0,
        raniere: 0,
        on: 0
      }
    },
    boletos: []
  }),

  created () {
    this.boletos = this.$store.getters['ixc/listar_boletosixc']
    this.listarCobrancas(this.boletos)
  },

  methods: {
    listarCobrancas () {
      this.boletos.forEach((boleto) => {
        if (boleto.filial_id === 1) {
          this.cobrancas.abertas.linknet = this.cobrancas.abertas.linknet + 1

          if (boleto.cobrancas.length === 0) {
            this.cobrancas.tratativa.linknet = this.cobrancas.tratativa.linknet + 1
          }

          if (boleto.cobrancas.length > 0) {
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'AGENDADO') {
              this.cobrancas.agendado.linknet = this.cobrancas.agendado.linknet + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'VENCIDO') {
              this.cobrancas.vencido.linknet = this.cobrancas.vencido.linknet + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'TRATANDO') {
              this.cobrancas.tratando.linknet = this.cobrancas.tratando.linknet + 1
            }
          }

          this.cobrancas.pendente.linknet = this.cobrancas.abertas.linknet - this.cobrancas.agendado.linknet
        }
        if (boleto.filial_id === 4 || boleto.filial_id === 2) {
          this.cobrancas.abertas.on = this.cobrancas.abertas.on + 1

          if (boleto.cobrancas.length === 0) {
            this.cobrancas.tratativa.on = this.cobrancas.tratativa.on + 1
          }

          if (boleto.cobrancas.length > 0) {
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'AGENDADO') {
              this.cobrancas.agendado.on = this.cobrancas.agendado.on + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'VENCIDO') {
              this.cobrancas.vencido.on = this.cobrancas.vencido.on + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'TRATANDO') {
              this.cobrancas.tratando.on = this.cobrancas.tratando.on + 1
            }
          }
          this.cobrancas.pendente.on = this.cobrancas.abertas.on - this.cobrancas.agendado.on
        }
        if (boleto.filial_id === 6) {
          this.cobrancas.abertas.raniere = this.cobrancas.abertas.raniere + 1

          if (boleto.cobrancas.length === 0) {
            this.cobrancas.tratativa.raniere = this.cobrancas.tratativa.raniere + 1
          }

          if (boleto.cobrancas.length > 0) {
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'AGENDADO') {
              this.cobrancas.agendado.raniere = this.cobrancas.agendado.raniere + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'VENCIDO') {
              this.cobrancas.vencido.raniere = this.cobrancas.vencido.raniere + 1
            }
            if (boleto.cobrancas[boleto.cobrancas.length - 1].status === 'TRATANDO') {
              this.cobrancas.tratando.raniere = this.cobrancas.tratando.raniere + 1
            }
          }
          this.cobrancas.pendente.raniere = this.cobrancas.abertas.raniere - this.cobrancas.agendado.raniere
        }
      })
    }
  }
}

</script>
