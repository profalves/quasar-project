webpackJsonp([41],{205:function(a,e,n){var t=n(7)(n(797),n(799),null,null,null);a.exports=t.exports},797:function(a,e,n){"use strict";function t(){return u[Math.floor(Math.random()*u.length)]}function r(){if(Math.floor(50*Math.random())%3==0)return Math.floor(10*Math.random())+" min"}function i(){if(Math.floor(50*Math.random())%4==0)return"UID: "+Object(c._36)().substring(0,8)}function s(){return l.a.map(function(a){return{label:a,sublabel:i(),icon:t(),stamp:r(),value:a}})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(798),l=n.n(o),c=n(1),u=["alarm","email","search","build","card_giftcard","perm_identity","receipt","schedule","speaker_phone","archive","weekend","battery_charging_full"];e.default={components:{QAutocomplete:c.g,QSearch:c.U,QInput:c.B},data:function(){return{terms:"",countries:s()}},methods:{search:function(a,e){setTimeout(function(){e(Object(c._34)(a,{field:"value",list:s()}))},1e3)},selected:function(a){c._31.create('Selected suggestion "'+a.label+'"')}}}},798:function(a,e){a.exports=["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, The Democratic Republic of the","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","England","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji Islands","Finland","France","French Guiana","French Polynesia","French Southern territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Ireland","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Scotland","Senegal","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","South Sudan","Spain","SriLanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands, British","Virgin Islands, U.S.","Wales","Wallis and Futuna","Western Sahara","Yemen","Yugoslavia","Zambia","Zimbabwe"]},799:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"layout-padding row justify-center"},[n("div",{staticStyle:{width:"500px","max-width":"90vw"}},[a._m(0),a._v(" "),n("q-search",{attrs:{placeholder:"Start typing a country name"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{on:{search:a.search,selected:a.selected}})],1),a._v(" "),n("q-search",{attrs:{inverted:"",placeholder:"Start typing a country name"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{on:{search:a.search,selected:a.selected}})],1),a._v(" "),n("p",{staticClass:"caption"},[a._v("Maximum of 2 results at a time")]),a._v(" "),n("q-search",{attrs:{inverted:"",color:"amber"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{attrs:{"max-results":2},on:{search:a.search,selected:a.selected}})],1),a._v(" "),n("p",{staticClass:"caption"},[a._v("Minimum 3 characters to trigger search")]),a._v(" "),n("q-input",{attrs:{color:"amber",placeholder:"Type 'fre'"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{attrs:{"min-characters":3},on:{search:a.search,selected:a.selected}})],1),a._v(" "),n("p",{staticClass:"caption"},[a._v("Custom debounce before triggering search")]),a._v(" "),n("q-input",{attrs:{color:"amber",placeholder:"One second debounce"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{attrs:{debounce:1e3},on:{search:a.search,selected:a.selected}})],1),a._v(" "),n("p",{staticClass:"caption"},[a._v("Static List")]),a._v(" "),n("q-search",{attrs:{inverted:"",color:"secondary",placeholder:"Featuring static data"},model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{attrs:{"static-data":{field:"value",list:a.countries}},on:{selected:a.selected}})],1),a._v(" "),n("p",{staticClass:"caption"},[a._v("Separator between results")]),a._v(" "),n("q-search",{model:{value:a.terms,callback:function(e){a.terms=e},expression:"terms"}},[n("q-autocomplete",{attrs:{separator:""},on:{search:a.search,selected:a.selected}})],1)],1)])},staticRenderFns:[function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("p",{staticClass:"caption",staticStyle:{"margin-bottom":"40px"}},[a._v("\n      These examples feature countries autocomplete."),n("br"),a._v("\n      On desktop, Escape key closes the suggestions popover and you can navigate with keyboard arrow keys. Selection is made with either mouse/finger tap or by Enter key.\n    ")])}]}}});