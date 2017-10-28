<template>
<div id="clientes">
    <h1>Cadastro de clientes</h1>
      
      <q-field
        icon="person"
        class="col-md-6" 
      >
        <q-input v-model="text" float-label="Nome" clearable />
      </q-field>

      <q-field
        icon="email"
        class="col-md-6"
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