<template>
    <div class="scrollbar" id="sidenav">
      <div class="user">
        <img :src="image"
           class="avatar"
           @click="$router.push('config?configFoto=true')"
        ><br>
        {{user}} <br>
        {{emp}} <br>
      </div>
        
      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item to="/home">
          <q-item-side icon="flag" />
          <q-item-main label="Inicio" />
        </q-item>
        <q-collapsible icon="people" color="white" label="Pessoas" group="cad"><!-- sublabel="Listagem e Cadastro de clientes, fornecedores, etc.">-->
          <q-list highlight no-border>
            <q-item @click="novoCliente">
              <q-item-main label="Novo Cadastro" /><!-- sublabel="Criar e editar cadastro de Pessoas" />-->
            </q-item>
            <q-item>
              <q-side-link to="/clientes">
                <q-item-main label="Localizar Pessoas" /><!-- sublabel="Listagem e Busca de Pessoas" />-->
              </q-side-link>
            </q-item>
            <q-item>
              <q-side-link to="/promoClientes">
                <q-item-main label="Promoções para Clientes" /><!-- sublabel="Cadastro de Promoções de compras acima de um certo valor" />-->
              </q-side-link>
            </q-item>
            <q-item>
              <q-side-link to="/nivers">
                <q-item-main label="Aniversariantes" /><!-- sublabel="Lista de Aniversariantes e seus contatos por cada mês" />-->
              </q-side-link>
            </q-item>
            <!--<q-item>
              <q-side-link to="/">
                <q-item-main label="Whatsapp" sublabel="Mensagens para compartilhar em suas listas de transmissão" />
              </q-side-link>
            </q-item>-->
          </q-list>  
        </q-collapsible>
        <q-item to="/produtos" v-if="!permissoes.pdV_PermitirTransfProduto && !permissoes.ret_AlteraTabPreco">
          <q-item-side icon="assignment_turned_in" />
          <q-side-link to="/produtos" class="link">
              <q-item-main label="Produtos" /><!-- sublabel="Cadastros de clientes, fornecedores, etc." />-->
          </q-side-link>
        </q-item>
        <q-collapsible icon="assignment_turned_in" label="Produtos" v-if="permissoes.pdV_PermitirTransfProduto || permissoes.ret_AlteraTabPreco" group="cad">
          <q-list highlight no-border>
            <q-item>
              <q-side-link to="/produtos">
                <q-item-main label="Localizar Produtos" /><!-- sublabel="Listagem e Cadastro de Produtos" />-->
              </q-side-link>
            </q-item>
            <q-item v-if="permissoes.pdV_PermitirTransfProduto">
              <q-side-link to="/transFiliais">
                <q-item-main label="Transferencias" /><!-- sublabel="Transferencias entre filiais" />-->
              </q-side-link>
            </q-item>
            <q-item v-if="permissoes.ret_AlteraTabPreco">
              <q-side-link to="/tabprecos">
                <q-item-main label="Tabelas de Peços" /><!-- sublabel="Cadastrar tabelas de Preços" />-->
              </q-side-link>   
            </q-item>
          </q-list>  
        </q-collapsible>
        <q-item to="/contas" v-if="permissoes.acessaFinanceiro">
          <q-item-side icon="account_balance_wallet"/>
          <q-side-link to="/contas" class="link">
               <q-item-main label="Contas" /><!-- sublabel="Cadastros Financeiros" />-->
          </q-side-link>
          
        </q-item>
        <q-item to="/cadnotas?q=save">
          <q-item-side icon="insert_drive_file" />
          <q-side-link to="/cadnotas?q=save" class="link">
               <q-item-main label="Entrada de Notas" /><!-- sublabel="Cadastros de NFe de Compras" />-->
          </q-side-link>
        </q-item>
        <q-item to="/relatorios">
          <q-item-side icon="insert_chart" />
          <q-side-link to="/relatorios" class="link">
                <q-item-main label="Financeiro" /><!-- sublabel="Relatórios Gerais" />-->
          </q-side-link>
        </q-item>
        <q-item to="/usuarios" v-if="permissoes.cadUsuario">
          <q-item-side icon="person" />
          <q-side-link to="/usuarios" class="link">
                <q-item-main label="Usuários" /><!-- sublabel="Cadastros de Usuários, Alteração de Senhas, etc." />-->
          </q-side-link>
          
        </q-item>
        <q-item to="/config">
          <q-item-side icon="settings" />
          <q-side-link to="/config" class="link">
                <q-item-main label="Configurações" /><!-- sublabel="Configurações Gerais" />-->
          </q-side-link>
          
        </q-item>
        <q-item to="/suporte">
          <q-item-side icon="fa-life-ring" />
          <q-side-link to="/suporte" class="link">
                <q-item-main label="Suporte" /><!-- sublabel="Solicitar Ajuda do Suporte Remoto" />-->
          </q-side-link>
          
        </q-item>
        <q-item to="/login">
          <q-item-side icon="exit_to_app" />
          <q-side-link to="/login" class="link">
                <q-item-main label="Sair" />
          </q-side-link>
        </q-item>  
        <!--<q-item @click="sair">
          <q-item-side icon="exit_to_app" />
            <q-item-main label="Fechar" />
        </q-item>  
        -->
        <!-- 
         
        <q-item @click="launch('https://github.com/profalves')">
          
          <q-item-side class="fa fa-github fa-2x"/>
          <q-item-main label="Acessar o Github" sublabel="quasar-framework.org" />
        </q-item>
        
        -->
        
        
      </q-list>  
    </div>
</template>

<script>
import localforage from 'localforage'
  
export default {
  data () {
    return {
        user: localStorage.getItem('nameUser'),
        emp: localStorage.getItem('nomeEmpresa'),
        permissoes: '',
        image: localStorage.getItem('foto')
    }
  },
  methods:{
    verificarUser(){
        if(!localStorage.getItem('codUser')){
          this.$router.push('/login')
        }
    },
    obterPermissoes(){
        localforage.getItem('usuario').then((value) => {
            if(value){
                //console.log(value)
                this.permissoes = value
            }
            else{
                console.log(value)
            }

        }).catch((err) => {
            console.log(err)
            console.log('fail')
        })
    },
    novoCliente(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadcliente')
    },
    sair(){
        window.close()
    },
      
  },
  mounted(){
    let t = this
    t.verificarUser()
    t.obterPermissoes()
    //console.log('mounted')
  },
  beforeUpdate(){
      this.obterPermissoes()
      //console.log('beforeUpdate')
  },
  
  
}
</script>
<style scoped>
  .link{
    margin-left: 10px
  }
  .user{
    margin: 10px 15px 0;
    text-align: center;
  }
  img.avatar:hover{
    cursor: pointer;
    content: url(http://www.mysnappy.com.my/Content/img/Photo.png);
  }
  .scrollbar{
    float: left;
    height: 100vh;
    width: 100%;
    background: #F5F5F5;
    overflow-y: scroll;
  }
  #sidenav::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  #sidenav::-webkit-scrollbar{
    width: 10px;
    background-color: #F5F5F5;
  }
  #sidenav::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: darkgray;
  }
  
</style>
