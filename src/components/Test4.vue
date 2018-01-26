<template>
  <div>
    <loading-screen ref="loadingScreen">
    <div class="page-header">
      <h1>People</h1>
    </div>
    
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obj in objects">
            <td>{{obj.id}}</td>
            <td>{{obj.name}}</td>
          </tr>
        </tbody>
      </table>
    </loading-screen>
  </div>
</template>
 
<script>
import axios from 'axios'
import LoadingScreen from 'vue-loading-screen';
    
const ENDPOINT = 'http://www.companymega.com.br/api/'
const headers = {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
}
 
export default {
  components: {
    LoadingScreen,
  },
  data() {
    return {
      objects: [],
    };
  },
  methods: {
    obterCores(){
      fetch(ENDPOINT + 'tipos/obterCores', {
        //method: 'get', // opcional
        headers: headers
         
      })
      .then((response) => {
        response.text()
        response.json()
        console.log(response)
      })
      .catch((err) => { 
        console.error(err); 
      });
    },
    obterCores2(){
      axios.get(ENDPOINT + 'tipos/obterCores')
      .then((response) => {
        //response.text()
        //response.json()
        console.log(response)
      })
      .catch((err) => { 
        console.error(err); 
      });
    },
    salvarCarro(){
        axios({
          headers: headers,
          method: 'POST',
          url: ENDPOINT + 'carros/insert',
          data: {
                    Modelo: 'Corsa',
                    IdPessoaDono: 1,
                    IdCor: 3,
                    IdMarca: 1,
                    QtdPortas: 4,
                    KM: 0,
                    Ano: '',
                    IdTipoCombustivel: 1,
                    IdTipoDirecao: 2,
                    Vidro: true,
                    Ar: true,
                    valorCusto: 1.00,
                    ValorVenda: 30000.00,
                    IdUsuario: 1,
                    Excluido: false,
                }
        })
        .then((response) => {
            console.log(response)
            this.showModalNew = false
        })
        .catch((err) => {
            this.showModalNew = false
            console.error(err);
        });
    },
    refresh() {
      const p = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
      });
 
      this.$refs.loadingScreen.load(p);
 
      p.then(() => {
        this.objects = [
          { id: 1, name: 'Foo' },
          { id: 2, name: 'Bar' },
        ];
      });
    },
  },
  mounted(){
    this.salvarCarro()  
    this.obterCores2()  
  },
  created() {
    this.$nextTick(() => {
      this.refresh();
    });
  },
};
</script> 