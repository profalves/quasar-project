webpackJsonp([36],{161:function(t,e,o){function n(t){o(463)}var r=o(7)(o(465),o(466),n,null,null);t.exports=r.exports},463:function(t,e,o){var n=o(464);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(160)("c2b32a52",n,!0)},464:function(t,e,o){e=t.exports=o(159)(void 0),e.push([t.i,"",""])},465:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},methods:{mudarDados:function(){var t={name:"Outro nome",email:"outro email"};this.$store.commit("CHANGE_USER",t)}},computed:{hasUser:function(){return""!==this.$store.state.user.name}}}},466:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("button",{attrs:{disabled:!t.hasUser},on:{click:t.mudarDados}},[t._v("Mudar dados do usuário")])])},staticRenderFns:[]}}});