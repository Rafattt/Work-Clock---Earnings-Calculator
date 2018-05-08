(function earnings(){
        
    let earned = (Math.round(((hourRateInput/3600)*(timeElapsed/1000)) * 100) / 100).toFixed(2);
    if(($("#lunch-yes").prop("checked"))=== true){
        earned = earned - hourRateInput/2;
        earned = earned.toFixed(2);
    } 
    let taxDeduct = (earned/100)*taxInput;
    taxDeduct = taxDeduct.toFixed(2);
    let realEarned = earned-taxDeduct;
    realEarned = realEarned.toFixed(2);
   
    $('#money-earned-numbers').html(realEarned+'$');
    if(taxInput!==""){
        $('#tax-numbers').html(taxDeduct+'$');
        $('#gross-numbers').html(earned+'$');
    }
   
    var t = setTimeout(earnings, 500);
    
})();