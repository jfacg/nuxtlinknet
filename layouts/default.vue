
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-group
          v-for="item in itemsMenu"
          v-show="verificarPermissao(item.permissao)"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            v-show="verificarPermissao(child.permissao)"
            :key="child.title"
            dense
            :to="child.to"
            router
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="sair"
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-toolbar-title>{{ autenticado.nick_name }} - {{ autenticado.empresa ? autenticado.empresa.nome : '' }} </v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in itemsMenuLateral"
          v-show="verificarPermissao(item.permissao)"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            v-show="verificarPermissao(child.permissao)"
            :key="child.title"
            dense
            :to="child.to"
            router
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { TOKEN_NAME } from '@/config/config'
export default {
  name: 'Default',
  middleware: ['auth'],
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsMenu: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/',
        //   permissao: '',
        //   items: []
        // },
        // {
        //   title: 'Bet',
        //   icon: 'store',
        //   to: '/bets',
        //   items: [
        //     { title: 'Listar Dicas', to: '/bets', permissao: 'admin' },
        //     { title: 'Consutar', to: '/bets/consultas', permissao: 'admin' },
        //     { title: 'Importar jogos', to: '/bets/importar', permissao: 'admin' },
        //     { title: 'Historico', to: '/bets/historico', permissao: 'admin' },
        //     { title: 'AMBAS 0-0', to: '/bets/ambas/00isolado25', permissao: 'admin' },
        //     { title: 'AMBAS 1-0', to: '/bets/ambas/10isolado25', permissao: 'admin' },
        //     { title: 'AMBAS 2-0', to: '/bets/ambas/20isolado25', permissao: 'admin' },
        //     { title: 'OVER 0-0', to: '/bets/over/00isolado25', permissao: 'admin' },
        //     { title: 'OVER 1-0', to: '/bets/over/10isolado25', permissao: 'admin' },
        //     { title: 'OVER 2-0', to: '/bets/over/20isolado25', permissao: 'admin' }
        //   ],
        //   permissao: 'admin'
        // },
        {
          title: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard',
          items: [
            { title: 'Dashboard', to: '/dashboard', permissao: 'dashboard' }
          ],
          permissao: 'dashboard'
        },
        {
          title: 'Atividades',
          icon: 'dashboard',
          to: '/atividades',
          items: [
            { title: 'Listar Atividades', to: '/atividades', permissao: 'atividades' }
          ],
          permissao: 'atividades'
        },
        {
          title: 'Empresas',
          icon: 'store',
          to: '/empresas',
          items: [
            { title: 'Listar Empresas', to: '/empresas', permissao: 'admin' },
            { title: 'Criar Empresa', to: '/empresas/criar', permissao: 'admin' }
          ],
          permissao: 'admin'
        },
        {
          title: 'Usuários',
          icon: 'person',
          to: '/usuarios',
          items: [
            { title: 'Listrar Usuários', to: '/usuarios', permissao: 'admin' }
          ],
          permissao: 'admin'
        },
        {
          title: 'Função',
          icon: 'work',
          to: '/funcoes',
          items: [
            { title: 'Listrar Funções', to: '/funcoes', permissao: 'admin' }
          ],
          permissao: 'admin'
        },
        {
          title: 'Permissões',
          icon: 'lock',
          to: '/permissoes',
          items: [
            { title: 'Listrar Permisões', to: '/permissoes', permissao: 'admin' }

          ],
          permissao: 'admin'
        },
        {
          title: 'Tipos',
          icon: 'lock',
          to: '/tipos',
          items: [
            { title: 'Listrar Tipos', to: '/tipos', permissao: 'admin' },
            { title: 'Criar Tipos', to: '/tipos/criar', permissao: 'admin' }

          ],
          permissao: 'admin'
        },
        {
          title: 'Maquinas',
          icon: 'lock',
          to: '/maquinas',
          items: [
            { title: 'Listrar Maquinas', to: '/maquinas', permissao: 'maquinas' },
            { title: 'Criar Maquinas', to: '/maquinas/criar', permissao: 'admin' }

          ],
          permissao: 'maquinas'
        },
        {
          title: 'Clientes',
          icon: 'group',
          to: '/clientes',
          items: [
            { title: 'Listrar Clientes', to: '/clientes', permissao: 'clientes' }
          ],
          permissao: 'clientes'
        },
        {
          title: 'Cobranças',
          icon: 'payment',
          to: '/cobrancas',
          items: [
            { title: 'Listrar Cobranças', to: '/cobrancas', permissao: 'cobrancas' }
          ],
          permissao: 'cobrancas'
        },
        {
          title: 'Projetos FTTH',
          icon: 'build',
          permissao: 'projetos',
          items: [
            { title: 'Listrar Projetos', to: '/projetos', permissao: 'projetos' },
            { title: 'Listrar Caixas', to: '/caixas', permissao: 'projetos' }
          ]
        },
        {
          title: 'Serviços',
          icon: 'settings',
          to: '/servicos',
          permissao: 'servicos',
          items: [
            { title: 'Listrar Serviços', to: '/servicos', permissao: 'servicos' },
            { title: 'Serviços Executados', to: '/servicos/status/executados', permissao: 'servicos' }
          ]
        },
        {
          title: 'Vendas',
          icon: 'settings',
          to: '/vendas',
          permissao: 'vendas',
          items: [
            { title: 'Listrar Vendas', to: '/vendas', permissao: 'vendas' }
            // { title: 'Serviços Executados', to: '/servicos/status/executados', permissao: 'servicos' }
          ]
        },
        {
          title: 'TV',
          icon: 'live_tv',
          to: '/watches',
          permissao: 'watch',
          items: [
            { title: 'Listrar Contas', to: '/watches', permissao: 'watch' }
            // { title: 'Serviços Executados', to: '/servicos/status/executados', permissao: 'servicos' }
          ]
        }
      ],
      itemsMenuLateral: [
        {
          title: 'Gerenciar',
          icon: 'dashboard',
          items: [
            { title: 'Gerar Boleto', to: '/servicos/gerencia/gerarboletos', permissao: 'admin' }
          ],
          permissao: 'admin'
        },
        {
          title: 'Controle',
          icon: 'dashboard',
          items: [
            { title: 'Equipamentos', to: '/controle/equipamentos', permissao: 'controle' }
          ],
          permissao: 'controle'
        },
        {
          title: 'Qualidade',
          icon: 'dashboard',
          items: [
            { title: 'Instalações', to: '/qualidade/instalacoes', permissao: 'qualidadeInstalacoes' },
            { title: 'Resultados', to: '/qualidade/resultados/instalacoes', permissao: 'admin' }
          ],
          permissao: 'qualidade'
        },
        {
          title: 'Projetos FTTH',
          icon: 'build',
          permissao: 'admin',
          items: [
            { title: 'Ocupação', to: '/projetos/ocupacao', permissao: 'admin' }
          ]
        },
        {
          title: 'Watch',
          icon: 'live_tv',
          permissao: 'admin',
          items: [
            { title: 'Gerenciar', to: '/watches/gerencia', permissao: 'admin' }
          ]
        },
        {
          title: 'Monitor',
          icon: 'live_tv',
          permissao: 'admin',
          items: [
            { title: 'Logins', to: '/monitor/logins', permissao: 'monitor' }
          ]
        }

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      show: false,
      autenticado: {},
      permissoes: []
    }
  },
  async fetch () {
    await this.$store.dispatch('auth/autenticado')
  },

  computed: {
    atualizarAutenticado () {
      // eslint-disable-next-line no-return-assign
      return this.autenticado = this.$store.getters['auth/usuarioAutenticado']
    }

  },

  mounted () {
    this.autenticado = this.$store.getters['auth/usuarioAutenticado']
  },

  methods: {

    sair () {
      this.$storage.removeUniversal(TOKEN_NAME)
      this.$store.commit('auth/set_autenticado', false)
      this.$router.push('/auth')
    },

    verificarPermissao (item) {
      const permissoes = []

      this.$store.getters['auth/usuarioAutenticado'].roles.forEach((funcao) => {
        funcao.permissions.forEach((permissao) => {
          permissoes.push(permissao)
        })
      })
      let result = false
      permissoes.forEach((permission) => {
        if (permission.name === item || item === '') {
          // console.log(true)
          result = true
          return result
        }
      })
      return result
    }

    // autenticado () {
    //   console.log(this.$store.getters['auth/usuarioAutenticado'])
    //   return this.$store.getters['auth/usuarioAutenticado'].name
    // }
  }
}
</script>
