webpackJsonp([22],{194:function(e,t,r){function n(e){r(753)}var o=r(7)(r(755),r(756),n,"data-v-2f6f60a0",null);e.exports=o.exports},208:function(e,t,r){"use strict";function n(e){return"[object Array]"===_.call(e)}function o(e){return"[object ArrayBuffer]"===_.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"==typeof e}function l(e){return"[object Date]"===_.call(e)}function p(e){return"[object File]"===_.call(e)}function h(e){return"[object Blob]"===_.call(e)}function d(e){return"[object Function]"===_.call(e)}function m(e){return f(e)&&d(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function w(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||n(e)||(e=[e]),n(e))for(var r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,r){"object"==typeof t[r]&&"object"==typeof e?t[r]=x(t[r],e):t[r]=e}for(var t={},r=0,n=arguments.length;r<n;r++)w(arguments[r],e);return t}function b(e,t,r){return w(t,function(t,n){e[n]=r&&"function"==typeof t?C(t,r):t}),e}var C=r(214),E=r(223),_=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:o,isBuffer:E,isFormData:i,isArrayBufferView:a,isString:s,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:p,isBlob:h,isFunction:d,isStream:m,isURLSearchParams:v,isStandardBrowserEnv:y,forEach:w,merge:x,extend:b,trim:g}},212:function(e,t,r){"use strict";(function(t){function n(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=r(208),i=r(226),a={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=r(215):void 0!==t&&(e=r(215)),e}(),transformRequest:[function(e,t){return i(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(n(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(n(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){s.headers[e]={}}),o.forEach(["post","put","patch"],function(e){s.headers[e]=o.merge(a)}),e.exports=s}).call(t,r(225))},214:function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},215:function(e,t,r){"use strict";var n=r(208),o=r(227),i=r(229),a=r(230),s=r(231),u=r(216),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(232);e.exports=function(e){return new Promise(function(t,f){var l=e.data,p=e.headers;n.isFormData(l)&&delete p["Content-Type"];var h=new XMLHttpRequest,d="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||s(e.url)||(h=new window.XDomainRequest,d="onload",m=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var v=e.auth.username||"",g=e.auth.password||"";p.Authorization="Basic "+c(v+":"+g)}if(h.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[d]=function(){if(h&&(4===h.readyState||m)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in h?a(h.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?h.response:h.responseText,i={data:n,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:r,config:e,request:h};o(t,f,i),h=null}},h.onerror=function(){f(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var y=r(233),w=(e.withCredentials||s(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;w&&(p[e.xsrfHeaderName]=w)}if("setRequestHeader"in h&&n.forEach(p,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),f(e),h=null)}),void 0===l&&(l=null),h.send(l)})}},216:function(e,t,r){"use strict";var n=r(228);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},217:function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},218:function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},221:function(e,t,r){e.exports=r(222)},222:function(e,t,r){"use strict";function n(e){var t=new a(e),r=i(a.prototype.request,t);return o.extend(r,a.prototype,t),o.extend(r,t),r}var o=r(208),i=r(214),a=r(224),s=r(212),u=n(s);u.Axios=a,u.create=function(e){return n(o.merge(s,e))},u.Cancel=r(218),u.CancelToken=r(239),u.isCancel=r(217),u.all=function(e){return Promise.all(e)},u.spread=r(240),e.exports=u,e.exports.default=u},223:function(e,t){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function n(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(r(e)||n(e)||!!e._isBuffer)}},224:function(e,t,r){"use strict";function n(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var o=r(212),i=r(208),a=r(234),s=r(235),u=r(237),c=r(238);n.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},i.forEach(["delete","get","head","options"],function(e){n.prototype[e]=function(t,r){return this.request(i.merge(r||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){n.prototype[e]=function(t,r,n){return this.request(i.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=n},225:function(e,t){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function i(e){if(l===clearTimeout)return clearTimeout(e);if((l===n||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{return l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}function a(){m&&h&&(m=!1,h.length?d=h.concat(d):v=-1,d.length&&s())}function s(){if(!m){var e=o(a);m=!0;for(var t=d.length;t;){for(h=d,d=[];++v<t;)h&&h[v].run();v=-1,t=d.length}h=null,m=!1,i(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var f,l,p=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(e){f=r}try{l="function"==typeof clearTimeout?clearTimeout:n}catch(e){l=n}}();var h,d=[],m=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];d.push(new u(e,t)),1!==d.length||m||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},226:function(e,t,r){"use strict";var n=r(208);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},227:function(e,t,r){"use strict";var n=r(216);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},228:function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e}},229:function(e,t,r){"use strict";function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=r(208);e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(o.isURLSearchParams(t))i=t.toString();else{var a=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),a.push(n(t)+"="+n(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},230:function(e,t,r){"use strict";var n=r(208);e.exports=function(e){var t,r,o,i={};return e?(n.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+r:r)}),i):i}},231:function(e,t,r){"use strict";var n=r(208);e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return r&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(r){var o=n.isString(r)?e(r):r;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},232:function(e,t,r){"use strict";function n(){this.message="String contains an invalid character"}function o(e){for(var t,r,o=String(e),a="",s=0,u=i;o.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&t>>8-s%1*8)){if((r=o.charCodeAt(s+=.75))>255)throw new n;t=t<<8|r}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=o},233:function(e,t,r){"use strict";var n=r(208);e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},234:function(e,t,r){"use strict";function n(){this.handlers=[]}var o=r(208);n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},235:function(e,t,r){"use strict";function n(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=r(208),i=r(236),a=r(217),s=r(212);e.exports=function(e){return n(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return n(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(n(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},236:function(e,t,r){"use strict";var n=r(208);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},237:function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},238:function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},239:function(e,t,r){"use strict";function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new o(e),t(r.reason))})}var o=r(218);n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n(function(t){e=t}),cancel:e}},e.exports=n},240:function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},753:function(e,t,r){var n=r(754);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(160)("3e2efb66",n,!0)},754:function(e,t,r){t=e.exports=r(159)(void 0),t.push([e.i,"@media (max-height:540px){#table[data-v-2f6f60a0]{margin-top:10px;max-width:100%;max-height:400px;line-height:100%;overflow:scroll}}@media (min-height:550px){#table[data-v-2f6f60a0]{margin-top:10px;max-width:100%;max-height:420px;line-height:100%;overflow:scroll}}@media (min-height:730px){#table[data-v-2f6f60a0]{margin-top:10px;max-width:100%;max-height:590px;line-height:100%;overflow:scroll}}#table[data-v-2f6f60a0]{margin-top:10px;max-width:100%;max-height:auto;line-height:100%;overflow:scroll}table[data-v-2f6f60a0]{border-collapse:collapse;border:1px solid #666;width:100%}",""])},755:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=r(221),i=r.n(o),a=localStorage.getItem("wsAtual");t.default={data:function(){return{caixa:[],meses:[{label:"Janeiro",value:1},{label:"Fevereiro",value:2},{label:"Março",value:3},{label:"Abril",value:4},{label:"Maio",value:5},{label:"Junho",value:6},{label:"Julho",value:7},{label:"Agosto",value:8},{label:"Setembro",value:9},{label:"Outubro",value:10},{label:"Novembro",value:11},{label:"Dezembro",value:12}],mes:"",misc:"highlight",separator:"cell",stripe:"odd",type:"none",gutter:"none"}},computed:{computedClasses:function(){var e=[];return this.misc.includes("bordered")&&e.push("bordered"),this.misc.includes("highlight")&&e.push("highlight"),"none"!==this.separator&&e.push(this.separator+"-separator"),"none"!==this.stripe&&e.push("striped-"+this.stripe),"none"!==this.type&&e.push(this.type),"none"!==this.gutter&&e.push(this.gutter),e}},methods:{getCaixaMes:function(){var e=this;n.d.show({message:"Aguardando Dados..."}),i.a.get(a+"caixa/obterCaixaMes?Mes="+this.mes).then(function(t){e.caixa=t.data,n.d.hide()}).catch(function(e){console.log(e.response),n.d.hide()})},irFechamento:function(e){localStorage.setItem("codCaixa",e.codigo),localStorage.setItem("cadMode","edit"),"OK"===e.status?this.$router.push({path:"/fechamento"}):this.$router.push({path:"/fechamento?a=aberto"})}}}},756:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("q-select",{attrs:{"float-label":"Mês",options:e.meses},on:{change:e.getCaixaMes},model:{value:e.mes,callback:function(t){e.mes=t},expression:"mes"}}),e._v(" "),r("div",{attrs:{id:"table"}},[r("table",{staticClass:"q-table",class:e.computedClasses,staticStyle:{"margin-left":"1px"}},[e._m(0),e._v(" "),r("tbody",e._l(e.caixa,function(t){return r("tr",[r("td",{attrs:{"data-th":"Name"}},[e._v(e._s(e._f("formatDate")(t.abertura)))]),e._v(" "),r("td",{attrs:{"data-th":"Name"}},[e._v(e._s(e._f("formatDate")(t.fechamento)))]),e._v(" "),r("td",{attrs:{"data-th":"Name"}},[e._v(e._s(t.operador))]),e._v(" "),r("td",{attrs:{"data-th":"Name"}},[e._v(e._s(t.status))]),e._v(" "),r("td",[r("q-btn",{attrs:{color:"primary",rounded:"",small:""},on:{click:function(r){e.irFechamento(t)}}},[e._v("\n                  abrir\n              ")])],1)])}))])])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",[r("tr",[r("th",[e._v("Abertura")]),e._v(" "),r("th",[e._v("Fechamento")]),e._v(" "),r("th",[e._v("Operador")]),e._v(" "),r("th",[e._v("Status")]),e._v(" "),r("th",[e._v("Ver Caixa")])])])}]}}});