<template>
  <form>
    <v-text-field
      v-model="editarWatch.email"
      name="email"
      label="Email"
      type="email"
    />
    <v-text-field
      v-model="editarWatch.telefone"
      name="telefone"
      label="Telefone"
      type="text"
    />
    <v-text-field
      v-model="editarWatch.cpf"
      name="cpf"
      label="CPF"
      type="text"
    />

    <v-btn
      color="primary"
      large
      @click.prevent="salvar"
    >
      Solicitar
    </v-btn>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'UsuarioForm',

  mixins: [validationMixin],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    watch: {
      type: Object,
      required: false
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    editarWatch: {
      cpf: '',
      email: '',
      telefone: '',
      empresa_id: '',
      usuario_id: '',
      status: ''
    },
    empresas: []
  }),

  computed: {

    emailErrors () {
      const errors = []
      const email = this.$v.editarWatch.email
      if (!email.$dirty) {
        return errors
      }

      !email.required && errors.push('Email é Obrigatório!')
      !email.email && errors.push('Insira um email válido!')

      return errors
    }

  },

  created () {
    this.buscarEmpresas()
  },

  mounted () {
    this.editarWatch = this.watch ? this.watch : ''
  },

  validations: {
    editarWatch: {
      email: {
        required,
        email
      }
    }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.editarWatch)
    },

    buscarEmpresas () {
      this.$axios.get(URI_BASE_API + API_VERSION + '/empresas')
        .then((response) => {
          this.empresas = response.data.data
        })
    }

  }
}
</script>
