webpackJsonp([37],{175:function(t,a,r){function s(t){r(652)}var i=r(7)(r(654),r(655),s,"data-v-e2119202",null);t.exports=i.exports},652:function(t,a,r){var s=r(653);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);r(160)("3bdd6bea",s,!0)},653:function(t,a,r){a=t.exports=r(159)(void 0),a.push([t.i,".card[data-v-e2119202]{margin:0 10px}",""])},654:function(t,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"principal",data:function(){return{}},methods:{verificarUser:function(){localStorage.getItem("codUser")||this.$router.push("/login")},vibrarNotif:function(){var t={body:"Seja bem vindo! "+localStorage.getItem("nameUser"),vibrate:[200,100,200]};new Notification("Retaguarda Web",t).vibrate}},created:function(){this.vibrarNotif()}}},655:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{attrs:{id:"home"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-6"},[r("router-link",{attrs:{to:"/clientes"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"primary"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-user fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Pessoas")])])],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"col-6"},[r("router-link",{attrs:{to:"/produtos"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"secondary"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-shopping-basket fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Produtos")])])],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"col-6"},[r("router-link",{attrs:{to:"/contas"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"warning"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-money fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Contas")])])],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"col-6"},[r("router-link",{attrs:{to:"/cadnotas"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"info"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-file-text-o fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Notas")])])],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"col"},[r("router-link",{attrs:{to:"/relatorios"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"positive"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-line-chart fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Relatórios")])])],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"col"},[r("router-link",{attrs:{to:"/usuarios"}},[r("q-card",{staticClass:"col-sm-6",attrs:{color:"tertiary"}},[r("q-card-title"),t._v(" "),r("q-card-main",[r("center",{attrs:{id:"card"}},[r("i",{staticClass:"fa fa-users fa-5x center"}),r("br"),t._v(" "),r("p",[t._v("Usuários")])])],1)],1)],1)],1)])])},staticRenderFns:[]}}});