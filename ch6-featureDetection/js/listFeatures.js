$(document).ready(() => {
   for (var key in Modernizr)  {
       if (typeof Modernizr[key] == 'boolean'){
           console.log(key + "::" + Modernizr[key]);
           if(Modernizr[key]){
               $("#supported-features").append("<b>"+key+"</b><br/>");
           }else{
               $("#unsupported-features").append("<b>"+key+"</b><br/>");
           }
       }
   }
});