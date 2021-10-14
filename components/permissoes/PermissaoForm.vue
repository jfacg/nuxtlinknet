<template>
  <form>
    <v-text-field
      v-model.trim="$v.editarPermissao.name.$model"
      prepend-icon="contact_page"
      name="name"
      label="Permissão"
      type="text"
      :success="!$v.editarPermissao.name.$invalid"
      :error-messages="nameErrors"
    />
    <v-text-field
      v-model.trim="$v.editarPermissao.description.$model"
      prepend-icon="description"
      name="description"
      label="Descrição"
      type="text"
      :success="!$v.editarPermissao.description.$invalid"
      :error-messages="descriptionErrors"
    />

    <v-btn
      color="primary"
      large
      @click.prevent="salvar"
    >
      Salvar
    </v-btn>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'PermissaoForm',
  mixins: [validationMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    permissao: {
      type: Object,
      required: false
    }

  },
  data: () => ({
    editarPermissao: {
      name: '',
      description: ''
    }
  }),

  computed: {

    nameErrors () {
      const errors = []
      const name = this.$v.editarPermissao.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    },
    descriptionErrors () {
      const errors = []
      const description = this.$v.editarPermissao.description
      if (!description.$dirty) {
        return errors
      }

      !description.required && errors.push('Descrição é Obrigatório!')
      !description.minLength && errors.push(`Insira pelo menos ${description.$params.minLength.min} caracteres!`)

      return errors
    }

  },

  mounted () {
    this.editarPermissao = this.permissao ? { ...this.permissao } : { name: '', description: '' }
  },

  validations: {
    editarPermissao: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      }
    }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.editarPermissao)
    }
  }
}

</script>
