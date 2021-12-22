
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
        {
          title: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard',
          items: [
            { title: 'Dashboard', to: '/dashboard', permissao: '' }
          ],
          permissao: ''
        },
        {
          title: 'Atividades',
          icon: 'dashboard',
          to: '/atividades',
          items: [
            { title: 'Listar Atividades', to: '/atividades', permissao: '' }
          ],
          permissao: ''
        },
        {
          title: 'Empresas',
          icon: 'store',
          to: '/empresas',
          items: [
            { title: 'Listrar Empresas', to: '/empresas', permissao: 'admin' },
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
          items: [
            { title: 'Listrar Serviços', to: '/servicos', permissao: 'servicos' }
          ],
          permissao: 'servicos'
        }
      ],
      itemsMenuLateral: [
        {
          title: 'Instalações',
          icon: 'dashboard',
          items: [
            { title: 'Gerar Boleto', to: '/servicos/instalacoes/gerarboletos', permissao: 'admin' }
          ],
          permissao: 'admin'
        },
        {
          title: 'Projetos FTTH',
          icon: 'build',
          permissao: 'admin',
          items: [
            { title: 'Ocupação', to: '/projetos/ocupacao', permissao: 'admin' }
            // { title: 'Listrar Caixas', to: '/caixas', permissao: 'admin' }
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
