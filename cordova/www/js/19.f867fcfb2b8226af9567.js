webpackJsonp([19],{199:function(e,t,o){function r(e){o(773)}var n=o(7)(o(775),o(776),r,null,null);e.exports=n.exports},208:function(e,t,o){"use strict";function r(e){return"[object Array]"===S.call(e)}function n(e){return"[object ArrayBuffer]"===S.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function c(e){return"number"==typeof e}function l(e){return void 0===e}function u(e){return null!==e&&"object"==typeof e}function f(e){return"[object Date]"===S.call(e)}function d(e){return"[object File]"===S.call(e)}function p(e){return"[object Blob]"===S.call(e)}function h(e){return"[object Function]"===S.call(e)}function m(e){return u(e)&&h(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function y(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var o=0,n=e.length;o<n;o++)t.call(null,e[o],o,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}function w(){function e(e,o){"object"==typeof t[o]&&"object"==typeof e?t[o]=w(t[o],e):t[o]=e}for(var t={},o=0,r=arguments.length;o<r;o++)y(arguments[o],e);return t}function x(e,t,o){return y(t,function(t,r){e[r]=o&&"function"==typeof t?_(t,o):t}),e}var _=o(214),C=o(223),S=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:n,isBuffer:C,isFormData:a,isArrayBufferView:i,isString:s,isNumber:c,isObject:u,isUndefined:l,isDate:f,isFile:d,isBlob:p,isFunction:h,isStream:m,isURLSearchParams:v,isStandardBrowserEnv:b,forEach:y,merge:w,extend:x,trim:g}},212:function(e,t,o){"use strict";(function(t){function r(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var n=o(208),a=o(226),i={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=o(215):void 0!==t&&(e=o(215)),e}(),transformRequest:[function(e,t){return a(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(e){s.headers[e]={}}),n.forEach(["post","put","patch"],function(e){s.headers[e]=n.merge(i)}),e.exports=s}).call(t,o(225))},214:function(e,t,o){"use strict";e.exports=function(e,t){return function(){for(var o=new Array(arguments.length),r=0;r<o.length;r++)o[r]=arguments[r];return e.apply(t,o)}}},215:function(e,t,o){"use strict";var r=o(208),n=o(227),a=o(229),i=o(230),s=o(231),c=o(216),l="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||o(232);e.exports=function(e){return new Promise(function(t,u){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(e.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var v=e.auth.username||"",g=e.auth.password||"";d.Authorization="Basic "+l(v+":"+g)}if(p.open(e.method.toUpperCase(),a(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var o="getAllResponseHeaders"in p?i(p.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?p.response:p.responseText,a={data:r,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:o,config:e,request:p};n(t,u,a),p=null}},p.onerror=function(){u(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){u(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var b=o(233),y=(e.withCredentials||s(e.url))&&e.xsrfCookieName?b.read(e.xsrfCookieName):void 0;y&&(d[e.xsrfHeaderName]=y)}if("setRequestHeader"in p&&r.forEach(d,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),u(e),p=null)}),void 0===f&&(f=null),p.send(f)})}},216:function(e,t,o){"use strict";var r=o(228);e.exports=function(e,t,o,n,a){var i=new Error(e);return r(i,t,o,n,a)}},217:function(e,t,o){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},218:function(e,t,o){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},221:function(e,t,o){e.exports=o(222)},222:function(e,t,o){"use strict";function r(e){var t=new i(e),o=a(i.prototype.request,t);return n.extend(o,i.prototype,t),n.extend(o,t),o}var n=o(208),a=o(214),i=o(224),s=o(212),c=r(s);c.Axios=i,c.create=function(e){return r(n.merge(s,e))},c.Cancel=o(218),c.CancelToken=o(239),c.isCancel=o(217),c.all=function(e){return Promise.all(e)},c.spread=o(240),e.exports=c,e.exports.default=c},223:function(e,t){function o(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&o(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(o(e)||r(e)||!!e._isBuffer)}},224:function(e,t,o){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var n=o(212),a=o(208),i=o(234),s=o(235),c=o(237),l=o(238);r.prototype.request=function(e){"string"==typeof e&&(e=a.merge({url:arguments[0]},arguments[1])),e=a.merge(n,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!c(e.url)&&(e.url=l(e.baseURL,e.url));var t=[s,void 0],o=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)o=o.then(t.shift(),t.shift());return o},a.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,o){return this.request(a.merge(o||{},{method:e,url:t}))}}),a.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,o,r){return this.request(a.merge(r||{},{method:e,url:t,data:o}))}}),e.exports=r},225:function(e,t){function o(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function n(e){if(u===setTimeout)return setTimeout(e,0);if((u===o||!u)&&setTimeout)return u=setTimeout,setTimeout(e,0);try{return u(e,0)}catch(t){try{return u.call(null,e,0)}catch(t){return u.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function i(){m&&p&&(m=!1,p.length?h=p.concat(h):v=-1,h.length&&s())}function s(){if(!m){var e=n(i);m=!0;for(var t=h.length;t;){for(p=h,h=[];++v<t;)p&&p[v].run();v=-1,t=h.length}p=null,m=!1,a(e)}}function c(e,t){this.fun=e,this.array=t}function l(){}var u,f,d=e.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:o}catch(e){u=o}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var p,h=[],m=!1,v=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var o=1;o<arguments.length;o++)t[o-1]=arguments[o];h.push(new c(e,t)),1!==h.length||m||n(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},226:function(e,t,o){"use strict";var r=o(208);e.exports=function(e,t){r.forEach(e,function(o,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=o,delete e[r])})}},227:function(e,t,o){"use strict";var r=o(216);e.exports=function(e,t,o){var n=o.config.validateStatus;o.status&&n&&!n(o.status)?t(r("Request failed with status code "+o.status,o.config,null,o.request,o)):e(o)}},228:function(e,t,o){"use strict";e.exports=function(e,t,o,r,n){return e.config=t,o&&(e.code=o),e.request=r,e.response=n,e}},229:function(e,t,o){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var n=o(208);e.exports=function(e,t,o){if(!t)return e;var a;if(o)a=o(t);else if(n.isURLSearchParams(t))a=t.toString();else{var i=[];n.forEach(t,function(e,t){null!==e&&void 0!==e&&(n.isArray(e)&&(t+="[]"),n.isArray(e)||(e=[e]),n.forEach(e,function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),a=i.join("&")}return a&&(e+=(-1===e.indexOf("?")?"?":"&")+a),e}},230:function(e,t,o){"use strict";var r=o(208);e.exports=function(e){var t,o,n,a={};return e?(r.forEach(e.split("\n"),function(e){n=e.indexOf(":"),t=r.trim(e.substr(0,n)).toLowerCase(),o=r.trim(e.substr(n+1)),t&&(a[t]=a[t]?a[t]+", "+o:o)}),a):a}},231:function(e,t,o){"use strict";var r=o(208);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return o&&(n.setAttribute("href",t),t=n.href),n.setAttribute("href",t),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}var t,o=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");return t=e(window.location.href),function(o){var n=r.isString(o)?e(o):o;return n.protocol===t.protocol&&n.host===t.host}}():function(){return function(){return!0}}()},232:function(e,t,o){"use strict";function r(){this.message="String contains an invalid character"}function n(e){for(var t,o,n=String(e),i="",s=0,c=a;n.charAt(0|s)||(c="=",s%1);i+=c.charAt(63&t>>8-s%1*8)){if((o=n.charCodeAt(s+=.75))>255)throw new r;t=t<<8|o}return i}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=n},233:function(e,t,o){"use strict";var r=o(208);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,o,n,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(o)&&s.push("expires="+new Date(o).toGMTString()),r.isString(n)&&s.push("path="+n),r.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},234:function(e,t,o){"use strict";function r(){this.handlers=[]}var n=o(208);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){n.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},235:function(e,t,o){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var n=o(208),a=o(236),i=o(217),s=o(212);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=a(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},236:function(e,t,o){"use strict";var r=o(208);e.exports=function(e,t,o){return r.forEach(o,function(o){e=o(e,t)}),e}},237:function(e,t,o){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},238:function(e,t,o){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},239:function(e,t,o){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var o=this;e(function(e){o.reason||(o.reason=new n(e),t(o.reason))})}var n=o(218);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},240:function(e,t,o){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},773:function(e,t,o){var r=o(774);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);o(160)("b2674034",r,!0)},774:function(e,t,o){t=e.exports=o(159)(void 0),t.push([e.i,".over{z-index:5}",""])},775:function(e,t,o){"use strict";function r(e){return e=e.toFixed(2).split("."),e[0]="R$ "+e[0].split(/(?=(?:...)*$)/).join("."),e.join(",")}Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),a=o(221),i=o.n(a),s=localStorage.getItem("wsAtual");t.default={data:function(){return{canGoBack:window.history.length>1,lucro:[],familias:[],vendedores:[],dataInicial:"",dataFinal:"",agrup:"",familia:"",vendedor:"",produto:"",codTipo:"",composicao:!1,opened:!0,Produtos:[],itens:[],formas:[],ordem:"PorReais",config:{title:"",refresh:"true"===localStorage.getItem("refresh"),noHeader:"true"===localStorage.getItem("noHeader"),columnPicker:"true"===localStorage.getItem("columnPicker"),bodyStyle:{maxHeight:"500px"},rowHeight:localStorage.getItem("rowHeight")+"px",responsive:"true"===localStorage.getItem("responsive"),pagination:{rowsPerPage:15,options:[5,10,15,30,50,100]},messages:{noData:'<i class="material-icons">warning</i> Não há dados para exibir.',noDataAfterFiltering:'<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'},labels:{columns:"Colunas",allCols:"Todas",rows:"Linhas",selected:{singular:"item selecionado.",plural:"itens selecionados."},clear:"limpar seleção",search:"Buscar",all:"Todos"}},colunas:[{label:"Cód. Barras",field:"codBarra",sort:!0,filter:!0,type:"number",width:"100px"},{label:"Nome",field:"nomeProduto",width:"150px",sort:!0,filter:!0,type:"string"},{label:"Qtd.",field:"qtd",sort:!0,filter:!0,type:"number",width:"80px"},{label:"Preço",field:"venda",filter:!0,sort:!0,type:"number",width:"80px",format:function(e){return r(e)}},{label:"total",field:"totalItem",filter:!0,sort:!0,type:"number",width:"80px",format:function(e){return r(e)}}],pagination:"true"===localStorage.getItem("pagination"),rowHeight:parseInt(localStorage.getItem("rowHeight")),bodyHeightProp:localStorage.getItem("bodyHeightProp"),bodyHeight:parseInt(localStorage.getItem("bodyHeight")),dias:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]}},computed:{listaFamiliasProdutos:function(){var e=this.familias;return e.map(function(e){return{label:e.nome,value:e.codigo}})},listaProdutos:function(){for(var e=this.Produtos,t=[],o=0;o<e.length;o++){var r=e[o].nome,n=e[o].codigo;t.push({label:r,value:n})}return t},listaVendedores:function(){for(var e=this.vendedores,t=[],o=0;o<e.length;o++){var r=e[o].nome,n=e[o].codigoIdentificacao;t.push({label:r,value:n})}return t}},watch:{pagination:function(e){if(!e)return this.oldPagination=Object(n._32)(this.config.pagination),void(this.config.pagination=!1);this.config.pagination=this.oldPagination},rowHeight:function(e){this.config.rowHeight=e+"px"},bodyHeight:function(e){var t={};"auto"!==this.bodyHeightProp&&(t[this.bodyHeightProp]=e+"px"),this.config.bodyStyle=t},bodyHeightProp:function(e){var t={};"auto"!==e&&(t[e]=this.bodyHeight+"px"),this.config.bodyStyle=t}},methods:{goBack:function(){window.history.go(-1)},getLucro:function(){var e=this;if(""===this.dataInicial)return void n._31.create.negative("Selecione um período antes");var t="";""!==this.codTipo&&(t="&codTipo="+this.codTipo);var o="";""!==this.familia&&(o="&codFamilia="+this.familia),n.d.show({message:"Aguardando Dados..."}),i.a.get(s+"relatorio/obterRptProdutosPorML?dataInicial="+this.dataInicial+"&dataFinal="+this.dataFinal+o+t+"&"+this.ordem+"=true").then(function(t){if(console.log(t.data),e.lucro=t.data,e.lucro.value)return void n._31.create.negative(e.lucro.value);e.itens=e.lucro.vDet,e.opened=!1,n.d.hide()}).catch(function(e){console.log(e.response),n.d.hide()})},listarFamilias:function(){var e=this;n.d.show({message:"Aguardando Dados..."}),i.a.get(s+"produto/obterProdutosFamilia").then(function(t){n.d.hide(),e.familias=t.data}).catch(function(e){n.d.hide(),console.log(e)})},collapse:function(){!0===this.opened?this.opened=!1:this.opened=!0}},created:function(){this.listarFamilias()}}},776:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h5",[e._v("Lucro")]),e._v(" "),o("q-fixed-position",{staticClass:"over",attrs:{corner:"bottom-left",offset:[18,18]}},[o("q-btn",{attrs:{round:"",color:"primary"},on:{click:e.goBack}},[o("q-icon",{attrs:{name:"chevron_left"}})],1)],1),e._v(" "),o("div",{attrs:{id:"lista"}},[o("q-collapsible",{attrs:{opened:e.opened,icon:"filter_list",label:"Filtros"}},[o("q-radio",{attrs:{val:"PorReais",label:"Ordenar por mais vendidos em reais"},model:{value:e.ordem,callback:function(t){e.ordem=t},expression:"ordem"}}),o("br"),e._v(" "),o("q-radio",{attrs:{val:"PorQtd",label:"Ordenar por quantidade vendida"},model:{value:e.ordem,callback:function(t){e.ordem=t},expression:"ordem"}}),o("br"),e._v(" "),o("q-radio",{attrs:{val:"PorNome",label:"Ordenar por nome"},model:{value:e.ordem,callback:function(t){e.ordem=t},expression:"ordem"}}),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("q-select",{attrs:{"float-label":"Tipo de Produto",options:[{label:"Mercadoria para Revenda",value:1},{label:"Materia Prima",value:2},{label:"Item do Sistema",value:3},{label:"Mercadoria para Consumo",value:4},{label:"Fabricação para Venda",value:5},{label:"Venda Casada - Combo de Produtos",value:6}]},model:{value:e.codTipo,callback:function(t){e.codTipo=t},expression:"codTipo"}})],1),e._v(" "),o("div",{staticClass:"col-md-6"},[o("q-select",{attrs:{"float-label":"Família",options:e.listaFamiliasProdutos,filter:""},model:{value:e.familia,callback:function(t){e.familia=t},expression:"familia"}})],1)]),e._v(" "),o("div",{staticClass:"row"}),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("q-datetime",{attrs:{type:"date","float-label":"Data inicial",color:"black",format:"DD/MM/YYYY","ok-label":"OK","clear-label":"Limpar","cancel-label":"Cancelar","day-names":e.dias,"month-names":e.meses},model:{value:e.dataInicial,callback:function(t){e.dataInicial=t},expression:"dataInicial"}})],1),e._v(" "),o("div",{staticClass:"col"},[o("q-datetime",{attrs:{type:"date","float-label":"Data Final",color:"black",format:"DD/MM/YYYY","ok-label":"OK","clear-label":"Limpar","cancel-label":"Cancelar","day-names":e.dias,"month-names":e.meses},model:{value:e.dataFinal,callback:function(t){e.dataFinal=t},expression:"dataFinal"}})],1)]),e._v(" "),o("q-btn",{staticStyle:{"margin-bottom":"20px"},attrs:{color:"primary",rounded:""},on:{click:e.getLucro}},[e._v("\n                 Visualizar")])],1),e._v(" "),o("br"),e._v(" "),o("center",[o("h4",[e._v("Totais Gerais")]),e._v("\n          \n          "+e._s(e.lucro.periodo)+" "),o("br"),e._v(" "),o("table",{staticClass:"q-table responsive"},[o("thead",[o("tr",[o("th",{staticClass:"text-center"},[e._v("Custo Total")]),e._v(" "),o("th",{staticClass:"text-center"},[e._v("Venda Total")]),e._v(" "),o("th",{staticClass:"text-center"},[e._v("Lucro")]),e._v(" "),o("th",{staticClass:"text-center"},[e._v("ML Média")]),e._v(" "),o("th",{staticClass:"text-center"},[e._v("Total Vendido")]),e._v(" "),o("th",{staticClass:"text-center"},[e._v("Qtde Vendida")])])]),e._v(" "),o("tbody",[o("tr",[o("td",{staticClass:"text-center",attrs:{"data-th":"Custo Total"}},[e._v(e._s(e._f("formatMoney")(e.lucro.totalCusto)))]),e._v(" "),o("td",{staticClass:"text-center",attrs:{"data-th":"Venda Total"}},[e._v(e._s(e._f("formatMoney")(e.lucro.totalVendas)))]),e._v(" "),o("td",{staticClass:"text-center",attrs:{"data-th":"Lucro"}},[e._v(e._s(e._f("formatMoney")(e.lucro.lucroRS)))]),e._v(" "),o("td",{staticClass:"text-center",attrs:{"data-th":"ML Média"}},[e._v(e._s(e._f("formatPerc")(e.lucro.mlMedia)))]),e._v(" "),o("td",{staticClass:"text-center",attrs:{"data-th":"Total Vendido"}},[e._v(e._s(e._f("formatMoney")(e.lucro.totalItensVendidos)))]),e._v(" "),o("td",{staticClass:"text-center",attrs:{"data-th":"Qtde Vendida"}},[e._v(e._s(e.lucro.qtdVendida))])])])])]),e._v(" "),o("br"),o("br"),e._v(" "),o("q-data-table",{staticStyle:{"background-color":"white"},attrs:{data:e.itens,config:e.config,columns:e.colunas}}),e._v(" "),o("q-collapsible",{staticClass:"shadow-2",staticStyle:{"background-color":"white","margin-bottom":"20px"},attrs:{label:"Opções",icon:"settings"}},[o("q-field",{attrs:{icon:"widgets",label:"Recursos","label-width":4}},[o("div",{staticClass:"column group",staticStyle:{margin:"-5px -7px"}},[o("q-checkbox",{attrs:{label:"Atualizar tabela (refresh)"},model:{value:e.config.refresh,callback:function(t){e.config.refresh=t},expression:"config.refresh"}}),e._v(" "),o("q-checkbox",{attrs:{label:"Selecionar colunas"},model:{value:e.config.columnPicker,callback:function(t){e.config.columnPicker=t},expression:"config.columnPicker"}}),e._v(" "),o("q-checkbox",{attrs:{label:"Paginação"},model:{value:e.pagination,callback:function(t){e.pagination=t},expression:"pagination"}}),e._v(" "),o("q-checkbox",{attrs:{label:"Responsiva"},model:{value:e.config.responsive,callback:function(t){e.config.responsive=t},expression:"config.responsive"}}),e._v(" "),o("q-checkbox",{attrs:{label:"Sem Cabeçário"},model:{value:e.config.noHeader,callback:function(t){e.config.noHeader=t},expression:"config.noHeader"}})],1)]),e._v(" "),o("q-field",{attrs:{icon:"format_line_spacing",label:"Altura das linhas","label-width":4}},[o("q-slider",{attrs:{min:50,max:200,"label-always":"","label-value":e.rowHeight+"px"},model:{value:e.rowHeight,callback:function(t){e.rowHeight=t},expression:"rowHeight"}})],1),e._v(" "),o("q-field",{attrs:{icon:"content_paste",label:"Tamanho","label-width":4}},[o("div",{staticClass:"row no-wrap items-center"},[o("div",{staticClass:"col-auto",staticStyle:{"margin-top":"10px"}},[o("q-select",{attrs:{"float-label":"Style",options:[{label:"Auto",value:"auto"},{label:"Altura",value:"height"},{label:"Altura Min",value:"minHeight"},{label:"Altura Max",value:"maxHeight"}]},model:{value:e.bodyHeightProp,callback:function(t){e.bodyHeightProp=t},expression:"bodyHeightProp"}})],1),e._v(" "),o("q-slider",{staticClass:"col",attrs:{min:100,max:700,"label-always":"",disable:"auto"===e.bodyHeightProp,"label-value":e.bodyHeight+"px"},model:{value:e.bodyHeight,callback:function(t){e.bodyHeight=t},expression:"bodyHeight"}})],1)])],1),e._v(" "),o("br"),o("br"),o("br"),o("br")],1)],1)},staticRenderFns:[]}}});