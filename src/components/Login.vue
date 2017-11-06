<template>
<div class="layout-padding row justify-center">
    <div style="width: 500px; 
                max-width: 90vw;
                text-align: center;
                ">
        <h1>7Virtual</h1>
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
            />
          </q-field>
          <q-field>
            <q-btn icon="person" color="primary" @click="$router.push('/')">Entrar</q-btn>
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

<style>
    
</style>