<template>
<div id="clientes">
    <h5>Cadastro de Pessoa</h5>
    <div style="margin-bottom:50px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
        icon="keyboard_arrow_left"
      >
        Voltar
      </q-btn>
      
      <q-btn
        color="primary"
        push
        @click=""
        
      >
        Excluir
      </q-btn>
        
      <q-btn
        color="primary"
        push
        @click=""
        
      >
        Editar
      </q-btn>
      
      <q-btn
        color="primary"
        push
        @click=""
        
      >
        Buscar
      </q-btn>
      
      <q-btn
        color="primary"
        push
        @click=""
        
      >
        Salvar
      </q-btn>
      
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
            icon="cake"
          >
            <q-input v-model="datanasc" float-label="Data de Nascimento" clearable />
          </q-field>   
        </div>
    </div>  
    
    <div class="row">
        <div class="col">
          <q-field
            icon="email"
            helper="Digite um email válido"
          >
            <q-input v-model="email" 
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
            <q-input v-model="cep" float-label="CEP"/>
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
            <q-input v-model="end" float-label="Endereço" clearable/>
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
        <div class="col-md-4">
          <q-field
            icon="streetview"
          >
            <q-select
                float-label="Bairro"
                filter
                v-model="bairro"
                :options="options"
            />
          </q-field>   
        </div>
        <div class="col-md-4">
          <q-field
            icon="location_city"
          >
            <q-select
                float-label="Cidade"
                filter
                v-model="cidade"
                :options="options"
            />
          </q-field>   
        </div>  
        
        <div class="col-md-4">
          <q-field
            icon="star"
          >
            <q-select
                float-label="Estado"
                filter
                v-model="estado"
                :options="options"
            />
          </q-field>   
        </div>
    </div>
      
    
</div>
    
</template>

<script>
import axios from 'axios'
export default {
  name: 'clientes',
  data () {
    return {
        nome: '',
        cpf: '',
        datanasc: '',
        email: '',
        cep: '',
        end: '',
        bairro: '',
        cidade: '',
        estado: '',
        numLogradouro: '',
        selCidade: 'Bairro',
        options: [
            {
              label: 'Google',
              value: 'goog'
            },
            {
              label: 'Facebook',
              value: 'fb'
            },
            {
              label: 'Twitter',
              value: 'twtr'
            },
            {
              label: 'Apple Inc.',
              value: 'appl'
            },
            {
              label: 'Oracle',
              value: 'ora'
            }
        ],
        canGoBack: window.history.length > 1,
        getCep: []
    }
  },
  components: {
  },
  methods: {
    buscarCep () {
        axios.get('http://api.postmon.com.br/v1/cep/' + this.cep)
        .then((res)=>{
            this.getCep = res.data
            console.log(JSON.stringfy(res.data))
        })
    },
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style>
    
</style>