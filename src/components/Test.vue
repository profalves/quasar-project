<template>
<div>{{objectStore}}</div>
</template>

<script>
import localforage from 'localforage'

export default {
  
  methods: {
      
    openDB(){
        this.objectStore = localforage.supports(localforage.INDEXEDDB)
        let set = localforage.setDriver(localforage.INDEXEDDB)
        console.log('set', set);
        
        localforage.setItem('Pessoas', 'store value').then(function (value) {
            // Do other things once the value has been saved.
            console.log(value);
        }).catch(function(err) {
            // This code runs if there were any errors
            console.info(err);
        });
        

    },
    verificarSuporte(){
        var c = ( window.webkitNotifications !== undefined );
        console.log('c', c);
        if (!c){
            alert("Seu navegador não suporta notificações desktop. Por favor, use o Google Chrome!");
        }
        alert(c)
        return c
    },
    verificarPermissao(){
        if ( !this.verificarSuporte() ) return;

        switch ( window.webkitNotifications )
        {
            case 0: // PERMITIDO
            alert( "Permitido" );
            break;

            case 1: // NÃO PERMITIDO
            alert("Não permitido");
            break;

            case 2: // PERMISSÃO NEGADA
            alert( "Permissão negada" );
            break;
        }
    }
  },
  data() {
     return {
       objectStore: '',    
     }
  },
  mounted(){
    this.openDB()
    this.verificarPermissao()
  }
}
</script>

