export default{
  encripta(dados){
    var mensx="";
    var l;
    var i;
    var j=0;
    var ch;
    ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
    for (i=0;i<dados.length; i++){
        j++;
        l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
        if (j==50){
            j=1;
        }
        if (l>255){
            l-=256;
        }
        mensx+=(Chr(l));
    }
    return mensx;
  },
  descripta(dados){
      var mensx="";
      var l;
      var i;
      var j=0;
      var ch;
      ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
      for (i=0; i<dados.length;i++){
          j++;
          l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
          if (j==50){
              j=1;
          }
          if (l<0){
              l+=256;
          }
          mensx+=(Chr(l));
      }	
      return mensx;
  },
  Asc(String){
      return String.charCodeAt(0);
  },
  Chr(AsciiNum){
      return String.fromCharCode(AsciiNum)
  }
}