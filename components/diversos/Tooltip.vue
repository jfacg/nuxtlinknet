<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        :color="atributo.cor"
        dark
        v-bind="attrs"
        icon
        x-small
        link
        exact
        :to="{name: 'empresas-criar'}"
        v-on="on"
      >
        <v-icon>
          {{ atributo.icone.nome }}
        </v-icon>
      </v-btn>
    </template>
    <span>atributo.texto</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'TooltipComponente',

  props: {
    // eslint-disable-next-line vue/require-default-prop
    atributo: {
      type: Object,
      required: false
    }
  }

}
</script>
