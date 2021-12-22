<template>
  <form>
    <v-text-field
      v-model.trim="$v.editarempresa.nome.$model"
      name="nome"
      label="Empresa"
      type="text"
      :success="!$v.editarempresa.nome.$invalid"
      :error-messages="nomeErrors"
    />
    <v-text-field
      v-model.trim="$v.editarempresa.descricao.$model"
      name="descricao"
      label="Descrição"
      type="text"
      :success="!$v.editarempresa.descricao.$invalid"
      :error-messages="descricaoErrors"
    />
    <v-text-field
      v-model.trim="editarempresa.filialixc"
      name="filialixc"
      label="Filial IXC"
      type="text"
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
  name: 'EmpresaForm',
  mixins: [validationMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    empresa: {
      type: Object,
      required: false
    }

  },
  data: () => ({
    editarempresa: {
      nome: '',
      descricao: '',
      filialixc: ''
    }
  }),

  computed: {

    nomeErrors () {
      const errors = []
      const nome = this.$v.editarempresa.nome
      if (!nome.$dirty) {
        return errors
      }

      !nome.required && errors.push('Nome é Obrigatório!')
      !nome.minLength && errors.push(`Insira pelo menos ${nome.$params.minLength.min} caracteres!`)

      return errors
    },
    descricaoErrors () {
      const errors = []
      const descricao = this.$v.editarempresa.descricao
      if (!descricao.$dirty) {
        return errors
      }

      !descricao.required && errors.push('Descrição é Obrigatório!')
      !descricao.minLength && errors.push(`Insira pelo menos ${descricao.$params.minLength.min} caracteres!`)

      return errors
    }

  },

  mounted () {
    this.editarempresa = this.empresa ? { ...this.empresa } : { nome: '', descricao: '' }
  },

  validations: {
    editarempresa: {
      nome: {
        required,
        minLength: minLength(3)
      },
      descricao: {
        required,
        minLength: minLength(3)
      }
    }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.editarempresa)
    }
  }
}

</script>
