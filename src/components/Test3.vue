3<template>
  <div id="testes">
    
    <q-btn color="dark" @click="print(table)">pdf</q-btn><br><br>
    
    <q-btn color="dark" @click="refresh()">refresh</q-btn><br><br>
      
    <div id="notify">
     <q-btn color="dark" @click="vibrateMe()">S.O.S!</q-btn><br><br>
     <q-btn color="dark" @click="notify()">Notifique me com Cordova!</q-btn><br><br>
     <q-btn color="dark" @click="getPermission()">Solicitar Permisão Notificações Cordova</q-btn><br><br>
     <hr>
     <q-btn color="dark" @click="dialog()">Notifica Dialog</q-btn><br><br>

    </div>
     <hr>
      
    <div id="pdf">
         <q-btn icon="create" 
                big 
                color="primary"
                @click="pdf"
                >New PDF</q-btn>
         <br><br>
         <q-btn icon="create" 
                big 
                color="primary"
                @click="html"
                >html PDF</q-btn>
         <br><br>
     
     </div>
    <hr>
    
    <div id="whatsapp">
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?phone=5575991731593')"
            >WhatsApp</q-btn>
     <br>Enviar para o numero especifico para digitar uma mensagem<br>
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?phone=5575991767045&text=Enviando um teste...')"
            >WhatsApp</q-btn>
     <br>Enviar para o numero especifico uma mensagem pronta<br>
     <q-btn icon="fa-whatsapp" 
            big 
            color="primary"
            @click="launch('https://api.whatsapp.com/send?&text=test')"
            >WhatsApp All</q-btn>
     <br>Enviar para todos uma mensagem<br>
    </div> 
    
    <div id="table">
        <table class="q-table" :class="computedClasses" style="margin-left: 10px">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-right">Price</th>
              <th class="text-right">In Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in table">
              <td class="text-left">{{item.name}}</td>
              <td class="text-right">{{item.gender}}</td>
              <td class="text-right">{{item.mass}}</td>
            </tr>
            
          </tbody>
        </table>
    </div>    
    
    <hr>
    
    <div class="row">
    
    <h1>Spinners</h1>
    1  
    <flower-spinner
      :animation-duration="2500"
      :size="70"
      :color="'#ff1d5e'"
      @click="FlowerSpinner"
    />
    <br>
    2
    <pixel-spinner
      :animation-duration="2000"
      :pixel-size="70"
      :color="'#ff1d5e'"
      @click="PixelSpinner"
    />
    <br>
    3
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="15"
      :dots-num="3"
      :color="'#ff1d5e'"
      @click="HollowDotsSpinner"
    />
    <br>
    4
    <intersecting-circles-spinner
      :animation-duration="1200"
      :size="70"
      :color="'#ff1d5e'"
      @click="IntersectingCirclesSpinner"
    />
    <br>
    5
    <orbit-spinner
      :animation-duration="1200"
      :size="55"
      :color="'#ff1d5e'"
      @click="OrbitSpinner"
    />
    <br>
    6
    <radar-spinner
      :animation-duration="2000"
      :size="60"
      :color="'#ff1d5e'"
      @click="RadarSpinner"
    />
    <br>
    7
    <scaling-squares-spinner
      :animation-duration="1250"
      :size="65"
      :color="'#ff1d5e'"
      @click="ScalingSquaresSpinner"
    />
    <br>
    8
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
      @click="HalfCircleSpinner"
    />
    <br>
    9
    <trinity-rings-spinner
      :animation-duration="1500"
      :size="66"
      :color="'#ff1d5e'"
      @click="TrinityRingsSpinner"
    />
    <br>
    10
    <fulfilling-square-spinner
      :animation-duration="4000"
      :size="50"
      :color="'#ff1d5e'"
      @click="FulfillingSquareSpinner"
    />
    <br>
    11
    <circles-to-rhombuses-spinner
      :animation-duration="1200"
      :circles-num="3"
      :circle-size="15"
      :color="'#ff1d5e'"
      @click="CirclesToRhombusesSpinner"
    />
    <br>
    12
    <semipolar-spinner
      :animation-duration="2000"
      :size="65"
      :color="'#ff1d5e'"
      @click="SemipolarSpinner"
    />
    <br>
    13
    <self-building-square-spinner
      :animation-duration="6000"
      :size="40"
      :color="'#ff1d5e'"
      @click="SelfBuildingSquareSpinner"
    />
    <br>
    14
    <swapping-squares-spinner
      :animation-duration="1000"
      :size="65"
      :color="'#ff1d5e'"
      @click="SwappingSquaresSpinner"
    />
    <br>
    15
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="60"
      :color="'#ff1d5e'"
      @click="FulfillingBouncingCircleSpinner"
    />
    <br>
    16
    <fingerprint-spinner
      :animation-duration="1500"
      :size="64"
      :color="'#ff1d5e'"
      @click="FingerprintSpinner"
    />
    <br>
    17
    <spring-spinner
      :animation-duration="3000"
      :size="60"
      :color="'#ff1d5e'"
      @click="SpringSpinner"
    />
    <br>
    18
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
      @click="FulfillingBouncingCircleSpinner"
    />
    <br>
    19
    <looping-rhombuses-spinner
      :animation-duration="2500"
      :rhombus-size="15"
      :color="'#ff1d5e'"        
      @click="LoopingRhombusesSpinner"
    />
    <br>
    20
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="65"
      :color="'#ff1d5e'"        
      @click="BreedingRhombusSpinner"
    />
     
    </div>
      
  </div>
</template>

<script>
import JsPDF from 'jspdf'
import table from 'data/table.json'
//import axios from 'axios'
import { openURL, Loading } from 'quasar'
const $ = require("jquery");   
import {
    FulfillingBouncingCircleSpinner,
    FlowerSpinner,
    HollowDotsSpinner,
    PixelSpinner,
    IntersectingCirclesSpinner,
    OrbitSpinner,
    FingerprintSpinner,
    TrinityRingsSpinner,
    FulfillingSquareSpinner,
    CirclesToRhombusesSpinner,
    SemipolarSpinner,
    BreedingRhombusSpinner,
    SwappingSquaresSpinner,
    ScalingSquaresSpinner,
    AtomSpinner,
    RadarSpinner,
    SelfBuildingSquareSpinner,
    SpringSpinner,
    LoopingRhombusesSpinner,
    HalfCircleSpinner
} from 'epic-spinners'

export default {
  data () {
    return {
      spinnerColor: '#ff1d5e',
      table,
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
    }
  },
  components: {
    FulfillingBouncingCircleSpinner,
    FlowerSpinner,
    HollowDotsSpinner,
    PixelSpinner,
    IntersectingCirclesSpinner,
    OrbitSpinner,
    FingerprintSpinner,
    TrinityRingsSpinner,
    FulfillingSquareSpinner,
    CirclesToRhombusesSpinner,
    SemipolarSpinner,
    BreedingRhombusSpinner,
    SwappingSquaresSpinner,
    ScalingSquaresSpinner,
    AtomSpinner,
    RadarSpinner,
    SelfBuildingSquareSpinner,
    SpringSpinner,
    LoopingRhombusesSpinner,
    HalfCircleSpinner
  },
  computed: {
    computedClasses(){
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    },
  },
  methods: {
    print(){
      var printContents = document.getElementById('table').innerHTML
      var w = window.open();
      self.focus();
      w.document.open();
      w.document.write('<'+'html'+'><'+'body'+'>');
      w.document.write(printContents);
      w.document.write('<'+'/body'+'><'+'/html'+'>');
      w.document.close();
      w.print();
      w.close();
    },
    refresh(){
      localStorage.setItem('print', true)
      window.location.reload();
    },
    store(){
        //var teste = this.$setItem('teste', 'localForage')
        console.log('teste') //, teste);
    },
    launch (url) {
      openURL(url)
    },
    nvMe(){
      let options = {
        tag: '7Virtual', 
        body: 'Notificando e vibrando',
        renotify: false,
        vibrate: [200, 100, 200]
      }
      let n = new Notification('Oi!', options)

      n()
    },
    vibrateMe(){
      navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]) // Vibrate 'SOS' in Morse.
      //console.log('vibrou');
    },
    dialog(){
      function onConfirm(buttonIndex) {
          alert('You selected button ' + buttonIndex);
      }

      navigator.notification.confirm(
          'You are the winner!', // message
           onConfirm,            // callback to invoke with index of button pressed
          'Game Over',           // title
          ['Restart','Exit']     // buttonLabels
      );
    },
    pdf(){
      let doc = new JsPDF('p', 'pt', 'letter')
      doc.text(10, 10, 'This is a test')
      //doc.autoPrint() //aciona a impressão automática do documento
      doc.save('autoprint.pdf')
    },
    html() {
      let doc = new JsPDF('p', 'pt', 'letter')
      // source can be HTML-formatted string, or a reference
      // to an actual DOM element from which the text will be scraped.
      let source = $('#table')[0];

      // we support special element handlers. Register them with jQuery-style 
      // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
      // There is no support for any other type of selectors 
      // (class, of compound) at this time.
      let specialElementHandlers = {
          // element with id of "bypass" - jQuery style selector
          '#bypassme': function (element, renderer) {
              // true = "handled elsewhere, bypass text extraction"
              return true
          }
      };
      let margins = {
          top: 80,
          bottom: 60,
          left: 20,
          width: 900
      };
      // all coords and widths are in jsPDF instance's declared units
      // 'inches' in this case
      doc.fromHTML(
          source, // HTML string or DOM elem ref.
          margins.left, // x coord
          margins.top, { // y coord
              'width': margins.width, // max width of content on PDF
              'elementHandlers': specialElementHandlers
      })

      doc.save('Test.pdf');
    },
    
    FulfillingBouncingCircleSpinner(){
      Loading.show({
        spinner: FulfillingBouncingCircleSpinner,
        spinnerSize: 140,
        message: 'FulfillingBouncingCircleSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    FlowerSpinner(){
      Loading.show({
        spinner: FlowerSpinner,
        spinnerSize: 140,
        message: 'FlowerSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    HollowDotsSpinner(){
      Loading.show({
        spinner: HollowDotsSpinner,
        spinnerSize: 140,
        message: 'HollowDotsSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    PixelSpinner(){
      Loading.show({
        spinner: PixelSpinner,
        spinnerSize: 140,
        message: 'PixelSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    IntersectingCirclesSpinner(){
      Loading.show({
        spinner: IntersectingCirclesSpinner,
        spinnerSize: 140,
        message: 'IntersectingCirclesSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    OrbitSpinner(){
      Loading.show({
        spinner: OrbitSpinner,
        spinnerSize: 140,
        message: 'OrbitSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    FingerprintSpinner(){    
      Loading.show({
        spinner: FingerprintSpinner,
        spinnerSize: 140,
        message: 'FingerprintSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    TrinityRingsSpinner(){
      Loading.show({
        spinner: TrinityRingsSpinner,
        spinnerSize: 140,
        message: 'TrinityRingsSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    FulfillingSquareSpinner(){
      Loading.show({
        spinner: FulfillingSquareSpinner,
        spinnerSize: 140,
        message: 'FulfillingSquareSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    CirclesToRhombusesSpinner(){
      Loading.show({
        spinner: CirclesToRhombusesSpinner,
        spinnerSize: 140,
        message: 'CirclesToRhombusesSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    SemipolarSpinner(){
      Loading.show({
        spinner: SemipolarSpinner,
        spinnerSize: 140,
        message: 'SemipolarSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    BreedingRhombusSpinner(){
      Loading.show({
        spinner: BreedingRhombusSpinner,
        spinnerSize: 140,
        message: 'BreedingRhombusSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    SwappingSquaresSpinner(){
      Loading.show({
        spinner: SwappingSquaresSpinner,
        spinnerSize: 140,
        message: 'SwappingSquaresSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    ScalingSquaresSpinner(){
      Loading.show({
        spinner: ScalingSquaresSpinner,
        spinnerSize: 140,
        message: 'ScalingSquaresSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    AtomSpinner(){
      Loading.show({
        spinner: FulfillingBouncingCircleSpinner,
        spinnerSize: 140,
        message: 'AtomSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    RadarSpinner(){
      Loading.show({
        spinner: RadarSpinner,
        spinnerSize: 140,
        message: 'RadarSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    SelfBuildingSquareSpinner(){
      Loading.show({
        spinner: SelfBuildingSquareSpinner,
        spinnerSize: 140,
        message: 'SelfBuildingSquareSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    SpringSpinner(){
      Loading.show({
        spinner: SpringSpinner,
        spinnerSize: 140,
        message: 'SpringSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    LoopingRhombusesSpinner(){
      Loading.show({
        spinner: LoopingRhombusesSpinner,
        spinnerSize: 140,
        message: 'LoopingRhombusesSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    },
    HalfCircleSpinner(){
      Loading.show({
        spinner: HalfCircleSpinner,
        spinnerSize: 140,
        message: 'HalfCircleSpinner'
      })
      setTimeout(() => {
        Loading.hide()
      }, 5000)
    }
  }
  
}
</script>
