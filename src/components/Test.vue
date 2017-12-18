<template>
  <div>
     
     <q-btn icon="create" 
            big 
            color="primary"
            @click="table"
            >New PDF</q-btn>
     <br><br>
     <q-btn icon="create" 
            big 
            color="primary"
            @click="table"
            >Table PDF</q-btn>
     <br><br>
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?phone=5575991731593')"
            >WhatsApp</q-btn>
     <br>Enviar para o numero especifico para digitar uma mensagem<br>
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?phone=5575991731593&text=I Love You')"
            >WhatsApp</q-btn>
     <br>Enviar para o numero especifico uma mensagem pronta<br>
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?&text=I Love You')"
            >WhatsApp All</q-btn>
     <br>Enviar para todos uma mensagem<br>
     
      
      
  </div>
</template>

<script>
import JsPDF from 'jspdf'
import table from 'data/table.json'
//import axios from 'axios'
import { openURL } from 'quasar'
export default {
  data () {
    return {
        table
    }
  },
  methods: {
    launch (url) {
      openURL(url)
    },
    pdf(){
        var doc = new JsPDF()

        doc.text('Hello world!', 10, 10)
        doc.save('a4.pdf')
    },
    table(){
      var columns = ["ID", "Text", "Today"];
      var rows = this.table.map(function(data){
          return [data.mass, data.name, data.created];
      });
      
      var doc = new JsPDF('p', 'pt');
      doc.autoTable(columns, rows);
      doc.save('table.pdf');
    },
  }
}
</script>

<style>
</style>
