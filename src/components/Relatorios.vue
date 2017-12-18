<template>
<div id="realtorios">
    <div class="row">
      
    <div class="col-6">
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
        <router-link to="/relatorios">
            <q-card color="primary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-shopping-basket fa-5x center"></i><br>
                    <p>Estoque</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    

    
    <div class="col-12">
        <router-link to="/relatorios">
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
    
    <div class="col-6">
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
    
    <div class="col">
        <router-link to="/relatorios">
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
    
    <div class="col">
        <router-link to="/relatorios">
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
export default {
  name: 'relatorios',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style>
    
</style>