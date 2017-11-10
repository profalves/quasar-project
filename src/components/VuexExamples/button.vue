<template>
  <div>
    <button :disabled="!hasUser" @click="mudarDados">Mudar dados do usuário</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    mudarDados(){
      const payload = {
        name: 'Outro nome',
        email: 'outro email'
      }
      
      this.$store.commit('CHANGE_USER', payload)
    }
    
  },
  computed: {
      hasUser(){
        return this.$store.state.user.name!==''
      }
  }
}
</script>

<style>
</style>
