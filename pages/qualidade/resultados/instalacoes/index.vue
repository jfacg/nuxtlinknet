
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col>
            <v-card
              elevation="24"
            >
              <v-card-title>
                <h2>Resultados Instalações</h2>
              </v-card-title>
              <v-card-subtitle>
                <v-breadcrumbs :items="items" />
              </v-card-subtitle>
              <v-card-text>
                <line-chart :chartdata="chartData" :options="chartOptions" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
// import moment from 'moment'
import { URI_BASE_API, API_VERSION } from '@/config/config'
import LineChart from '@/components/charts/LineChart.vue'

export default {
  name: 'ResultadoInstalacoesIndex',

  components: {
    LineChart
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },

      {
        text: 'Qualidade',
        disabled: true
      }
    ],

    chartData: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Aprovado',
          borderColor: '#364eb5',
          borderWidth: 4,
          pointBackgroundColor: '#364eb5',
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderColor: '#000',
          fill: false,
          data: []
        }
      ]
    },

    chartOptions: {
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: '#de23b5',
        titleFontColor: '#ffffff',
        bodyFontColor: '#ffffff',
        position: 'nearest',
        mode: 'nearest',
        intersect: 0,
        bodySpacing: 4,
        xPadding: 20
      }
    }

  }),

  mounted () {
    this.dadosPesquisaGrafico()
  },

  methods: {

    dadosPesquisaGrafico () {
      this.$axios.$get(URI_BASE_API + API_VERSION + '/pesqInstalacao/pesquisaDadosGrafico')
        .then((response) => {
          const dados = []
          dados.push(response.data.jan)
          dados.push(response.data.fev)
          dados.push(response.data.mar)
          dados.push(response.data.abr)
          dados.push(response.data.mai)
          dados.push(response.data.jun)
          dados.push(response.data.jul)
          dados.push(response.data.ago)
          dados.push(response.data.set)
          dados.push(response.data.out)
          dados.push(response.data.nov)
          dados.push(response.data.dez)
          const aprovados = []

          dados.forEach((element) => {
            element.fase1 ? aprovados.push(element.fase1.APROVADO) : aprovados.push(0)
          })

          this.chartData.datasets[0].data = aprovados

          console.log(aprovados)
        })
    }

  }

}
</script>
