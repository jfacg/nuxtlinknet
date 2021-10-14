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
                  <h2>Lista de Caixas</h2>
                </v-col>
                <!-- <v-col>
                  <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    name="filter"
                    label="Search"
                    type="text"
                  />
                </v-col> -->
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
                      Endereço
                    </th>
                    <th class="text-left">
                      Sinal
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Qt. Portas
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="caixa in listarCaixas"
                    :key="caixa.id"
                  >
                    <td>{{ caixa.name }}</td>
                    <td>{{ caixa.address }}</td>
                    <td>{{ caixa.signal }}</td>
                    <td>{{ caixa.status }}</td>
                    <td>
                      <router-link :to="{name:'projetos-id-caixas-idCaixa-portas', params: {id:projeto.id,idCaixa:caixa.id} }">
                        {{ caixa.numberPorts }}
                      </router-link>
                    </td>
                    <td>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'projetos-id-caixas-idCaixa', params: {id:projeto.id,idCaixa:caixa.id}}"
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
  name: 'ProjetoCaixasListar',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/projetos/' + context.params.id)
      .then((response) => {
        return {
          projeto: response
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
        text: 'Projetos',
        disabled: false,
        to: '/projetos',
        exact: true,
        link: true
      },
      {
        text: 'Caixas',
        disabled: true
      }
    ],
    search: ''

  }),

  computed: {
    listarCaixas () {
      return this.projeto.boxes.filter((caixa) => {
        return caixa.name.toLowerCase().match(this.search.toLowerCase())
      })
    }

  }

}
</script>
