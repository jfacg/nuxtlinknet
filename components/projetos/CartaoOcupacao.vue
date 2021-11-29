<template>
  <v-col
    cols="12"
    md="4"
    sm="6"
    xs="12"
  >
    <v-card
      :color="cartao.cor"
      dark
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="text-h3"
            v-text="cartao.titulo"
          />

          <v-card-subtitle v-text="cartao.severidade" />
          <v-card-text class="text-h5 text-center">
            <span>
              {{ cartao.quantidade }} Caixas
            </span>
          </v-card-text>

          <v-card-actions>
            <v-dialog
              v-model="dialogListaCaixas"
              persistent
              width="700"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  Listar Caixas
                </v-btn>
              </template>

              <v-card>
                <v-card-title :class="estiloCartaoTitulo(cartao.cor)">
                  Nivél de Urgência: {{ cartao.severidade }}
                </v-card-title>

                <v-card-text>
                  <v-simple-table
                    fixed-header
                    height="300px"
                    dense
                  >
                    <template #default>
                      <thead>
                        <tr>
                          <th
                            class="text-left"
                            width="50"
                          >
                            #
                          </th>
                          <th class="text-left">
                            Caixa
                          </th>
                          <th
                            class="text-center"
                            width="110"
                          >
                            Portas
                          </th>
                          <th
                            class="text-center"
                            width="110"
                          >
                            P. Ativas
                          </th>
                          <th
                            class="text-center"
                            width="110"
                          >
                            P. Ocupadas
                          </th>
                          <th
                            class="text-center"
                            width="110"
                          >
                            P. Canceladas
                          </th>
                          <th
                            class="text-center"
                            width="110"
                          >
                            P. Utilizadas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="caixa in cartao.caixas"
                          :key="caixa.id"
                        >
                          <td>{{ caixa.id }}</td>
                          <td>
                            <v-dialog
                              v-model="dialogCaixa"
                              width="450"
                            >
                              <template #activator="{ on, attrs }">
                                <span
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="buscarCaixa(caixa)"
                                >
                                  {{ caixa.caixa }}
                                </span>
                              </template>

                              <v-card
                                :color="cartao.cor"
                                dark
                              >
                                <v-card-title :class="estiloCartaoTitulo(cartao.cor)">
                                  Dados da Caixa: {{ caixaLocalizada.caixa }}
                                </v-card-title>
                                <v-card-subtitle>
                                  <br>
                                  Endereco: {{ caixaLocalizada.endereco }} <br>
                                  Sinal: {{ caixaLocalizada.sinal }} <br>
                                </v-card-subtitle>
                              </v-card>
                            </v-dialog>
                          </td>
                          <td class="text-center">
                            {{ caixa.portas }}
                          </td>
                          <td class="text-center">
                            {{ caixa.portaAtiva }}
                          </td>
                          <td class="text-center">
                            {{ caixa.portaOcupada }}
                          </td>
                          <td class="text-center">
                            {{ caixa.portaCancelada }}
                          </td>
                          <td class="text-center">
                            {{ caixa.portaUtilizada }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="dialogListaCaixas = false"
                  >
                    Fechar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'CartaoOcupacao',

  props: {
    // eslint-disable-next-line vue/require-default-prop
    cartao: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    dialogListaCaixas: false,
    dialogCaixa: false,
    cartaoRecebido: {},
    caixaLocalizada: ''
  }),

  created () {
    this.cartaoRecebido = this.cartao
  },

  methods: {
    estiloCartaoTitulo (color) {
      const estilo = 'text-h5 ' + color
      return estilo
    },

    buscarCaixa (caixa) {
      this.caixaLocalizada = caixa
    }

  }

}
</script>
