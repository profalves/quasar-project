<template>
  <div>
     <div id="pdf">
         <q-btn icon="create" 
                big 
                color="primary"
                @click="pdf"
                >New PDF</q-btn>
         <br><br>
         <q-btn icon="create" 
                big 
                color="primary"
                @click="table"
                >Table PDF</q-btn>
         <br><br>
         <q-btn icon="create" 
                big 
                color="primary"
                @click="html"
                >html PDF</q-btn>
         <br><br>
     
     </div>
     <hr>
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
            @click="launch('https://api.whatsapp.com/send?&text=test')"
            >WhatsApp All</q-btn>
     <br>Enviar para todos uma mensagem<br>
     
        <table class="q-table" :class="computedClasses" style="margin-top: 50px">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-right">Price</th>
              <th class="text-right">In Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Item #1</td>
              <td class="text-right">$10.11</td>
              <td class="text-right">101</td>
            </tr>
            <tr>
              <td class="text-left">Item #2</td>
              <td class="text-right">$8.88</td>
              <td class="text-right">34</td>
            </tr>
            <tr>
              <td class="text-left">Item #3</td>
              <td class="text-right">$0.15</td>
              <td class="text-right">1670</td>
            </tr>
          </tbody>
        </table> 
      
  </div>
</template>

<script>
import JsPDF from 'jspdf'
//import autoTable from 'jspdf-autotable/jspdf.plugin.autotable'
import table from 'data/table.json'
//import axios from 'axios'
import { openURL } from 'quasar'
const $ = require("jquery");
    
const doc = new JsPDF()
require('jspdf-autotable');

export default {
  data () {
    return {
        table,
        misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
        separator: 'cell', // none, horizontal, vertical, cell
        stripe: 'odd', // none, odd, even
        type: 'none', // flipped, responsive
        gutter: 'none', // compact, loose
    }
  },
  computed: {
    computedClasses(){
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    },
  },
  methods: {
    launch (url) {
      openURL(url)
    },
    pdf(){
        doc.text(10, 10, 'This is a test')
        //doc.autoPrint() //aciona a impressão automática do documento
        doc.save('autoprint.pdf')
    },
    table(){
        var elem = document.getElementById('table');
        var data = doc.autoTableHtmlToJson(elem);

        var opts = {}; 
        doc.autoTable(data.columns, data.rows, opts);

        doc.save("table.pdf");
    },
    html(){
        var specialElementHandlers={
            '#editor':function(element,renderer){
                return true;
            },
            '.controls':function(element,renderer){
                return true;
            }
        };
        
        doc.fromHTML($('table.q-table').get(0),10,10,{
            'width':500,
            'elementHandlers':specialElementHandlers
        });
        doc.save('html.pdf');
    }
  }
}
</script>

<style>
</style>
