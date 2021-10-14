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
              <h2>Lista de Usuários</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                exact
                link
                to="/usuarios/criar"
                @click.stop="$emit('input', false)"
              >
                Novo Usuário
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
                      Nome
                    </th>
                    <th class="text-left">
                      Apelido
                    </th>
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Função
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="usuario in listarUsuarios"
                    :key="usuario.id"
                  >
                    <td>{{ usuario.name }}</td>
                    <td>{{ usuario.nick_name }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>
                      <div
                        v-for="role in usuario.roles"
                        :key="role.id"
                      >
                        {{ role.name }}
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
                        :to="{name: 'usuarios-id', params: {id: usuario.id}}"
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
                        :to="{name: 'usuarios-id', params: {id: usuario.id}}"
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
// import { mapActions, mapState } from 'vuex'

export default {
  name: 'UsuarioIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Usuários',
        disabled: true
      }

    ],
    carregamento: false

  }),

  computed: {
    listarUsuarios () {
      return this.$store.getters['usuarios/listar_usuarios']
    }
  }

}
</script>
