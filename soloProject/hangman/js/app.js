//vue app: displays hangman pic and gameboard
var app = new Vue({
    el: '#app',
    data: {
        gameBoard: "hangman",
        hangmanPic: 'hangman.png'
    }
})

//---------------------------------------------------------------
//seting initial variables
//---------------------------------------------------------------
    //counts how many times a wrong letter has been guessed
    var score = 0;
    // bank of letters guessed
    var bank = [];
    //guess of player 2
    var guess = '';
    // sets answer, splits it into an array, and then finds the length of
    // the array to create anothe array with the correct number of dashes
    var answerInput = '';
    var answerArray = answerInput.split();
    var dashes = answerArray.length;
    var dashArray = [];
    var player = 1;
//---------------------------------------------------------------
//
//---------------------------------------------------------------




//---------------------------------------------------------------
// Draw canvas, rectangles, and dashes
//---------------------------------------------------------------

    //creates canvas that the rectangles will be on
    function setup(){
        var canvas = createCanvas(480, 320);
        canvas.parent('app');
      
    }

    // draw functions for rectangles, they are used to 
    // cover up the different body parts of the hangman guy
    function draw(){
        
        // Use color() function 
        let c = color('white'); 
        // Use fill() function to fill color 
        fill(c); 
        // use stroke() to make boarders white
        stroke('white');

        //draw rectangles according to current score of player
        if(score == 0){
            rect(249, 65, 40, 55); 
            rect(265, 115, 10, 150); 
            rect(218, 125, 50, 65); 
            rect(271.5, 125, 50, 65); 
            rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else if(score == 1){
            //rect(249, 65, 40, 55); 
            rect(265, 115, 10, 150); 
            rect(218, 125, 50, 65); 
            rect(271.5, 125, 50, 65); 
            rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else if(score == 2){
            //rect(249, 65, 40, 55); 
            //rect(265, 115, 10, 150); 
            rect(218, 125, 50, 65); 
            rect(271.5, 125, 50, 65); 
            rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else if(score == 3){
            //rect(249, 65, 40, 55); 
            //rect(265, 115, 10, 150); 
            //rect(218, 125, 50, 65); 
            rect(271.5, 125, 50, 65); 
            rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else if(score == 4){
            //rect(249, 65, 40, 55); 
            //rect(265, 115, 10, 150); 
            //rect(218, 125, 50, 65); 
            //rect(271.5, 125, 50, 65); 
            rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else if(score == 5){
            //rect(249, 65, 40, 55); 
            //rect(265, 115, 10, 150); 
            //rect(218, 125, 50, 65); 
            //rect(271.5, 125, 50, 65); 
            //rect(218, 225, 50, 84); 
            rect(271.5, 225, 50, 94);
        } else {
            //rect(249, 65, 40, 55); 
            //rect(265, 115, 10, 150); 
            //rect(218, 125, 50, 65); 
            //rect(271.5, 125, 50, 65); 
            //rect(218, 225, 50, 84); 
            //rect(271.5, 225, 50, 94);
        }
        
    }
//---------------------------------------------------------------
//
//---------------------------------------------------------------



//---------------------------------------------------------------
// setting answer and guessing answer
//---------------------------------------------------------------
    // player one setting answer
    function submitAnswer(){
        //saves answer as the one that player one inputed 
        answer = document.getElementById("answerInput").value; 
        answerArray = answer.split(""); 
        player = 2;
        //makes dashes based off answer submited
        for (var i = 1; i <= answer.length; i++){ 
            dashArray.push("_");
        }

        //display the dashes
        document.getElementById('answerDisplay').innerHTML = dashArray.join(' ');


        document.getElementById('answerInput').value='';
    }

    //submit guess and check against answer and then do stuff if wrong
    function submit(){
        // gets player 2's guess from the DOM
        guess = document.getElementById("guessInput").value;
        // compares the guess with the array of the original answer that has been set
        var result = answerArray.includes(guess); 
        //if it is in the array it will change the dash that is displayed 
        // to the guessed letter, if not, score is increased and one of the 
        //rectangles above is removed
        if(result == true && guess !== ""){ 
            var x = answerArray.indexOf(guess);
            dashArray[x] = guess;
        } else{
            score = score + 1;
            // adds letter to bank of guessed letters
            bank.push(guess);
            
        }
        document.getElementById('answerDisplay').innerHTML = dashArray.join(' '); 
        
        document.getElementById('guessInput').value='';
        console.log(score);
        
    }

    function mousePressed() {
        
        console.log("test");
      }
//---------------------------------------------------------------
//
//---------------------------------------------------------------