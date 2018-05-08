function setTimeFormat(timeUnit){ //if time unit is smaller than 10 this function add "0" as first char
        if(timeUnit<10){
            let zero = '0';
            timeUnit = zero.concat(timeUnit);
        }
        return timeUnit;
    }

    (function showCurrentTime(){ //geting current time, converting it to "HH:MM:SS" format and displaying on website
        currentDate = new Date($.now());
            currentTime = setTimeFormat(currentDate.getHours()) + ':' + setTimeFormat(currentDate.getMinutes()) + ':' +
            setTimeFormat(currentDate.getSeconds());
                $('#current-time-numbers').html(currentTime);
        let t = setTimeout(showCurrentTime, 500); //starting this function every 500 miliseconds
    })();

(function timeElapsedFunction(){ //shows how much time elapsed from start, converting time entered by user (hh:mm format) to ms
    if(controlNumber === 1){
        startTime = startTimeInput.split(":");
        let currentTimeSplitted = currentTime.split(":");
        let currentTimeMili = (currentTimeSplitted[0] * (60000 * 60))+(currentTimeSplitted[1] * 60000) + (currentTimeSplitted[2] * 1000);
        let startTime2 =  (startTime[0] * (60000 * 60))+(startTime[1] * 60000);
        if(startTime2 >= currentTimeMili){ //calculating time elapsed for work started day earlier 
            timeElapsed = (midnight - startTime2)+currentTimeMili;
        }else{
            timeElapsed = currentTimeMili - startTime2;
        }
      
        $('#time-elapsed-numbers').html( msToTime(timeElapsed));
    }
   
    let t = setTimeout(timeElapsedFunction, 500);
})();

    (function timeRemaining(){
        if(controlNumber === 1){
            let expectedEndTimeSplitted = expectedEndTimeInput.split(":");
            let expectedEndTimeMili = (expectedEndTimeSplitted[0] * (60000 * 60))+(expectedEndTimeSplitted[1] * 60000);
            let currentTimeSplitted = currentTime.split(":");
            let currentTimeMili = (currentTimeSplitted[0] * (60000 * 60))+(currentTimeSplitted[1] * 60000) + (currentTimeSplitted[2] * 1000);
            
            if(expectedEndTimeMili <= currentTimeMili){
                timeLeft = (midnight-currentTimeMili)-(midnight-expectedEndTimeMili);
            }else{
                timeLeft = expectedEndTimeMili - currentTimeMili;
            }
           if(timeLeft>0){
                $('#time-left-numbers').html( msToTime(timeLeft));
           }else{
                $('#time-left-numbers').html('00:00:00');
                $('#time-left-numbers').css('color','red');
                setInterval(function(){
                    $("#time-left-numbers").fadeOut(500);
                    $("#time-left-numbers").fadeIn(500);
                 },1000)
           }
            
    //progress bar starts here
    let startTime2 =  (startTime[0] * (60000 * 60))+(startTime[1] * 60000);
   
    if(expectedEndTimeMili < startTime2){
        progressBarWidthZero = expectedEndTimeMili - (startTime2-midnight);
        console.log("here");
    }else if(expectedEndTimeMili === startTime2){
        progressBarWidthZero = midnight;
    } else {
        progressBarWidthZero = expectedEndTimeMili - startTime2;
    }
   
    let progressBarWidthHundred = 0;
    let progressBarWidthCurrent = "";
    if(currentTimeMili< expectedEndTimeMili){ //calculating width of proggress bar while current time is smaller than ending time
        currentPercent = parseInt(timeElapsed/(progressBarWidthZero/100));// calculating how much time of work elapsed (in percents)
    }else{
        currentPercent = 100;
        $('#progress').css('background-color', 'red');
        
    }
    
    $('#progress').css('width', currentPercent+'%');
    //progress bar ends here
        }
      

        let t = setTimeout(timeRemaining, 500);
    })();

    function msToTime(duration) { //converting miliseconds to seconds, minutes and hours
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds;
    }

    function workOverNight(){
        if(expectedEndTimeMili < currentTimeMili){
            timeLeft = (midnight-currentTimeMili)-(midnight-expectedEndTimeMili);
        }else{
            timeLeft = expectedEndTimeMili - currentTimeMili;
        }
    }