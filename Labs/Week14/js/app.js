var soundsButtons = document.getElementById("soundButtons");


var sounds = [
    "chimes_long", "click_clock_loop", "pop_10", "puff", "rustle_5"
];


var soundElements = [];

//loop through these guys ^
sounds.forEach((soundURL, idx) => {
    //tje sound
    var newSound = new Audio("sounds/" + soundURL + ".mp3");
    //stoer in array
    soundElements.push(newSound)
    
    //buttons for te sound
    var newButton = document.createElement("button");
    newButton.innerHTML = soundURL;

    //store the sound's index
    newButton.setAttribute("data-sound-id", idx);
    //add to page
    soundButtons.appendChild(newButton);

    //listen for a click on button
    newButton.addEventListener("click", playSoundInArray);
})

function playSoundInArray(event) {
    //get sound index
    var soundIndex = Number( event.target.getAttribute("data-sound-id"));

    //get soudn from array
    var selectedSound = soundElements[soundIndex];

    //play the soudn
    selectedSound.play();

}


//get audio tag 
/*
var myAudio = document.getElementById("myAudio");

function playAudio(){
    myAudio.play();
}

function stopMainAudio(){
    myAudio.pause();
    myAudio.currentTime = 0;
} 
*/
