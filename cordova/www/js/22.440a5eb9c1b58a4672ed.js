webpackJsonp([22],{338:function(t,e,n){function o(t){n(814)}var r=n(0)(n(816),n(817),o,null,null);t.exports=r.exports},348:function(t,e,n){"use strict";function o(t){return"[object Array]"===S.call(t)}function r(t){return"[object ArrayBuffer]"===S.call(t)}function a(t){return"undefined"!=typeof FormData&&t instanceof FormData}function i(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function s(t){return"string"==typeof t}function c(t){return"number"==typeof t}function u(t){return void 0===t}function l(t){return null!==t&&"object"==typeof t}function f(t){return"[object Date]"===S.call(t)}function d(t){return"[object File]"===S.call(t)}function p(t){return"[object Blob]"===S.call(t)}function h(t){return"[object Function]"===S.call(t)}function m(t){return l(t)&&h(t.pipe)}function g(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function v(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function b(t,e){if(null!==t&&void 0!==t)if("object"==typeof t||o(t)||(t=[t]),o(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.call(null,t[a],a,t)}function w(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=w(e[n],t):e[n]=t}for(var e={},n=0,o=arguments.length;n<o;n++)b(arguments[n],t);return e}function x(t,e,n){return b(e,function(e,o){t[o]=n&&"function"==typeof e?_(e,n):e}),t}var _=n(354),C=n(362),S=Object.prototype.toString;t.exports={isArray:o,isArrayBuffer:r,isBuffer:C,isFormData:a,isArrayBufferView:i,isString:s,isNumber:c,isObject:l,isUndefined:u,isDate:f,isFile:d,isBlob:p,isFunction:h,isStream:m,isURLSearchParams:g,isStandardBrowserEnv:y,forEach:b,merge:w,extend:x,trim:v}},352:function(t,e,n){"use strict";(function(e){function o(t,e){!r.isUndefined(t)&&r.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var r=n(348),a=n(364),i={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var t;return"undefined"!=typeof XMLHttpRequest?t=n(355):void 0!==e&&(t=n(355)),t}(),transformRequest:[function(t,e){return a(e,"Content-Type"),r.isFormData(t)||r.isArrayBuffer(t)||r.isBuffer(t)||r.isStream(t)||r.isFile(t)||r.isBlob(t)?t:r.isArrayBufferView(t)?t.buffer:r.isURLSearchParams(t)?(o(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):r.isObject(t)?(o(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(t){s.headers[t]={}}),r.forEach(["post","put","patch"],function(t){s.headers[t]=r.merge(i)}),t.exports=s}).call(e,n(4))},354:function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return t.apply(e,n)}}},355:function(t,e,n){"use strict";var o=n(348),r=n(365),a=n(367),i=n(368),s=n(369),c=n(356),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(370);t.exports=function(t){return new Promise(function(e,l){var f=t.data,d=t.headers;o.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(t.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var g=t.auth.username||"",v=t.auth.password||"";d.Authorization="Basic "+u(g+":"+v)}if(p.open(t.method.toUpperCase(),a(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?i(p.getAllResponseHeaders()):null,o=t.responseType&&"text"!==t.responseType?p.response:p.responseText,a={data:o,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:n,config:t,request:p};r(e,l,a),p=null}},p.onerror=function(){l(c("Network Error",t,null,p)),p=null},p.ontimeout=function(){l(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",p)),p=null},o.isStandardBrowserEnv()){var y=n(371),b=(t.withCredentials||s(t.url))&&t.xsrfCookieName?y.read(t.xsrfCookieName):void 0;b&&(d[t.xsrfHeaderName]=b)}if("setRequestHeader"in p&&o.forEach(d,function(t,e){void 0===f&&"content-type"===e.toLowerCase()?delete d[e]:p.setRequestHeader(e,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),l(t),p=null)}),void 0===f&&(f=null),p.send(f)})}},356:function(t,e,n){"use strict";var o=n(366);t.exports=function(t,e,n,r,a){var i=new Error(t);return o(i,e,n,r,a)}},357:function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},358:function(t,e,n){"use strict";function o(t){this.message=t}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,t.exports=o},360:function(t,e,n){t.exports=n(361)},361:function(t,e,n){"use strict";function o(t){var e=new i(t),n=a(i.prototype.request,e);return r.extend(n,i.prototype,e),r.extend(n,e),n}var r=n(348),a=n(354),i=n(363),s=n(352),c=o(s);c.Axios=i,c.create=function(t){return o(r.merge(s,t))},c.Cancel=n(358),c.CancelToken=n(377),c.isCancel=n(357),c.all=function(t){return Promise.all(t)},c.spread=n(378),t.exports=c,t.exports.default=c},362:function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function o(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||o(t)||!!t._isBuffer)}},363:function(t,e,n){"use strict";function o(t){this.defaults=t,this.interceptors={request:new i,response:new i}}var r=n(352),a=n(348),i=n(372),s=n(373),c=n(375),u=n(376);o.prototype.request=function(t){"string"==typeof t&&(t=a.merge({url:arguments[0]},arguments[1])),t=a.merge(r,this.defaults,{method:"get"},t),t.method=t.method.toLowerCase(),t.baseURL&&!c(t.url)&&(t.url=u(t.baseURL,t.url));var e=[s,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},a.forEach(["delete","get","head","options"],function(t){o.prototype[t]=function(e,n){return this.request(a.merge(n||{},{method:t,url:e}))}}),a.forEach(["post","put","patch"],function(t){o.prototype[t]=function(e,n,o){return this.request(a.merge(o||{},{method:t,url:e,data:n}))}}),t.exports=o},364:function(t,e,n){"use strict";var o=n(348);t.exports=function(t,e){o.forEach(t,function(n,o){o!==e&&o.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[o])})}},365:function(t,e,n){"use strict";var o=n(356);t.exports=function(t,e,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?e(o("Request failed with status code "+n.status,n.config,null,n.request,n)):t(n)}},366:function(t,e,n){"use strict";t.exports=function(t,e,n,o,r){return t.config=e,n&&(t.code=n),t.request=o,t.response=r,t}},367:function(t,e,n){"use strict";function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var r=n(348);t.exports=function(t,e,n){if(!e)return t;var a;if(n)a=n(e);else if(r.isURLSearchParams(e))a=e.toString();else{var i=[];r.forEach(e,function(t,e){null!==t&&void 0!==t&&(r.isArray(t)&&(e+="[]"),r.isArray(t)||(t=[t]),r.forEach(t,function(t){r.isDate(t)?t=t.toISOString():r.isObject(t)&&(t=JSON.stringify(t)),i.push(o(e)+"="+o(t))}))}),a=i.join("&")}return a&&(t+=(-1===t.indexOf("?")?"?":"&")+a),t}},368:function(t,e,n){"use strict";var o=n(348);t.exports=function(t){var e,n,r,a={};return t?(o.forEach(t.split("\n"),function(t){r=t.indexOf(":"),e=o.trim(t.substr(0,r)).toLowerCase(),n=o.trim(t.substr(r+1)),e&&(a[e]=a[e]?a[e]+", "+n:n)}),a):a}},369:function(t,e,n){"use strict";var o=n(348);t.exports=o.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(r.setAttribute("href",e),e=r.href),r.setAttribute("href",e),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");return e=t(window.location.href),function(n){var r=o.isString(n)?t(n):n;return r.protocol===e.protocol&&r.host===e.host}}():function(){return function(){return!0}}()},370:function(t,e,n){"use strict";function o(){this.message="String contains an invalid character"}function r(t){for(var e,n,r=String(t),i="",s=0,c=a;r.charAt(0|s)||(c="=",s%1);i+=c.charAt(63&e>>8-s%1*8)){if((n=r.charCodeAt(s+=.75))>255)throw new o;e=e<<8|n}return i}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",t.exports=r},371:function(t,e,n){"use strict";var o=n(348);t.exports=o.isStandardBrowserEnv()?function(){return{write:function(t,e,n,r,a,i){var s=[];s.push(t+"="+encodeURIComponent(e)),o.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),o.isString(r)&&s.push("path="+r),o.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},372:function(t,e,n){"use strict";function o(){this.handlers=[]}var r=n(348);o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){r.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},373:function(t,e,n){"use strict";function o(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var r=n(348),a=n(374),i=n(357),s=n(352);t.exports=function(t){return o(t),t.headers=t.headers||{},t.data=a(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||s.adapter)(t).then(function(e){return o(t),e.data=a(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(o(t),e&&e.response&&(e.response.data=a(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},374:function(t,e,n){"use strict";var o=n(348);t.exports=function(t,e,n){return o.forEach(n,function(n){t=n(t,e)}),t}},375:function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},376:function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},377:function(t,e,n){"use strict";function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new r(t),e(n.reason))})}var r=n(358);o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return{token:new o(function(e){t=e}),cancel:t}},t.exports=o},378:function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},814:function(t,e,n){var o=n(815);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(297)("4b24b374",o,!0)},815:function(t,e,n){e=t.exports=n(296)(void 0),e.push([t.i,".over{z-index:5}",""])},816:function(t,e,n){"use strict";function o(t){return t=t.toFixed(2).split("."),t[0]="R$ "+t[0].split(/(?=(?:...)*$)/).join("."),t.join(",")}Object.defineProperty(e,"__esModule",{value:!0});var r=n(12),a=n(360),i=n.n(a),s=n(39),c=localStorage.getItem("wsAtual");e.default={data:function(){return{canGoBack:window.history.length>1,vendas:[],totalizadores:"",formas:[],formasVendedor:[],dataInicial:"",dataFinal:"",forma:"",opened:!0,visivel:!1,open:!1,config:{title:"",refresh:"true"===localStorage.getItem("refresh"),noHeader:"true"===localStorage.getItem("noHeader"),columnPicker:"true"===localStorage.getItem("columnPicker"),bodyStyle:{maxHeight:"500px"},rowHeight:localStorage.getItem("rowHeight")+"px",responsive:"true"===localStorage.getItem("responsive"),selection:"single",pagination:{rowsPerPage:15,options:[5,10,15,30,50,100]},messages:{noData:'<i class="material-icons">warning</i> Não há dados para exibir.',noDataAfterFiltering:'<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'},labels:{columns:"Colunas",allCols:"Todas",rows:"Linhas",selected:{singular:"item selecionado.",plural:"itens selecionados."},clear:"limpar seleção",search:"Buscar",all:"Todos"}},colunas:[{label:"Vendedor",field:"vendedor",filter:!0,sort:!0,type:"string",width:"120px"},{label:"qtd. Clientes",field:"qtdClientes",sort:!0,filter:!0,type:"number",width:"100px"},{label:"qtd. Notas",field:"qtdNotas",sort:!0,filter:!0,type:"number",width:"100px"},{label:"Total",field:"venda",width:"150px",sort:!0,filter:!0,type:"number",format:function(t){return o(t)}}],pagination:"true"===localStorage.getItem("pagination"),rowHeight:parseInt(localStorage.getItem("rowHeight")),bodyHeightProp:localStorage.getItem("bodyHeightProp"),bodyHeight:parseInt(localStorage.getItem("bodyHeight")),dias:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}},computed:{listaFormas:function(){var t=this.formas;return t.map(function(t){return{label:t.nome,value:t.codigo}})}},watch:{pagination:function(t){if(!t)return this.oldPagination=Object(r._32)(this.config.pagination),void(this.config.pagination=!1);this.config.pagination=this.oldPagination},rowHeight:function(t){this.config.rowHeight=t+"px"},bodyHeight:function(t){var e={};"auto"!==this.bodyHeightProp&&(e[this.bodyHeightProp]=t+"px"),this.config.bodyStyle=e},bodyHeightProp:function(t){var e={};"auto"!==t&&(e[t]=this.bodyHeight+"px"),this.config.bodyStyle=e}},methods:{goBack:function(){window.history.go(-1)},getVendas:function(){var t=this;if(""===this.dataInicial)return void r._31.create.negative("Selecione um período antes");var e="";""!==this.forma&&(e="&CodFormaPgto="+this.forma),r.d.show({spinner:s.a,spinnerSize:140,message:"Aguardando Dados..."}),i.a.get(c+"relatorio/obterRptPorFormaPgto?dataInicial="+this.dataInicial+"&dataFinal="+this.dataFinal+e).then(function(e){t.vendas=e.data,t.totalizadores=t.vendas.shift(),t.opened=!1,t.visivel=!0,r.d.hide()}).catch(function(t){console.log(t.response),r.d.hide()})},listarFormas:function(){var t=this;r.d.show({spinner:s.a,spinnerSize:140,message:"Aguardando Dados..."}),i.a.get(c+"conta/obterFormasPgto").then(function(e){r.d.hide(),t.formas=e.data}).catch(function(t){r.d.hide(),console.log(t)})},collapse:function(){!0===this.opened?this.opened=!1:this.opened=!0},selection:function(t,e){console.log("selected "+t+": "+e),e.length>0?(this.open=!0,this.formasVendedor=e[0].data.formasPgto):this.open=!1}},created:function(){this.listarFormas()}}},817:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h5",[t._v("Vendas por Forma de Pagamento")]),t._v(" "),n("q-fixed-position",{staticClass:"over",attrs:{corner:"bottom-left",offset:[18,18]}},[n("q-btn",{attrs:{round:"",color:"primary"},on:{click:t.goBack}},[n("q-icon",{attrs:{name:"chevron_left"}})],1)],1),t._v(" "),n("div",{attrs:{id:"lista"}},[n("q-collapsible",{attrs:{opened:t.opened,icon:"filter_list",label:"Filtros"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("q-select",{attrs:{"float-label":"Forma Pgto",options:t.listaFormas,filter:""},model:{value:t.forma,callback:function(e){t.forma=e},expression:"forma"}})],1)]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("q-datetime",{attrs:{type:"date","float-label":"Data inicial",color:"black",format:"DD/MM/YYYY","ok-label":"OK","clear-label":"Limpar","cancel-label":"Cancelar","day-names":t.dias,"month-names":t.meses},model:{value:t.dataInicial,callback:function(e){t.dataInicial=e},expression:"dataInicial"}})],1),t._v(" "),n("div",{staticClass:"col"},[n("q-datetime",{attrs:{type:"date","float-label":"Data Final",color:"black",format:"DD/MM/YYYY","ok-label":"OK","clear-label":"Limpar","cancel-label":"Cancelar","day-names":t.dias,"month-names":t.meses},model:{value:t.dataFinal,callback:function(e){t.dataFinal=e},expression:"dataFinal"}})],1)]),t._v(" "),n("q-btn",{staticStyle:{"margin-bottom":"20px"},attrs:{color:"primary",rounded:""},on:{click:t.getVendas}},[t._v("\n             Visualizar")])],1),t._v(" "),t.visivel?n("center",[n("h5",[t._v(t._s(t.totalizadores.vendedor))]),t._v(" "),n("strong",[t._v("Qtd. Notas:")]),t._v(" "+t._s(t.totalizadores.qtdNotas)),n("br"),t._v(" "),n("strong",[t._v("Qtd. Clientes:")]),t._v(" "+t._s(t.totalizadores.qtdClientes)),n("br"),t._v(" "),n("strong",[t._v("Total Vendas:")]),t._v(" "+t._s(t._f("formatMoney")(t.totalizadores.venda))),n("br"),t._v(" "),n("strong",[t._v("Comissão:")]),t._v(" "+t._s(t._f("formatMoney")(t.totalizadores.valorComissao))),n("br"),t._v(" "),n("hr",{attrs:{width:"60%"}}),t._v(" "),n("table",{staticClass:"q-table"},[n("thead",[n("tr",[n("th",{staticClass:"text-left"},[t._v("Forma")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("Total")]),t._v(" "),n("th",{staticClass:"text-right"},[t._v("Percentual")])])]),t._v(" "),n("tbody",t._l(t.totalizadores.formasPgto,function(e){return n("tr",[n("td",{staticClass:"text-left"},[t._v(t._s(e.formaPgto))]),t._v(" "),n("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatMoney")(e.valorPgto)))]),t._v(" "),n("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatPerc")(e.percentual)))])])}))])]):t._e(),t._v(" "),n("br"),t._v(" "),n("q-data-table",{staticStyle:{"background-color":"white"},attrs:{data:t.vendas,config:t.config,columns:t.colunas},on:{selection:t.selection}}),t._v(" "),n("q-collapsible",{staticClass:"shadow-2",staticStyle:{"background-color":"white"},attrs:{label:"Itens",icon:"local_mall",opened:t.open}},[n("table",{staticClass:"q-table"},[n("thead",[n("tr",[n("th",{staticClass:"text-left"},[t._v("Forma")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("Total")]),t._v(" "),n("th",{staticClass:"text-right"},[t._v("Percentual")])])]),t._v(" "),n("tbody",t._l(t.formasVendedor,function(e){return n("tr",[n("td",{staticClass:"text-left"},[t._v(t._s(e.formaPgto))]),t._v(" "),n("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatMoney")(e.valorPgto)))]),t._v(" "),n("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatPerc")(e.percentual)))])])}))])]),t._v(" "),n("br"),n("br"),n("br"),n("br")],1)],1)},staticRenderFns:[]}}});