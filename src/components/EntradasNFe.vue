<template>
<div id="nfe">
    <div style="margin-top:40%"></div>
    <div class="row">
      
        <div class="col-6">
            <router-link to="/importadorDanfe">
                <q-card color="primary" class="col-sm-6">
                  <q-card-title></q-card-title>
                  <q-card-main>
                    <center id="card">
                        <i class="material-icons fa-5x">cloud_download</i>
                        <p>Importador de DANFE</p>
                    </center>
                  </q-card-main>
                </q-card>

            </router-link>
        </div>    

        <div class="col-6">
            <router-link to="/cadNotas">
                <q-card color="secondary" class="col-sm-6">
                  <q-card-title></q-card-title>
                  <q-card-main>
                    <center id="card">
                        <i class="material-icons fa-5x">insert_drive_file</i>
                        <p style="padding:1px;">Entrada Manual</p>
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
  components: {
  }
}
</script>

<style>
    
</style>