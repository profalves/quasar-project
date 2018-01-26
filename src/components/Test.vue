<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Implantando Scroll down infinite.</p>

      <br>
      <q-infinite-scroll :handler="refresher">
        <div v-for="(item, index) in items" class="caption" :key="index">
          <q-chip square color="secondary" class="shadow-1">
            {{ index + 1 }}
          </q-chip>
          
          <h4>{{items[index].value}}</h4>
          <hr>
        </div>

        <div slot="message" class="row justify-center" style="margin-bottom: 50px;">
          <q-spinner-dots :size="40" />
        </div>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script>
import {
  QInfiniteScroll,
  QChip,
  QSpinnerDots
} from 'quasar'
import data from 'data/CFOP.json'
    
export default {
  components: {
    QInfiniteScroll,
    QChip,
    QSpinnerDots
  },
  data () {
    return {
      data,
      items: []
    }
  },
  methods: {
    refresher (index, done) {
      setTimeout(() => {
        let items = this.items.length + 5

        for(let i = this.items.length; i < items; i++){
            let d = this.data[i]
            this.items.push(d) 
        
        }

        this.items = this.items.concat(items)
        done()
      }, 2500)
    },
    incluir(){
     for(let i = 0; i < 9; i++){
        let d = this.data[i]
        this.items.push(d) 
        
     }
    }
  },
  mounted(){
    this.incluir()  
  }
}
</script>