<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col>
            <v-card
              elevation="24"
            >
              <v-card-title>
                <h2>Equipametos</h2>
              </v-card-title>
              <v-card-subtitle>
                <v-breadcrumbs :items="items" />
              </v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <v-flex>
                      <v-card
                        width="200"
                        color="blue"
                        rounded="xl"
                        link
                        @click.stop="adicionar"
                      >
                        <v-card-title>
                          Adicionar
                        </v-card-title>
                        <v-card-text>
                          <v-row justify="center">
                            <v-icon size="100" color="white">
                              mdi-access-point-network
                            </v-icon>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>

                  <v-col cols="2">
                    <v-flex>
                      <v-card
                        width="200"
                        color="blue"
                        rounded="xl"
                      >
                        <v-card-title>
                          Buscar
                        </v-card-title>
                        <v-card-text>
                          <v-row justify="center">
                            <v-icon size="100" color="white">
                              search
                            </v-icon>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card
              elevation="24"
            >
              <v-card-text>
                <v-row>
                  <v-col v-if="form" cols="4">
                    <v-flex>
                      <v-card>
                        <v-card-title>
                          Adicionar Equipamento
                        </v-card-title>
                        <v-card-text>
                          <v-form ref="form">
                            <v-text-field
                              v-model="equip.equipmarca"
                              dense
                              label="Marca"
                            />
                            <v-text-field
                              v-model="equip.equipmac"
                              dense
                              label="Endereço MAC"
                            />
                            <v-text-field
                              v-model="equip.equipgpon"
                              dense
                              label="Serial GPON"
                            />
                            <v-text-field
                              v-model="equip.equipsenha"
                              dense
                              label="Senha"
                            />
                            <v-text-field
                              v-model="equip.equippatrimonio"
                              dense
                              label="Nº Patrimônio"
                            />
                            <v-btn
                              color="primary"
                              dense
                              @click.prevent="salvar"
                            >
                              Salvar
                            </v-btn>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>

                  <v-col cols="2">
                    <v-flex>
                      <v-card
                        width="200"
                        color="blue"
                        rounded="xl"
                      >
                        <v-card-title>
                          Buscar
                        </v-card-title>
                        <v-card-subtitle>
                          Buscar Equipamento
                        </v-card-subtitle>
                        <v-card-text>
                          <v-row justify="center">
                            <v-icon size="100" color="white">
                              search
                            </v-icon>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { URI_BASE_API, API_VERSION } from '@/config/config'

export default {
  name: 'EquipamentoIndex',

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Equipamentos',
        disabled: true
      }
    ],
    form: false,
    model: '',
    equip: {
      equippatrimonio: '',
      equipnome: '',
      equipmarca: '',
      equipmac: '',
      equipgpon: '',
      equipsenha: '',
      equipstatus: ''
    }
  }),

  created () {
  },

  methods: {
    adicionar () {
      if (this.form === false) {
        this.form = true
      } else {
        this.form = false
      }
    },

    salvar () {

    }
  }

}
</script>
