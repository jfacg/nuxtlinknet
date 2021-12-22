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
              <h2>Empresas</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items" />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              height="300px"
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">
                      #
                    </th>
                    <th class="text-left">
                      Nome
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
                    v-for="empresa in empresas"
                    :key="empresa.id"
                  >
                    <td>{{ empresa.id }}</td>
                    <td>{{ empresa.nome }}</td>
                    <td>{{ empresa.descricao }}</td>
                    <td>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            color="orange"
                            x-small
                            icon
                            link
                            exact
                            :to="{name: 'permissoes-detalhes', params: {id: empresa.id}}"
                            v-on="on"
                            @click.stop="$emit('input', false)"
                          >
                            <v-icon>visibility</v-icon>
                          </v-btn>
                        </template>
                        <span>Detalhes: {{ empresa.nome }} </span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            icon
                            link
                            exact
                            :to="{name: 'permissoes-id', params: {id: empresa.id}}"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </template>
                        <span>Editar: {{ empresa.nome }} </span>
                      </v-tooltip>
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
  name: 'EmpresasIndex',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/empresas')
      .then((response) => {
        return {
          consultaEmpresas: response.data
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
        text: 'Empresas',
        disabled: true
      }
    ],
    carregamento: false,
    empresas: []
  }),

  created () {
    this.empresas = this.consultaEmpresas
  }

}
</script>
