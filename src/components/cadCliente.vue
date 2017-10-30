<template>
<div id="clientes">
    <h1>Cadastro de clientes</h1>
      
      <q-field
        icon="person"
      >
        <q-input v-model="text" float-label="Nome" clearable />
      </q-field>

      <q-field
        icon="confirmation_number"
      >
        <q-input v-model="text" float-label="CPF/CNPJ" clearable />
      </q-field>

      <q-field
        icon="email"
        helper="digite um email válido"
      >
        <q-input v-model="text" 
                 type="email" 
                 float-label="Email" suffix="@email.com"/>
      </q-field>

      <br>

</div>
    
</template>

<script>
export default {
  name: 'clientes',
  data () {
    return {
        text: ''
    }
  },
  components: {
  }
}
</script>

<style>
    
</style>