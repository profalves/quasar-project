<template>
  <div class="text-center">
    <img src="../../img/logo2.png" width="80%" id="logo"/>
    <footer slot="footer" color="black" v-if="$route.path !== '/login' && !$route.query.config">
      <center>
        Obrigado por usar <a href="http://7virtual.com.br/" target="_blank">7Virtual</a> Sistemas
      </center>
    </footer>  
  </div>
</template>

<script>
import { Dialog, openURL } from 'quasar'
  
export default {
  data () {
    return {
      suporte: "5575992748983",
    }
  },
  created(){
    Dialog.create({
      title: 'Peça ajuda ao suporte via Whatsapp',
      message: 'Digite a sua solicitação aqui abaixo e clique em enviar. Aguarde o aplicativo abrir e envie a sua mensagem',
      form: {
        msg: {
          type: 'textarea',
          label: 'Mensagem',
          model: ''
        }
      },
      buttons: [
        {
          label: 'Cancelar',
          color: 'negative',
        },
        {
          label: 'Enviar',
          color: 'positive',
          handler:(data) => {
            openURL('https://api.whatsapp.com/send?phone=' + this.suporte + '&text=' + data.msg)
            this.$router.push('/')
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
  footer{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    text-align: center;
  }
  
</style>
