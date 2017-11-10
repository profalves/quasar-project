<template>
<div>
    <h3>Vuex Content</h3>
    <br>
    {{user}}  
    <hr>
    <cc-users></cc-users>
    
    <br>
    {{outro}}
    
</div>
</template>
<script>
    import CcUsers from './VuexExamples/users.vue'
    import { mapState, mapActions } from 'vuex'

    export default{
        name: 'VuexTests',
        mounted() {
            const payload = {
                name: 'Rodrigo Alves',
                email: 'Novo',
                city: 'Serrinha',
                estado: 'BA',
            }
            setTimeout(() => {
                this.changeUser(payload) // com mapeamento de actions
                //this.$store.dispatch('changeUser', payload) //segunda maneira com actions
                //this.$store.commit('CHANGE_USER', payload) //primeira maneira direto com mutations
            }, 3000)
            
        },
        computed: {
            outro() {
                return 'test new computed'    
            },
            
            ...mapState({
                // arrow functions can make the code very succinct!
                user: state => {
                    const {name, email} = state.user
                    return `O usuário é ${name} e possui o email ${email}`    
                }
            })
        },
        components: {
            CcUsers
        },
        
        /*vuex: {  
            getters: {
                user: store => store.user
            },
            actions: {
                setUser ({dispatch}, obj) {
                dispatch('SET_USER', obj)
                }
            }
        },*/
        methods: {
            ...mapActions(['changeUser'])
        }
    }    
</script>