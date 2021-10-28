<template>
  <v-container>
    <v-layout>
      <v-col
        cols="12"
        md="4"
        lg="2"
      >
        <v-card
          color="#385F73"
          dark
          outlined
          shaped
          hover
          :to="{name: 'projetos'}"
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
    </v-layout>
  </v-container>
</template>
<script>
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
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
    }
  }),

  mounted () {

  }

}

</script>
