<template>
<div class="layout-padding row justify-center wall">
    <div style="width: 500px; 
                max-width: 90vw;
                text-align: center;
                ">
      <q-fixed-position class="over" corner="top-right" :offset="[18, 18]">
        
        <q-icon name="settings" class="fa-2x" @click="$router.push('/config')" />
        
      </q-fixed-position>
      <img src="../../img/logo2.png" width="100%" />
      <q-field

        helper="Empresa"
      >
        <q-select
            label="Empresa"
            v-model="bd"
            :options="[
                { label: 'Star Wars', value: 1 },
                { label: 'Star Trek', value: 2 }
            ]"   
        />
      </q-field>
      <q-field

        helper="Usuário"
      >
        <q-select
            label="Usuário"
            v-model="user"
            :options="[
                { label: 'Luke Skywalker', value: 1 },
                { label: 'Darth Vader', value: 2 },
                { label: 'C-3PO', value: 3 },
                { label: 'R2-D2', value: 4 },
                { label: 'Leia Organa', value: 5 },
            ]"   
        />
      </q-field>
      <q-field

        helper="Senha"
      >
        <q-input
            label="Usuário"
            v-model="pass"
            type="password"
            clearable
        />
      </q-field>
      <q-field>
        <q-btn icon="person" 
               color="faded" 
               @click="$router.push('/')"
               >Entrar</q-btn>
      </q-field>
          
    </div>
</div>
</template>

<script>
import table from '../data/table.json'
    
export default {
    data () {
        return {
            table,
            bd: '',
            user: '',
            pass: ''
        }
    },
    components: {
    },
    computed: {
        lista () {
          function nomes(user) {
            return this.table.name;
          }
            return this.listaCFOP.filter(nomes)
        }
    },
}
</script>

<style scoped>
    
</style>