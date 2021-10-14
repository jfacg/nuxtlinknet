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
                  <h2>Portas da Caixa: {{ }}</h2>
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
                      Cód do Cabo
                    </th>
                    <th class="text-left">
                      Cliente
                    </th>
                    <th class="text-left">
                      Parceiro
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="porta in caixa.ports"
                    :key="porta.id"
                  >
                    <td>{{ porta.name }}</td>
                    <td>{{ porta.cableCode }}</td>
                    <td>
                      <v-dialog
                        v-if="porta.client_ixc !== null"
                        transition="dialog-bottom-transition"
                        max-width="600"
                      >
                        <template #activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ (porta.client_ixc !== null) ? porta.client_ixc.razao : '' }}
                          </div>
                        </template>
                        <template #default="dialog">
                          <v-card>
                            <v-toolbar
                              color="primary"
                              dark
                            >
                              Dados do Cliente IXC
                            </v-toolbar>
                            <v-card-text>
                              <div v-if="porta.client_ixc !== null">
                                <br>
                                Nome: {{ porta.client_ixc.razao }} <br>
                                Endereço: {{ porta.client_ixc.endereco }} - {{ porta.client_ixc.numero }} <br>
                                Bairro: {{ porta.client_ixc.bairro }} - Cep: {{ porta.client_ixc.cep }}<br>
                              </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="dialog.value = false"
                              >
                                Close
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                    </td>
                    <td>{{ porta.partner }}</td>
                    <td>{{ porta.status }}</td>

                    <td>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'projetos-id-caixas-idCaixa-portas-idPorta', params: {id:projeto.id, idCaixa: caixa.id, idPorta: porta.id}}"
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
  name: 'ProjetoCaixaPortasLista',
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
        disabled: false,
        to: '',
        exact: true,
        link: true
      },
      {
        text: 'Portas',
        disabled: true
      }
    ],
    search: ''

  }),

  computed: {
    caixa () {
      return this.projeto.boxes.find(caixa => caixa.id === parseInt(this.$route.params.idCaixa))
    }
  },

  created () {
    this.items[2].to = '/projetos/' + this.$route.params.id + '/caixas'
  }

}
</script>
