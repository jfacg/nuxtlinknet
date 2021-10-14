<template>
  <form>
    <v-text-field
      v-model.trim="$v.projetoEditado.name.$model"
      name="name"
      label="Nome do Projeto"
      type="text"
      :error-messages="nameErrors"
      :success="!$v.projetoEditado.name.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.shortName.$model"
      name="shortName"
      label="Sigla do Projeto"
      type="text"
      :error-messages="shortNameErrors"
      :success="!$v.projetoEditado.shortName.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.description.$model"
      name="description"
      label="Descrição"
      type="text"
      :error-messages="descriptionErrors"
      :success="!$v.projetoEditado.description.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.numberBoxes.$model"
      name="numberBoxes"
      label="Quantidade de Caixas"
      type="text"
      :error-messages="numberBoxesErrors"
      :success="!$v.projetoEditado.numberBoxes.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.numberBoxPorts.$model"
      name="numberBoxPorts"
      label="Quantidade de Portas por Caixa"
      type="text"
      :error-messages="numberBoxPortsErrors"
      :success="!$v.projetoEditado.numberBoxPorts.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.oltName.$model"
      name="oltName"
      label="Nome da OLT"
      type="text"
      :error-messages="oltNameErrors"
      :success="!$v.projetoEditado.oltName.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.oltSlot.$model"
      name="oltSlot"
      label="Placa da OLT"
      type="text"
      :error-messages="oltSlotErrors"
      :success="!$v.projetoEditado.oltSlot.$invalid"
    />
    <v-text-field
      v-model.trim="$v.projetoEditado.oltPort.$model"
      name="oltPort"
      label="Porta da OLT"
      type="text"
      :error-messages="oltPortErrors"
      :success="!$v.projetoEditado.oltPort.$invalid"
    />

    <v-btn
      :disabled="$v.$invalid"
      color="primary"
      large
      @click.prevent="salvar"
    >
      Salvar
    </v-btn>
  </form>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'ProjetosForm',

  mixins: [validationMixin],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    projeto: {
      type: Object,
      required: false
    }

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
        to: '/projetoEditados',
        exact: true,
        link: true

      },
      {
        text: 'Novo Projeto',
        disabled: true
      }

    ],
    projetoEditado: {
      name: '',
      shortName: '',
      description: '',
      numberBoxes: '',
      numberBoxPorts: '',
      oltName: '',
      oltSlot: '',
      oltPort: ''
    }

  }),

  validations: {
    projetoEditado: {
      name: {
        required,
        minLength: minLength(3)
      },
      shortName: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      numberBoxes: {
        required,
        numeric
      },
      numberBoxPorts: {
        required,
        numeric
      },
      oltName: {
        required,
        minLength: minLength(3)
      },
      oltSlot: {
        required,
        numeric
      },
      oltPort: {
        required,
        numeric
      }
    }

  },

  computed: {
    nameErrors () {
      const errors = []
      const name = this.$v.projetoEditado.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    },
    shortNameErrors () {
      const errors = []
      const shortName = this.$v.projetoEditado.shortName
      if (!shortName.$dirty) {
        return errors
      }

      !shortName.required && errors.push('Nome é Obrigatório!')
      !shortName.minLength && errors.push(`Insira pelo menos ${shortName.$params.minLength.min} caracteres!`)

      return errors
    },
    descriptionErrors () {
      const errors = []
      const description = this.$v.projetoEditado.description
      if (!description.$dirty) {
        return errors
      }

      !description.required && errors.push('Descrição é Obrigatório!')
      !description.minLength && errors.push(`Insira pelo menos ${description.$params.minLength.min} caracteres!`)

      return errors
    },
    numberBoxesErrors () {
      const errors = []
      const numberBoxes = this.$v.projetoEditado.numberBoxes
      if (!numberBoxes.$dirty) {
        return errors
      }

      !numberBoxes.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !numberBoxes.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    numberBoxPortsErrors () {
      const errors = []
      const numberBoxPorts = this.$v.projetoEditado.numberBoxPorts
      if (!numberBoxPorts.$dirty) {
        return errors
      }

      !numberBoxPorts.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !numberBoxPorts.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    oltNameErrors () {
      const errors = []
      const oltName = this.$v.projetoEditado.oltName
      if (!oltName.$dirty) {
        return errors
      }

      !oltName.required && errors.push('Nome é Obrigatório!')
      !oltName.minLength && errors.push(`Insira pelo menos ${oltName.$params.minLength.min} caracteres!`)

      return errors
    },
    oltSlotErrors () {
      const errors = []
      const oltSlot = this.$v.projetoEditado.oltSlot
      if (!oltSlot.$dirty) {
        return errors
      }

      !oltSlot.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !oltSlot.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    oltPortErrors () {
      const errors = []
      const oltPort = this.$v.projetoEditado.oltPort
      if (!oltPort.$dirty) {
        return errors
      }

      !oltPort.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !oltPort.numeric && errors.push('Insira somente numeros!')

      return errors
    }

  },

  mounted () {
    this.projetoEditado = this.projeto ? { ...this.projeto } : { ...this.projetoEditado }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.projetoEditado)
    }
  }

}
</script>
