<template>
<div id="realtorios">
    <div class="row">
      
    <div class="col-6" v-if="permissoes.acessaFinanceiro || permissoes.verQuantiaCaixa">
        <router-link to="/relcaixa">
            <q-card color="positive" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-usd fa-5x center"></i><br>
                    <p>Caixas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col-6">
        <router-link to="/relVendas">
            <q-card color="primary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-shopping-basket fa-5x center"></i><br>
                    <p>Vendas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    

    
    <div class="col-12" v-if="permissoes.acessaFinanceiro">
        <router-link to="/relatoriomov">
            <q-card color="info" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-file-text-o fa-5x center"></i><br>
                    <p>Movimentações</p>
                </center>
              </q-card-main>
            </q-card>
        </router-link>
    </div>    
    
    <div class="col-6" v-if="permissoes.acessaFinanceiro">
        <router-link to="/relatoriocontas">
            <q-card color="tertiary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-money fa-5x center"></i><br>
                    <p>Contas</p>
                </center>
              </q-card-main>
            </q-card>
        </router-link>
    </div>    
    
    <div class="col" v-if="permissoes.acessaFinanceiro || permissoes.verQuantiaCaixa">
        <router-link to="/relatoriolucro">
            <q-card color="secondary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-line-chart fa-5x center"></i><br>
                    <p>Lucro</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col" v-if="permissoes.acessaFinanceiro">
        <router-link to="/relFormas">
            <q-card color="warning" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-credit-card fa-5x center"></i><br>
                    <p>Forma de Pagto</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    </div>  
</div>
    
</template>

<script>
import localforage from 'localforage'
export default {
  name: 'relatorios',
  data () {
    return {
        permissoes: {},
    }
  },
  methods: {
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
    }
  },
  mounted(){
    this.obterPermissoes()
  }
}
</script>
