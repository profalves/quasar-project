<template>
    <div>
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item>
          <q-item-side icon="flag" />
          <q-side-link to="/" class="link">
              Inicio
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="people" />
          <q-side-link to="/clientes" class="link">
              <q-item-main label="Pessoas" sublabel="Cadastros de clientes, fornecedores, etc." />
          </q-side-link>
        </q-item>
        <q-collapsible icon="assignment_turned_in" label="Produtos" sublabel="Opções de Produtos">
          <q-list highlight no-border>
            <q-item>
              <q-side-link to="/produtos">
                <q-item-main label="Lista de Produtos" sublabel="Listagem e Cadastro de Produtos" />
              </q-side-link>
            </q-item>
            <q-item>
              <q-side-link to="/transFiliais" >
                <q-item-main label="Transferencias" sublabel="Transferencias entre filiais" />
              </q-side-link>
            </q-item>
            <q-item>
              <q-side-link to="/tabprecos" >
                <q-item-main label="Tabelas de Peços" sublabel="Cadastrar tabelas de Preços" />
              </q-side-link>   
            </q-item>
          </q-list>  
        </q-collapsible>
        
        <q-item>
          <q-item-side icon="account_balance_wallet"/>
          <q-side-link to="/contas" class="link">
               <q-item-main label="Contas" sublabel="Cadastros Financeiros" />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="insert_drive_file" />
          <q-side-link to="/cadnotas?q=save" class="link">
               <q-item-main label="Entradas de Notas" sublabel="Cadastros de NFe de Compras" />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="insert_chart" />
          <q-side-link to="/relatorios" class="link">
                <q-item-main label="Relatórios" sublabel="Relatórios Gerais" />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="person" />
          <q-side-link to="/usuarios" class="link">
                <q-item-main label="Usuários" sublabel="Cadastros de Usuários, Alteração de Senhas, etc." />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="settings" />
          <q-side-link to="/config" class="link">
                <q-item-main label="Configurações" sublabel="Configurações Gerais" />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="exit_to_app" />
          <q-side-link to="/login" class="link">
                <q-item-main label="Sair" />
          </q-side-link>
        </q-item>  
        
        <!-- 
        <q-item>
          <q-side-link to="/">Início</q-side-link>
        </q-item>
        <q-item>
          <q-side-link to="/repos">Ver Repositórios</q-side-link>
        </q-item>
         
        <q-item @click="launch('https://github.com/profalves')">
          
          <q-item-side class="fa fa-github fa-2x"/>
          <q-item-main label="Acessar o Github" sublabel="quasar-framework.org" />
        </q-item>-->
        
        
      </q-list>  
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods:{
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadContas')
    },
    verificarUser(){
        if(!localStorage.getItem('codUser')){
          this.$router.push('/login')
        }
    },
  },
  created(){
    let t = this
    t.verificarUser()
  }
}
</script>
<style scoped>
    .link{
        margin-left: 10px
    }
</style>
