<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading="carregamento"
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <div>
              <h2>Lista de Funções</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                to="/funcoes/criar"
                exact
                link
                @click.stop="$emit('input', false)"
              >
                Criar Nova Função
                <v-icon right>
                  add
                </v-icon>
              </v-btn>
            </div>
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
                      Name
                    </th>
                    <th class="text-left">
                      Descrição
                    </th>
                    <th class="text-left">
                      Permissões
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="funcao in listarFuncoes"
                    :key="funcao.id"
                  >
                    <td>{{ funcao.name }}</td>
                    <td>{{ funcao.description }}</td>
                    <td>
                      <div
                        v-for="permissao in funcao.permissions"
                        :key="permissao.id"
                      >
                        {{ permissao.name }}
                      </div>
                    </td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'funcoes-detalhes', params: {id:funcao.id}}"
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
                        :to="{name: 'funcoes-id', params: {id:funcao.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        color="segunary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'funcoes-permissoes-id', params: {id:funcao.id}}"
                      >
                        <v-icon>lock</v-icon>
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
  name: 'FuncaoIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Funções',
        disabled: true
      }

    ],
    carregamento: false

  }),

  computed: {
    listarFuncoes () {
      // eslint-disable-next-line no-console
      // console.log(this)
      return this.$store.getters['funcoes/listar_funcoes']
    }
  }
}
</script>
