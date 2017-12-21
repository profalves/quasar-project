<template>
<q-layout 
     id="header-nav" 
     ref="layout"
     view="lHh Lpr fff"
     :left-class="{'bg-grey-2': true}"
     >
    <q-toolbar slot="header" color="dark" class="glossy">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Retaguarda Web
        <div slot="subtitle">7Virtual</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        
        <q-item>
          <q-item-side icon="people" />
          <q-side-link to="/">
              <q-item-main label="Pessoas" sublabel="Cadastros de clientes, fornecedores, etc." />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="assignment_turned_in" />
          <q-item-main label="Produtos" sublabel="Cadastros de Produtos" />
        </q-item>
        <q-item>
          <q-item-side icon="account_balance_wallet" />
          <q-item-main label="Contas" sublabel="Cadastros Financeiros" />
        </q-item>
        <q-item>
          <q-item-side icon="insert_drive_file" />
          <q-item-main label="Entradas de NFe" sublabel="Cadastros de Notas Fiscais de Compras" />
        </q-item>
        <q-item>
          <q-item-side icon="dashboard" />
          <q-item-main label="Relatórios" sublabel="Relatórios Gerais" />
        </q-item>
        <q-item>
          <q-item-side icon="person" />
          <q-item-main label="Usuários" sublabel="Cadastros de Usuários, Alteração de Senhas, etc." />
        </q-item>
        <q-item>
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Sair" />
        </q-item>
        
      </q-list>
    </div>
    <!-- 
      use @click="launch('http://forum.quasar-framework.org')" para acessar link externos
    -->
</q-layout>
</template>

<script>
import {
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  name: 'header-nav',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  },
  methods: {
    launch (url) {
      openURL(url)
    }
  }
}
</script>