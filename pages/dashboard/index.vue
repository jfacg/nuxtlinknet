
<template>
  <v-container>
    <v-layout>
      <v-col>
        <v-row>
          <v-col>
            <v-card
              color="#385F73"
              dark
              outlined
              shaped
              hover
            >
              <v-card-title>
                Cobrancas
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col>
                    Abertas<br>
                    Linknet: {{ cobrancas.abertas.linknet }} <br>
                    Raniere: {{ cobrancas.abertas.raniere }} <br>
                    On Telecom: {{ cobrancas.abertas.on }}
                  </v-col>
                  <v-col>
                    Agendados<br>
                    Linknet: {{ cobrancas.agendado.linknet }} <br>
                    Raniere: {{ cobrancas.agendado.raniere }} <br>
                    On Telecom: {{ cobrancas.agendado.on }}
                  </v-col>
                  <v-col>
                    Vencidos<br>
                    Linknet: {{ cobrancas.vencido.linknet }} <br>
                    Raniere: {{ cobrancas.vencido.raniere }} <br>
                    On Telecom: {{ cobrancas.vencido.on }}
                  </v-col>
                  <v-col>
                    Tratando<br>
                    Linknet: {{ cobrancas.tratando.linknet }} <br>
                    Raniere: {{ cobrancas.tratando.raniere }} <br>
                    On Telecom: {{ cobrancas.tratando.on }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions />
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col
            cols="12"
            lg="3"
            md="3"
          >
            <v-card
              color="#385F73"
              dark
              outlined
              shaped
              hover
            >
              <v-card-title>
                Projetos FTTH
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col>
                    Projetos: {{ counts.projects }} <br>
                    Caixas: {{ counts.boxes.total }} <br>
                    Portas: {{ counts.ports.total }}
                  </v-col>
                  <v-col>
                    Ativas: {{ counts.projects }} <br>
                    Ativas: {{ counts.boxes.ativa }} <br>
                    Ativas: {{ counts.ports.ativa }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            lg="3"
            md="3"
          >
            <v-card
              color="#385F73"
              dark
              outlined
              shaped
              hover
            >
              <v-card-title>
                Projetos FTTH
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col>
                    Projetos: {{ counts.projects }} <br>
                    Caixas: {{ counts.boxes.total }} <br>
                    Portas: {{ counts.ports.total }}
                  </v-col>
                  <v-col>
                    Ativas: {{ counts.projects }} <br>
                    Ativas: {{ counts.boxes.ativa }} <br>
                    Ativas: {{ counts.ports.ativa }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            lg="6"
            md="6"
          >
            <v-card
              color="#385F73"
              dark
              outlined
              shaped
              hover
            >
              <v-card-title>
                Cobrancas
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col>
                    Abertas<br>
                    Linknet: {{ cobrancas.abertas.linknet }} <br>
                    Raniere: {{ cobrancas.abertas.raniere }} <br>
                    On Telecom: {{ cobrancas.abertas.on }}
                  </v-col>
                  <v-col>
                    Abertas<br>
                    Linknet: {{ cobrancas.abertas.linknet }} <br>
                    Raniere: {{ cobrancas.abertas.raniere }} <br>
                    On Telecom: {{ cobrancas.abertas.on }}
                  </v-col>
                  <v-col>
                    Abertas<br>
                    Linknet: {{ cobrancas.abertas.linknet }} <br>
                    Raniere: {{ cobrancas.abertas.raniere }} <br>
                    On Telecom: {{ cobrancas.abertas.on }}
                  </v-col>
                  <v-col>
                    Abertas<br>
                    Linknet: {{ cobrancas.abertas.linknet }} <br>
                    Raniere: {{ cobrancas.abertas.raniere }} <br>
                    On Telecom: {{ cobrancas.abertas.on }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions />
            </v-card>
          </v-col>
        </v-row> -->
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'Dashboard',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cobrancas/boletosAbertos')
      .then((response) => {
        context.store.commit('ixc/inserir_boletosixc', response)
        return {
          boletosAbertos: response
        }
      })
  },
  data: () => ({
    contadores: {
      projetos: {
        projetos: 0
      }
    },
    counts: {
      projects: 0,
      boxes: {
        total: 0,
        ativa: 0
      },
      ports: {
        total: 0,
        ativa: 0
      }
    },

    boletos: [],
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
      }
    }
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
        }
        if (boleto.filial_id === 4 || boleto.filial_id === 2) {
          this.cobrancas.abertas.on = this.cobrancas.abertas.on + 1

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
        }
        if (boleto.filial_id === 6) {
          this.cobrancas.abertas.raniere = this.cobrancas.abertas.raniere + 1

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
        }
      })
    }

  }

}

</script>
