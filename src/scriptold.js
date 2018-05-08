let startTime2 = "";
let startTimeInput = "";
let timeElapsed = "";
let expectedEndTime = "";
let expectedEndTimeTest = ":00";
let hourRate = "19";
let tax = "";
let currentDate = "";
let currentTime = "";
let controlNumber = 0;
$( document ).ready(function() {
    
    $('#ok-button').click(function(){
        controlNumber = 1;
        getUserData();
        if(checkIfBlank() === true){
            $('#input-box').css("display","none");
           startTime = $('#start').val();
           $('#time-start-numbers').html(startTimeInput+':00');
           
        }
    })

    function getUserData(){
        if(controlNumber === 1){
            startTimeInput = $('#start').val();
            checkIfValidFormat(startTimeInput);
            expectedEndTime = $('#end').val();
            hourRate = $('#rate').val();
            if(($('#tax').val())!==""){
                tax = $('#tax').val();
            }
            
        }
        
    }

    $('#start, #end, #rate').blur(function(){
        if(checkIfBlank() === true){
            $('#ok-button').removeClass("disabled");
            $('#ok-button').addClass("active");
        }
    });

    function checkIfBlank(){
        if($('#start').val() !== "" && $('#end').val() !== ""
         && $('#rate').val() !== ""){
             return true;
         }
    }

    function setTimeFormat(timeUnit){
        if(timeUnit<10){
            let zero = '0';
            timeUnit = zero.concat(timeUnit);
        }
        return timeUnit;
    }

    (function showCurrentTime(){
        currentDate = new Date($.now());
            currentTime = setTimeFormat(currentDate.getHours()) + ':' + setTimeFormat(currentDate.getMinutes()) + ':' +
            setTimeFormat(currentDate.getSeconds());
                $('#current-time-numbers').html(currentTime);
            
       
        var t = setTimeout(showCurrentTime, 500);

    })();

    (function timeElapsedFunction(){
        if(controlNumber === 1){
            startTime = startTimeInput.split(":");
            let currentTimeSplitted = currentTime.split(":");
            let currentTimeMili = (currentTimeSplitted[0] * (60000 * 60))+(currentTimeSplitted[1] * 60000) + (currentTimeSplitted[2] * 1000);
            let startTime2 =  (startTime[0] * (60000 * 60))+(startTime[1] * 60000);
           
    
            timeElapsed = currentTimeMili - startTime2;
            let tempTime = timeElapsed;
            
            
          
            $('#time-elapsed-numbers').html( msToTime(tempTime));
        }
       
        var t = setTimeout(timeElapsedFunction, 500);
    })();

    (function timeRemaining(){
        if(controlNumber === 1){
            let expectedEndTimeSplitted = expectedEndTime.split(":");
            let expectedEndTimeMili = (expectedEndTimeSplitted[0] * (60000 * 60))+(expectedEndTimeSplitted[1] * 60000);
            let currentTimeSplitted = currentTime.split(":");
            let currentTimeMili = (currentTimeSplitted[0] * (60000 * 60))+(currentTimeSplitted[1] * 60000) + (currentTimeSplitted[2] * 1000);
            let timeLeft = expectedEndTimeMili - currentTimeMili;
            $('#time-left-numbers').html( msToTime(timeLeft));
    //progress bar starts here
    let startTime2 =  (startTime[0] * (60000 * 60))+(startTime[1] * 60000);
    let progressBarWidthZero = expectedEndTimeMili - startTime2;
    let progressBarWidthHundred = 0;
    let progressBarWidthCurrent = "";
    // count percent :timeElapsed/(progressBarWidthZero/100)
    
    let currentPercent = parseInt(timeElapsed/(progressBarWidthZero/100));
    $('#progress').css('width', currentPercent+'%');
    console.log('expectedEndTimeMili '+expectedEndTimeMili);
    console.log('percent '+currentPercent);
    console.log('startTime2 '+ startTime2);
    console.log(progressBarWidthZero);
    //progress bar ends here
        }
      

        var t = setTimeout(timeRemaining, 500);
    })();

    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds;
    }

    (function earnings(){
        
        let earned = (Math.round(((hourRate/3600)*(timeElapsed/1000)) * 100) / 100).toFixed(2);
        if(($("#lunch-yes").prop("checked"))=== true){
            earned = earned - hourRate/2;
            earned = earned.toFixed(2);
        } 
        let taxDeduct = (earned/100)*tax;
        taxDeduct = taxDeduct.toFixed(2);
        let realEarned = earned-taxDeduct;
        realEarned = realEarned.toFixed(2);
       
        $('#money-earned-numbers').html(realEarned+'$');
        if(tax!==""){
            $('#tax-numbers').html(taxDeduct+'$');
            $('#gross-numbers').html(earned+'$');
        }
       
        var t = setTimeout(earnings, 500);
        
    })();

    function checkIfValidFormat(time){
        let valid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if(valid.test(time) === true){
           return true;
        }else{
            return false;
        }
    }


    $('#data-edit').click(function(){
        $('#input-box').css("display","block");
    });


    

});


// USE THIS LATER - ALWAYS SHOW TWO DECIMAL PLACEES -    parseFloat(Math.round(num3 * 100) / 100).toFixed(2);