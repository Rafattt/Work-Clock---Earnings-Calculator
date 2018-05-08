let startTimeInput = ""; // var to store value from input field. hour and minutes of start
let startTime = ""; //store time of start after conversion to actual time units
let timeElapsed = ""; //time elapsed from start to current time
let timeLeft = ""; //time left to end
let expectedEndTimeInput = ""; // var to store value from input field. hour and minutes of expected end
let hourRateInput = ""; // var to store value from input field. rate hours in dollars
let taxInput = "" // var to store value from input field. tax in percent
let currentDate = ""; // var to store current date from Date.now()
let currentTime = ""; // currentDate converted to hh:mm:ss format
let validArray = [0,0,0];
let controlNumber = 0; // 0 if data wasn't entered 1 if data was entered, determines if starts "timeRemaining" and "timeElapsed" function
let progressBarWidthZero = "";
let currentPercent = 0;
const midnight = 86400000; //midnight (24:00) in miliseconds, needed for calcuating hours between two days
    
$( document ).ready(function() {

    $('#ok-button').click(function(){  //clicking "ok" button in input box starting this:
        getUserData();
        if(checkIfBlank() === true){
           
           startTime = $('#start').val();
           $('#time-start-numbers').html(startTimeInput+':00');
           
        }
        incorrectInfo('#start-time-incorrect', startTimeInput, validArray, 0);
        incorrectInfo('#end-time-incorrect', expectedEndTimeInput, validArray, 1);
        incorrectNumeric('#rate-incorrect', hourRateInput, validArray, 2);
        controlNumber = 1;
        if(($('#tax').val())!==""){
            incorrectNumeric('#tax-incorrect', taxInput, validArray, 3);
        } else { //if tax field is empty taxInput is 0
            taxInput = 0;
        }
        //incorrectNumeric('#tax-incorrect', taxInput, validArray, 3);
        if(validArray[0] === 1 && validArray[1] === 1 && validArray[2] === 1){ //if format is correct in 3 fields input window will disapear after clicking "ok" button
            $('#input-box').css("display","none");
        }
    })

    function checkIfBlank(){ //checking if input fields are blank
        if($('#start').val() !== "" && $('#end').val() !== ""
         && $('#rate').val() !== ""){
             return true;
         }
    }

   (function enableDisbaleOk(){ //checking if ok button should be active
    if(checkIfBlank() === true){
        $('#ok-button').removeClass("disabled");
        $('#ok-button').addClass("active");
    }
    let t = setTimeout(enableDisbaleOk, 500);
   })();
        
    function getUserData(){ //getting data from input fields and set it as variables
     
            startTimeInput = $('#start').val();
            expectedEndTimeInput = $('#end').val();
            hourRateInput = $('#rate').val();
            if(($('#tax').val())!==""){
                taxInput = $('#tax').val();
            }
    }


    function checkIfValidFormat(time){ //check if entered time format is valid
        let valid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if(valid.test(time) === true){
           return true;
        }else{
            return false;
        }
    }

    function incorrectInfo(id, input, valid, index){ //checking if entered info is in correct format and show information if not (format hh:mm)
        if(checkIfValidFormat(input)=== false){
            $(id).removeClass('inncorrect').addClass('incorrect-active');
            valid[index]=0;
        } else {
            $(id).removeClass('incorrect-active').addClass('inncorrect');
            valid[index]=1;
            return true;
        }
    }

    function incorrectNumeric(id, input, valid, index){ //checking if entered info is in correct format and show information if not (numbers)
        if( $.isNumeric(input)=== false){
            $(id).removeClass('inncorrect').addClass('incorrect-active');
            valid[index]=0;
        } else {
            $(id).removeClass('incorrect-active').addClass('inncorrect');
            valid[index]=1;
            return true;
        }
    }


});