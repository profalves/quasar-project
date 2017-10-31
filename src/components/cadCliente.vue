<template>
<div id="clientes">
    <h5>Cadastro de Pessoa</h5>
    
    <div class="row" style="margin-bottom:20px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
        icon="keyboard_arrow_left"
      >
      </q-btn>
      
      <q-btn
        color="negative"
        push big
        @click=""
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <q-btn
        style="background: white; 
               color: black"
        push
        @click="limpar"  
      >
        limpar
      </q-btn>
      
      <q-btn
        style="background: white; 
               color: black"
        push big
        @click=""
        
      >
        <i class="material-icons">edit</i>
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click=""
        
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    <div class="row">
        <q-field
            label="Tipo"
          >
            <q-select
                v-model="tipo"
                :options="tipos"
            />
        </q-field>   
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="person"
          >
            <q-input v-model="nome" float-label="Nome" clearable />
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="confirmation_number"
          >
            <q-input v-model="cpf" float-label="CPF/CNPJ" clearable />
          </q-field>   
        </div>
        <div class="col-md-6">
          <q-field
            icon="phone"
          >
            <q-input v-model="fone" float-label="Telefone" clearable />
          </q-field>   
        </div>
    </div>  
    
    <div class="row">
        <div class="col">
          <q-field
            icon="email"
            helper="Digite um email válido"
          >
            <q-input 
                 v-model="email" 
                 type="email" 
                 float-label="Email" suffix="@email.com"/>
          </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col-8 col-md-6">
          <q-field
            icon="markunread_mailbox"
            helper="Clique no botão ao lado para pesquisar o CEP"
          >
            <q-input v-model="cep" float-label="CEP" @blur="buscarCep"/>
          </q-field>   
        </div>
        <div class="col">
          <q-btn 
             icon="search" 
             color="primary"  
             round
             @click="buscarCep"
          >
          </q-btn>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="location_on"
          >
            <q-input v-model="end" float-label="Endereço"/>
          </q-field>   
        </div>
        <div class="col-lg-2 col-md-3 col-sm-12">
          <q-field
            icon="location_on"
            helper="Digite o número"
          >
            <q-input v-model="numLogradouro" type="number" float-label="Numero"/>
          </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="streetview"
          >
            <q-input v-model="bairro" float-label="Bairro"/>
          </q-field>   
        </div>
        
    </div>
    <div class="row">
        <div class="col-md-4">
          <q-field
            icon="star"
          >
            <q-select
                float-label="Estado"
                filter
                v-model="estado"
                :options="estados"
                @blur="listarCidades"
            />
          </q-field>   
        </div>
        <div class="col-md-8">
          <q-field
            icon="location_city"
          >
           <q-select
                float-label="Cidade"
                filter
                v-model="cidade"
                :options="cidades"
                @blur="listarCidades"
            />
          </q-field>   
        </div>
        
    </div>
    
    <!-- botões inferiores -->
    <div class="row" style="margin-top:40px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
        icon="keyboard_arrow_left"
      >
      </q-btn>
      
      <q-btn
        color="negative"
        push big
        @click=""
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <q-btn
        style="background: white; 
               color: black"
        push
        @click="limpar"  
      >
        limpar
      </q-btn>
      
      <q-btn
        style="background: white; 
               color: black"
        push big
        @click=""
        
      >
        <i class="material-icons">edit</i>
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click=""
        
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    <br>
    <div class="demo">
        <div class="mdl-selectfield">
            <label>Standard Select</label>
            <select class="browser-default">
              <option value="" disabled selected>Escolha uma cidade</option>
              <option v-for="cidade in cidades" >{{cidade.nome}}</option>

            </select>


        </div>  
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
//import {estados} from 'data/estados.json'
export default {
  name: 'clientes',
  data () {
    return {
        //estados
        nome: '',
        cpf: '',
        fone: '',
        email: '',
        cep: '',
        end: '',
        bairro: '',
        cidade: '',
        estado: '',
        numLogradouro: '',
        tipo: '',
        tipos: [
            {
              label: 'Cliente',
              value: 'c'
            },
            {
              label: 'Fornecedor',
              value: 'f'
            },
            
        ],
        estados: [
            {
              label: 'AC - Acre',
              value: 'ac'
            },
            {
              label: 'AL - Alagoas',
              value: 'al'
            },
            {
              label: 'AM - Amazonas',
              value: 'am'
            },
            {
              label: 'AP - Amapá',
              value: 'ap'
            },
            {
              label: 'BA - Bahia',
              value: 'ba'
            },
            {
              label: 'CE - Ceará',
              value: 'ce'
            },
            {
              label: 'DF - Distrito Federal',
              value: 'df'
            },
            {
              label: 'ES - Espírito Santo',
              value: 'es'
            },
            {
              label: 'GO - Goiás',
              value: 'go'
            },
            {
              label: 'MA - Maranhão',
              value: 'ma'
            },
            {
              label: 'MG - Minas Gerais',
              value: 'go'
            },
            {
              label: 'MS - Mato Grosso do Sul',
              value: 'mt'
            },
            {
              label: 'MT - Mato Grosso',
              value: 'mt'
            },
            {
              label: 'PA - Pará',
              value: 'pa'
            },
            {
              label: 'PB - Paraíba',
              value: 'pb'
            },
            {
              label: 'PE - Pernambuco',
              value: 'pe'
            },
            {
              label: 'PI - Piauí',
              value: 'pi'
            },
            {
              label: 'PR - Paraná',
              value: 'pr'
            },
            {
              label: 'RJ - Rio de Janeiro',
              value: 'rj'
            },
            {
              label: 'RN - Rio Grande do Norte',
              value: 'rn'
            },
            {
              label: 'RS - Rio Grande do Sul',
              value: 'rs'
            },
            {
              label: 'RO - Rondônia',
              value: 'ro'
            },
            {
              label: 'RR - Roraima',
              value: 'rr'
            },
            {
              label: 'SC - Santa Catarina',
              value: 'sc'
            },
            {
              label: 'SP - São Paulo',
              value: 'sp'
            },
            {
              label: 'SE - Sergipe',
              value: 'se'
            },
            {
              label: 'TO - Tocantins',
              value: 'to'
            },    
        ],
        cidades: [],
        canGoBack: window.history.length > 1,
        getCep: []
    }
  },
  
  methods: {
    buscarCep(){
      axios.get('http://api.postmon.com.br/v1/cep/' + this.cep)
      .then((res)=>{
          this.getCep = res.data
          console.log(res.data)
          this.end = this.getCep.logradouro
          this.bairro = this.getCep.bairro
          this.cep = this.getCep.cep
          this.cidade = this.getCep.cidade
          this.estado = this.getCep.estado.toLowerCase()
      })
      .catch(e => {
          console.log(e.data)
      })
    
      
    },
    goBack(){
      window.history.go(-1)
    },
    limpar () {
      this.nome = ''
      this.cpf = ''
      this.fone = ''
      this.email = ''
      this.cep = ''
      this.end = ''
      this.bairro = ''
      this.cidade = ''
      this.estado = ''
      this.numLogradouro = '' 
    },
    listarCidades(){
      axios.get('http://192.168.0.200/celular/api/cidades/consulta?uf=' + this.estado)
      .then((res)=>{
        this.cidades = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
/* ==========  Select Field Variables ========== */
$color-black: "0,0,0";
$select-background-color: transparent;
$select-border-color: unquote("rgba(#{$color-black}, 0.12)") !default;
$select-font-size: 16px;
$select-color: unquote("rgba(#{$color-black}, 0.26)") !default;
$select-padding: 4px;

/* ==========  Select Field ========== */    

select {
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: $select-padding 0;
  font-size: $select-font-size;
  color: $select-color;
  border: none;
  border-bottom: 1px solid $select-border-color;
}

/* Remove focus */
select:focus {
  outline: none}

/* Hide label */
.mdl-selectfield label {display: none;}
/* Use custom arrow */
.mdl-selectfield select {appearance: none}
.mdl-selectfield {
  font-family: 'Roboto','Helvetica','Arial',sans-serif;
  position: relative;
    &:after {
        position: absolute;
        top: 0.75em;
        right: 0.5em;
        /* Styling the down arrow */
        width: 0;
        height: 0;
        padding: 0;
        content: '';
        border-left: .25em solid transparent;
        border-right: .25em solid transparent;
        border-top: .375em solid $select-border-color;
        pointer-events: none;
    }
}

/* ==========  Demo CSS ========== */
body {
  padding: 20px;
  background: #fafafa;
  font-family: 'Roboto','Helvetica','Arial',sans-serif;
}


    
</style>