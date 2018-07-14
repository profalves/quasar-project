<template>
  <div>
    {{response}}
  </div>

</template>
<script>

function Encripta(dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
	for (i=0;i<dados.length; i++){
		j++;
		l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j===50){
			j=1;
		}
		if (l>255){
			l-=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}

function Asc(String){
	return String.charCodeAt(0);
}
 
function Chr(AsciiNum){
	return String.fromCharCode(AsciiNum)
}

const NomeDB = Encripta('pedroTestes')

import axios from 'axios'

  
export default {
  data(){
    return{
      response: 'requisitando...'  
    }
  },
  mounted(){
    axios({
      "url": "http://192.168.0.200/WSV3/api/token",
      //"url": "http://192.168.0.200:29755/api/token",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache"
      },
      "data": "username=" + NomeDB + "&grant_type=password"
    })
    .then((res)=>{
      console.log(res)
      this.response = res.data
    })
    .catch((error)=>{
      console.log(error)
      this.response = error
    })
  }
}
</script>