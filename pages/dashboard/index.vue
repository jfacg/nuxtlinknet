
<template>
  <v-container>
    <v-layout v-if="mostrar()">
      <v-col>
        <CobrancaPainel />
        <FtthPainel />
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import { URI_BASE_API, API_VERSION } from '@/config/config'
import CobrancaPainel from '@/components/dashboard/CobrancaPainel.vue'
import FtthPainel from '@/components/dashboard/FtthPainel.vue'

export default {
  name: 'Dashboard',

  components: {
    CobrancaPainel,
    FtthPainel
  },

  async asyncData (context) {
    const boletos = await context.$axios.$get(URI_BASE_API + API_VERSION + '/ixc/cobrancas/boletosAbertos')
      .then((response) => {
        context.store.commit('ixc/inserir_boletosixc', response)
      })

    const projetos = await context.$axios.$get(URI_BASE_API + API_VERSION + '/projetos')
      .then((response) => {
        context.store.commit('projetos/inserir_projetos', response)
      })

    return {
      boletos,
      projetos
    }
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
    usuario: {}

  }),

  created () {
    this.usuario = this.$store.getters['auth/usuarioAutenticado']
  },

  methods: {

    mostrar () {
      console.log(this.usuario.empresa)
      if (this.usuario.empresa.filialixc === '0') {
        return false
      } else {
        return true
      }
    }

  }

}

</script>
