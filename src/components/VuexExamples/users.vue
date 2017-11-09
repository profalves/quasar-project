<template>
  <div>
     Email: {{email}}
     <cc-button></cc-button>
  </div>
</template>

<script>
import CcButton from './button.vue'
export default {
  computed: {
    email () {
        return this.$store.state.user.email
    }
  },
  components: {
    CcButton
  }
}
</script>

<style>
</style>
