
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
        <v-list-item
          v-for="(item, i) in items"
          v-show="verificarPermissao(item.permissao)"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
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
      <v-toolbar-title v-text="autenticado.name" />
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
      </v-list>
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
import { TOKEN_NAME } from '@/config/config'
export default {
  name: 'Default',
  middleware: ['auth'],
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
          permissao: ''
        },
        { title: 'Dashboard', icon: 'dashboard', permissao: '' },
        { title: 'Usuários', icon: 'person', to: '/usuarios', permissao: 'admin' },
        { title: 'Função', icon: 'work', to: '/funcoes', permissao: 'admin' },
        { title: 'Permissões', icon: 'lock', to: '/permissoes', permissao: 'admin' },
        { title: 'Clientes', icon: 'group', to: '/clientes', permissao: 'clientes' },
        { title: 'Projetos FTTH', to: '/projetos', icon: 'build', permissao: 'projetos' },
        { title: 'Serviços', icon: 'build', permissao: 'servicos' }
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

  mounted () {
    this.autenticado = this.$store.getters['auth/usuarioAutenticado']
    this.permissoes = this.autenticado.roles[0].permissions
  },

  methods: {
    sair () {
      this.$storage.removeUniversal(TOKEN_NAME)
      this.$store.commit('auth/set_autenticado', false)
      this.$router.push('/auth')
    },

    verificarPermissao (item) {
      // console.log(item)
      // console.log(this.permissoes)
      let result = false
      this.permissoes.forEach((permission) => {
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
