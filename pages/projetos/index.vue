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
            <v-container>
              <v-row>
                <v-col>
                  <h2>Lista de Projetos</h2>
                </v-col>
                <v-col />
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    color="primary"
                    elevation="10"
                    to="/projetos/criar"
                    exact
                    link
                    @click.stop="$emit('input', false)"
                  >
                    Criar Novo Projeto
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
                      Name
                    </th>
                    <th class="text-left">
                      Placa da OLT
                    </th>
                    <th class="text-left">
                      Porta da OLT
                    </th>
                    <th class="text-left">
                      Qt. Caixas
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="projeto in listarProjetos"
                    :key="projeto.id"
                  >
                    <td>{{ projeto.name }}</td>
                    <td>{{ projeto.oltSlot }}</td>
                    <td>{{ projeto.oltPort }}</td>
                    <td>
                      <router-link :to="{name:'projetos-id-caixas', params: {id:projeto.id} }">
                        {{ projeto.numberBoxes }}
                      </router-link>
                    </td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'projetos-detalhes-id', params: {id: projeto.id}}"
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
                        :to="{name: 'projetos-id', params: {id: projeto.id}}"
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
import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'ProjetosIndex',
  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/projetos')
      .then((response) => {
        return {
          consultaProjetos: response
        }
      })
  },

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Projetos FTTH',
        disabled: true
      }
    ],
    carregamento: false,
    search: '',
    projetos: []

  }),

  computed: {
    listarProjetos () {
      return this.projetos.filter((projetos) => {
        return projetos.name.toLowerCase().match(this.search.toLowerCase())
      })
    }

  },

  created () {
    this.projetos = this.consultaProjetos
  }

}
</script>
