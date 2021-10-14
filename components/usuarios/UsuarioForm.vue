<template>
  <form>
    <v-text-field
      v-model.trim="$v.editarUsuario.name.$model"
      prepend-icon="person"
      name="name"
      label="Nome"
      type="text"
      :error-messages="nameErrors"
      :success="!$v.editarUsuario.name.$invalid"
    />
    <v-text-field
      v-model.trim="$v.editarUsuario.email.$model"
      prepend-icon="email"
      name="email"
      label="Email"
      type="email"
      :error-messages="emailErrors"
      :success="!$v.editarUsuario.email.$invalid"
    />
    <v-text-field
      v-model="$v.editarUsuario.password.$model"
      :error-messages="passwordErrors"
      prepend-icon="lock"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :type="show1 ? 'text' : 'password'"
      label="Senha"
      required
      hint="Minimo 8 caracteres"
      @click:append="show1 = !show1"
    />
    <v-select
      v-if="update"
      v-model="editarUsuario.roles[0]"
      :items="listarFuncoes"
      item-text="name"
      item-value="id"
      label="Função"
      prepend-icon="contact_page"
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  name: 'UsuarioForm',

  mixins: [validationMixin],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    usuario: {
      type: Object,
      required: false
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    editarUsuario: {
      name: '',
      email: '',
      password: '',
      roles: []
    },
    roles: [],
    show1: false
  }),

  computed: {

    listarFuncoes () {
      return this.$store.getters['funcoes/listar_funcoes']
    },

    emailErrors () {
      const errors = []
      const email = this.$v.editarUsuario.email
      if (!email.$dirty) {
        return errors
      }

      !email.required && errors.push('Email é Obrigatório!')
      !email.email && errors.push('Insira um email válido!')

      return errors
    },
    nameErrors () {
      const errors = []
      const name = this.$v.editarUsuario.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.editarUsuario.password
      if (!password.$dirty) {
        return errors
      }

      !password.required && errors.push('Senha é Obrigatório!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)

      return errors
    }
  },

  mounted () {
    this.editarUsuario = this.usuario ? { ...this.usuario } : { name: '', email: '', password: '' }
  },

  validations: {
    editarUsuario: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      },
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.editarUsuario)
    }
  }
}
</script>
