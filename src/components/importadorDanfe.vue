<template>
<div id="importarDanfe">
    <div class="row topo" style="margin-bottom:20px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
      >
        <i class="material-icons">arrow_back</i>
        Voltar
      </q-btn>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="assignment_turned_in"
          >
            <q-input v-model.number="doc"
                     type="number"
                     float-label="Chave de Acesso" 
                     clearable
            />
            
          </q-field>   
        </div>
    </div>
    
    <div class="row" style="margin-left:45px">
      <q-btn
        color="primary"
        push
        @click="visualizarDanfe"
      >
        <i class="material-icons">cloud_download</i>
        Visualizar
      </q-btn>
      
      <q-btn
        style="margin-left:15px"
        color="primary"
        push
        @click="importarDanfe"
        :disabled="bloqueado"
      >
        <i class="material-icons">cloud_download</i>
        Importar
      </q-btn>
    </div><br>
    
    {{danfe}}

</div>
    
</template>

<script>
    
import { Toast } from 'quasar'

export default {
  name: 'principal',
  data () {
     return {
        doc: '',
        bloqueado: true,
        danfe: '',
        canGoBack: window.history.length > 1
     }
  },
  methods: {
     goBack(){
      window.history.go(-1)
     },
     visualizarDanfe() {
      if(this.doc!==''){
        this.bloqueado = false
        this.danfe = 'Visualização da Danfe aqui'
      }
      else {
        this.danfe = 'Primeiro coloque a chave de acesso!'
      }
     },
     importarDanfe() {
        Toast.create.positive({
        html: 'Nota importada com sucesso',
        icon: 'done' 
        })
     },
  }
}
</script>

<style>
    .card {
        margin: 0 10px;
    }
    
</style>

