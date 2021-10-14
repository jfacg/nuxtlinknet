<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <h2>Lista de Clientes</h2>
                </v-col>
                <v-col />
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    color="primary"
                    elevation="10"
                    to="/clientes/criar"
                    exact
                    link
                    @click.stop="$emit('input', false)"
                  >
                    Criar Novo Cliente
                    <v-icon right>
                      add
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    name="filter"
                    label="Search"
                    type="text"
                  />
                </v-col>
              </v-row>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table height="300px">
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Nome
                    </th>
                    <th class="text-left">
                      CPF
                    </th>
                    <th class="text-left">
                      Endereço
                    </th>
                    <th class="text-left">
                      Contato
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cliente in listarClientes"
                    :key="cliente.id"
                  >
                    <td>{{ cliente.name }}</td>
                    <td>{{ formataCpf(cliente.cpf) }}</td>
                    <td>{{ cliente.street }}, {{ cliente.number }} - {{ cliente.district }},</td>
                    <td>{{ formataCell(cliente.cellPhone1) }}</td>

                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'clientes-detalhes-id', params: {id: cliente.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>visibility</v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'clientes-id', params: {id: cliente.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'ClientesIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Clientes',
        disabled: true
      }
    ],
    carregamento: false,
    search: ''
  }),

  computed: {
    listarClientes () {
      // eslint-disable-next-line no-console
      // console.log(this.$store)
      return this.$store.getters['clientes/listar_clientes'].filter((clientes) => {
        return clientes.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },

  methods: {
    formataCell (cell) {
      const cpfOriginal = cell
      let cellFormatado = ''

      cellFormatado = cpfOriginal.replace(/(\d{2})(\d{5})(\d{4})/,
        function (regex, argumento1, argumento2, argumento3) {
          return `(${argumento1}) ${argumento2}-${argumento3}`
        })

      return cellFormatado
    },

    formataCpf (cpf) {
      const cpfOriginal = cpf
      let cpfFormatado = ''

      cpfFormatado = cpfOriginal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        function (regex, argumento1, argumento2, argumento3, argumento4) {
          return `${argumento1}.${argumento2}.${argumento3}-${argumento4}`
        })

      return cpfFormatado
    }
  }
}

</script>
