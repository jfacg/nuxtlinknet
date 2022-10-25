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
              <h2>Tipos</h2>
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
                      Classe
                    </th>
                    <th class="text-left">
                      Descrição
                    </th>
                    <!-- <th class="text-left">
                      Ações
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="tipo in tipos"
                    :key="tipo.id"
                  >
                    <td>{{ tipo.id }}</td>
                    <td>{{ tipo.tipoNome }}</td>
                    <td>{{ tipo.tipoClasse }}</td>
                    <td>{{ tipo.tipoDescricao }}</td>
                    <!-- <td>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            color="orange"
                            x-small
                            icon
                            link
                            exact
                            :to="{name: 'permissoes-detalhes', params: {id: tipo.id}}"
                            v-on="on"
                            @click.stop="$emit('input', false)"
                          >
                            <v-icon>visibility</v-icon>
                          </v-btn>
                        </template>
                        <span>Detalhes: {{ tipo.tipoNome }} </span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            icon
                            link
                            exact
                            :to="{name: 'permissoes-id', params: {id: tipo.id}}"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </template>
                        <span>Editar: {{ tipo.tipoNome }} </span>
                      </v-tooltip>
                    </td> -->
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
  name: 'TiposIndex',

  asyncData (context) {
    return context.$axios.$get(URI_BASE_API + API_VERSION + '/tipos')
      .then((response) => {
        return {
          consultaTipos: response.data
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
        text: 'Tipos',
        disabled: true
      }
    ],
    carregamento: false,
    tipos: []
  }),

  created () {
    this.tipos = this.consultaTipos
  }

}
</script>
