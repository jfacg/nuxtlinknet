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
            <div>
              <h2>Lista de Permissões</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                to="/permissoes/criar"
                exact
                link
                @click.stop="$emit('input', false)"
              >
                Criar Nova Permissão
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
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="permissao in listarPermissoes"
                    :key="permissao.id"
                  >
                    <td>{{ permissao.name }}</td>
                    <td>{{ permissao.description }}</td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'permissoes-detalhes', params: {id: permissao.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>visibility</v-icon>
                      </v-btn>
                      <v-btn
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'permissoes-id', params: {id: permissao.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <!-- <v-btn
                        color="red"
                        elevation="10"
                        icon
                        x-small
                      >
                        <v-icon>delete</v-icon>
                      </v-btn> -->
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
  name: 'PermissoesIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Permissões',
        disabled: true
      }
    ],
    carregamento: false
  }),

  computed: {
    listarPermissoes () {
      return this.$store.getters['permissoes/listar_permissoes']
    }
  }

}
</script>
