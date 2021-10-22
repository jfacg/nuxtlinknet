<template>
  <form>
    <v-text-field
      v-model.trim="$v.clienteEditado.name.$model"
      name="name"
      label="Nome do clienteEditado"
      type="text"
      :success="!$v.clienteEditado.name.$invalid"
      :error-messages="nameErrors"
      @keyup="uppercase"
    />
    <v-text-field-cpf
      v-model.trim="$v.clienteEditado.cpf.$model"
      name="cpf"
      label="CPF"
      type="text"
      :maxlength="11"
      :success="!$v.clienteEditado.cpf.$invalid"
      :error-messages="cpfErrors"
    />
    <v-text-field
      v-model.trim="clienteEditado.birthday"
      name="birthday"
      label="Data de Nascimento"
      type="date"
    />
    <v-text-field-simplemask
      v-model.trim="$v.clienteEditado.cellPhone1.$model"
      name="cellPhone1"
      label="Celular 1"
      type="text"
      :maxlength="11"
      :success="!$v.clienteEditado.cellPhone1.$invalid"
      :error-messages="cellPhone1Errors"
      :options="{
        inputMask: '(##) #####-####',
        outputMask: '###########',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
      }"
    />
    <v-text-field-simplemask
      v-model.trim="$v.clienteEditado.cellPhone2.$model"
      name="cellPhone2"
      label="Celular 2"
      type="text"
      :maxlength="11"
      :success="!$v.clienteEditado.cellPhone2.$invalid"
      :error-messages="cellPhone2Errors"
      :options="{
        inputMask: '(##) #####-####',
        outputMask: '###########',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
      }"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.email.$model"
      name="email"
      label="email"
      type="text"
      :success="!$v.clienteEditado.email.$invalid"
      :error-messages="emailErrors"
    />
    <v-text-field-cep
      v-model.trim="$v.clienteEditado.cep.$model"
      name="cep"
      label="CEP"
      type="text"
      :success="!$v.clienteEditado.cep.$invalid"
      :error-messages="cepErrors"
      :options="{
        outputMask: '########',
        empty: null,
        applyAfter: true,
      }"
      @change="buscarCep"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.street.$model"
      name="street"
      label="Endereço"
      type="text"
      :success="!$v.clienteEditado.street.$invalid"
      :error-messages="streetErrors"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.number.$model"
      name="number"
      label="Numero"
      type="text"
      :success="!$v.clienteEditado.number.$invalid"
      :error-messages="numberErrors"
    />
    <v-text-field
      v-model.trim="clienteEditado.complement"
      name="complement"
      label="Complemento"
      type="text"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.district.$model"
      name="district"
      label="Bairro"
      type="text"
      :success="!$v.clienteEditado.district.$invalid"
      :error-messages="districtErrors"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.city.$model"
      name="city"
      label="Cidade"
      type="text"
      :success="!$v.clienteEditado.city.$invalid"
      :error-messages="cityErrors"
    />
    <v-text-field
      v-model.trim="$v.clienteEditado.state.$model"
      name="state"
      label="Estado"
      type="text"
      :success="!$v.clienteEditado.state.$invalid"
      :error-messages="stateErrors"
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
import { required, minLength, numeric, maxLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'ClienteForm',
  components: {
  },

  mixins: [validationMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    cliente: {
      type: Object,
      required: false
    }

  },

  data: () => ({
    clienteEditado: {
      name: '',
      cpf: '',
      birthday: '',
      cellPhone1: '',
      cellPhone2: '',
      email: '',
      cep: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: ''
    }

  }),

  validations: {
    clienteEditado: {
      name: {
        required,
        minLength: minLength(3)
      },
      cpf: {
        required,
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      cellPhone1: {
        required,
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      cellPhone2: {
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      email: {
        required,
        email
      },
      cep: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(8)
      },
      street: {
        required,
        minLength: minLength(3)
      },
      number: {
        required,
        numeric
      },
      district: {
        required,
        minLength: minLength(3)
      },
      city: {
        required,
        minLength: minLength(3)
      },
      state: {
        required,
        minLength: minLength(2)
      }
    }

  },

  computed: {
    nameErrors () {
      const errors = []
      const name = this.$v.clienteEditado.name
      if (!name.$dirty) {
        return errors
      }
      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.clienteEditado.email
      if (!email.$dirty) {
        return errors
      }
      !email.required && errors.push('Email é Obrigatório!')
      !email.email && errors.push('Insira um email válido!')
      return errors
    },
    cpfErrors () {
      const errors = []
      const cpf = this.$v.clienteEditado.cpf
      if (!cpf.$dirty) {
        return errors
      }
      !cpf.required && errors.push('CPF é Obrigatório!')
      !cpf.minLength && errors.push(`Insira pelo menos ${cpf.$params.minLength.min} caracteres!`)
      !cpf.maxLength && errors.push(`Insira pelo menos ${cpf.$params.maxLength.max} caracteres!`)
      return errors
    },
    cellPhone1Errors () {
      const errors = []
      const cellPhone1 = this.$v.clienteEditado.cellPhone1
      if (!cellPhone1.$dirty) {
        return errors
      }
      !cellPhone1.numeric && errors.push('Insira somente numeros!')
      !cellPhone1.required && errors.push('CPF é Obrigatório!')
      !cellPhone1.minLength && errors.push(`Insira pelo menos ${cellPhone1.$params.minLength.min} caracteres!`)
      !cellPhone1.maxLength && errors.push(`Insira pelo menos ${cellPhone1.$params.maxLength.max} caracteres!`)
      return errors
    },
    cellPhone2Errors () {
      const errors = []
      const cellPhone2 = this.$v.clienteEditado.cellPhone2
      if (!cellPhone2.$dirty) {
        return errors
      }
      !cellPhone2.numeric && errors.push('Insira somente numeros!')
      !cellPhone2.minLength && errors.push(`Insira pelo menos ${cellPhone2.$params.minLength.min} caracteres!`)
      !cellPhone2.maxLength && errors.push(`Insira pelo menos ${cellPhone2.$params.maxLength.max} caracteres!`)
      return errors
    },
    cepErrors () {
      const errors = []
      const cep = this.$v.clienteEditado.cep
      if (!cep.$dirty) {
        return errors
      }
      !cep.required && errors.push('CEP é Obrigatório!')
      !cep.numeric && errors.push('Insira somente numeros!')
      !cep.minLength && errors.push(`Insira pelo menos ${cep.$params.minLength.min} caracteres!`)
      !cep.maxLength && errors.push(`Insira pelo menos ${cep.$params.maxLength.max} caracteres!`)
      return errors
    },
    streetErrors () {
      const errors = []
      const street = this.$v.clienteEditado.street
      if (!street.$dirty) {
        return errors
      }
      !street.required && errors.push('Endereço é Obrigatório!')
      !street.minLength && errors.push(`Insira pelo menos ${street.$params.minLength.min} caracteres!`)
      return errors
    },
    numberErrors () {
      const errors = []
      const number = this.$v.clienteEditado.number
      if (!number.$dirty) {
        return errors
      }
      !number.required && errors.push('Numero é Obrigatório!')
      !number.numeric && errors.push('Insira somente numeros!')
      return errors
    },
    districtErrors () {
      const errors = []
      const district = this.$v.clienteEditado.district
      if (!district.$dirty) {
        return errors
      }
      !district.required && errors.push('Bairro é Obrigatório!')
      !district.minLength && errors.push(`Insira pelo menos ${district.$params.minLength.min} caracteres!`)
      return errors
    },
    cityErrors () {
      const errors = []
      const city = this.$v.clienteEditado.city
      if (!city.$dirty) {
        return errors
      }
      !city.required && errors.push('Cidade é Obrigatório!')
      !city.minLength && errors.push(`Insira pelo menos ${city.$params.minLength.min} caracteres!`)
      return errors
    },
    stateErrors () {
      const errors = []
      const state = this.$v.clienteEditado.state
      if (!state.$dirty) {
        return errors
      }
      !state.required && errors.push('Estado é Obrigatório!')
      !state.minLength && errors.push(`Insira pelo menos ${state.$params.minLength.min} caracteres!`)
      return errors
    }

  },

  mounted () {
    this.clienteEditado = this.cliente ? { ...this.cliente } : { ...this.clienteEditado }
  },

  methods: {
    salvar () {
      this.$emit('submit', this.clienteEditado)
    },

    uppercase () {
      this.clienteEditado.name = this.clienteEditado.name.toUpperCase()
    },

    buscarCep () {
      this.$viaCep.buscarCep(this.clienteEditado.cep).then((cep) => {
        this.clienteEditado.street = cep.logradouro
        this.clienteEditado.district = cep.bairro
        this.clienteEditado.city = cep.localidade
        this.clienteEditado.state = cep.uf
      })
    }
  }

}
</script>
