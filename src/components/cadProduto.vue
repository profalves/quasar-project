<template>
<div id="produtos">
    <h1>Cadastro de mercadorias</h1>
    

    <q-input v-model="nome" float-label="Nome"  clearable />
    <q-select
      float-label="Familia"
      v-model="selected"
      :options="options"
    />
    <q-input v-model="preco" 
             type="number" 
             prefix="R$"
             suffix="0,00"
             float-label="Preço" />

</div>
    
</template>

<script>
export default {
  name: 'produtos',
  data () {
    return {
       selected: '',
       nome: '',
       preco: '',
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
    }
  },
  components: {
  }
}
</script>

<style>
    
</style>