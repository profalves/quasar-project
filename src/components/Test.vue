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
      
  </div>
</template>

<script>
import JsPDF from 'jspdf'
import table from 'data/table.json'
export default {
  data () {
    return {
        table
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>
</style>
