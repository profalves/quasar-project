<template>
<div id="home">
    
  <div class="row">
      
    <div class="col-6">
        <router-link to="/clientes">
            <q-card color="primary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-user fa-5x center"></i><br>
                    <p>Pessoas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col-6">
        <router-link to="/produtos">
            <q-card color="secondary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-shopping-basket fa-5x center"></i><br>
                    <p>Produtos</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    

    
    <div class="col-6">
        <router-link to="/contas">
            <q-card color="warning" class="col-sm-6">
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
    
    <div class="col-6">
        <router-link to="/entradanfe">
            <q-card color="info" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-file-text-o fa-5x center"></i><br>
                    <p>Notas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col">
        <router-link to="/relatorios">
            <q-card color="positive" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-line-chart fa-5x center"></i><br>
                    <p>Relatórios</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col">
        <router-link to="/usuarios">
            <q-card color="tertiary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-users fa-5x center"></i><br>
                    <p>Usuários</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    </div>  
</div>
    
</template>

<script>

export default {
  name: 'principal',
  data () {
    return {
    }
  },
}
</script>

<style>
    .card {
        margin: 0 10px;
    }
    
</style>

