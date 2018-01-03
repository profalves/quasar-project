<template>
  <div>
   
     <q-btn button @click="notifyMe()">Notifique me!</q-btn><br><br>
    
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
     
    <div id="table">
        <table class="q-table" style="margin-left: 10px">
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
      
    <flower-spinner
      :animation-duration="2500"
      :size="70"
      :color="'#ff1d5e'"
      @click="FlowerSpinner"
    />
    <br>    
    <pixel-spinner
      :animation-duration="2000"
      :pixel-size="70"
      :color="'#ff1d5e'"
      @click="PixelSpinner"
    />
    <br>
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="15"
      :dots-num="3"
      :color="'#ff1d5e'"
      @click="HollowDotsSpinner"
    />
    <br>
    <intersecting-circles-spinner
      :animation-duration="1200"
      :size="70"
      :color="'#ff1d5e'"
      @click="IntersectingCirclesSpinner"
    />
    <br>
    <orbit-spinner
      :animation-duration="1200"
      :size="55"
      :color="'#ff1d5e'"
      @click="OrbitSpinner"
    />
    <br>
    <radar-spinner
      :animation-duration="2000"
      :size="60"
      :color="'#ff1d5e'"
      @click="RadarSpinner"
    />
    <br>
    <scaling-squares-spinner
      :animation-duration="1250"
      :size="65"
      :color="'#ff1d5e'"
      @click="ScalingSquaresSpinner"
    />
    <br>
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
      @click="HalfCircleSpinner"
    />
    <br>
    <trinity-rings-spinner
      :animation-duration="1500"
      :size="66"
      :color="'#ff1d5e'"
      @click="TrinityRingsSpinner"
    />
    <br>
    <fulfilling-square-spinner
      :animation-duration="4000"
      :size="50"
      :color="'#ff1d5e'"
      @click="FulfillingSquareSpinner"
    />
    <br>
    <circles-to-rhombuses-spinner
      :animation-duration="1200"
      :circles-num="3"
      :circle-size="15"
      :color="'#ff1d5e'"
      @click="CirclesToRhombusesSpinner"
    />
    <br>
    <semipolar-spinner
      :animation-duration="2000"
      :size="65"
      :color="'#ff1d5e'"
      @click="SemipolarSpinner"
    />
    <br>
    <self-building-square-spinner
      :animation-duration="6000"
      :size="40"
      :color="'#ff1d5e'"
      @click="SelfBuildingSquareSpinner"
    />
    <br>
    <swapping-squares-spinner
      :animation-duration="1000"
      :size="65"
      :color="'#ff1d5e'"
      @click="SwappingSquaresSpinner"
    />
    <br>
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="60"
      :color="'#ff1d5e'"
      @click="FulfillingBouncingCircleSpinner"
    />
    <br>
    <fingerprint-spinner
      :animation-duration="1500"
      :size="64"
      :color="'#ff1d5e'"
      @click="FingerprintSpinner"
    />
    <br>
    <spring-spinner
      :animation-duration="3000"
      :size="60"
      :color="'#ff1d5e'"
      @click="SpringSpinner"
    />
    <br>
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
      @click="AtomSpinner"
    />
    <br>
    <looping-rhombuses-spinner
      :animation-duration="2500"
      :rhombus-size="15"
      :color="'#ff1d5e'"        
      @click="LoopingRhombusesSpinner"
    />
    <br>
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
    AtomSpinner,
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
    FulfillingBouncingCircleSpinner,
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
    AtomSpinner,
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
    FulfillingBouncingCircleSpinner,
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
    launch (url) {
      openURL(url)
    },
    notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This device does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
        return notification
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hi Master!");
            return notification
          }
        });
      }

      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
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
    
    AtomSpinner(){
      Loading.show({
        spinner: AtomSpinner,
        spinnerSize: 140,
        message: 'AtomSpinner'
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
  },
  
}
</script>
