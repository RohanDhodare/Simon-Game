
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

//boolean var is declared to keep track of whether game has started or not.
var gameStarted = false;

// level variable is created to keep tracks of level
var level = 0;

//jquery is used to detect a keyboard key pressed and call nextSequence function
$(document).on("keydown",function(){
    if(gameStarted === false){
        //when the game starts first thing that changes is the title to "Level 1"
        $("h1").text("Level "+level);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").on("click",function(){
    //here this returns the object details which was clicked and $(this) is used to select it using jQuery 
    // and .attr is used to get the id
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    //here we pass the last index of user's answer array
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){

    //after 1 level is passed the user's array is emptied as for new level user need to click all the buttons 
    //starting from level 1 - that's how simon game works
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    //random number between 0 to 3 is stored in the randomNumber variable
    var randomNumber = Math.floor(Math.random() * 4);

    //with the help of randomNumber different values of buttonColors array is stored in randomChosedColor variable 
    var randomChosenColor = buttonColors[randomNumber];

    //push method is used append new collor to the array
    gamePattern.push(randomChosenColor);

    //jQuery used to do some animations on the button using the ID
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

    //javascript switch case to play the sound
    
    // FIRST Way to do so:
    // switch(randomChosenColor){
    //     case "blue":
    //         var blue = new Audio("sounds/blue.mp3");
    //         blue.play();
    //         break;
    //     case "green":
    //         var green = new Audio("sounds/green.mp3");
    //         green.play();
    //         break;
    //     case "red":
    //         var red = new Audio("sounds/red.mp3");
    //         red.play();
    //         break;
    //     case "yellow":
    //         var yellow = new Audio("sounds/yellow.mp3");
    //         yellow.play();
    //         break;            
    //     default:
    //         console.log("error");
    //         break;
    // }

    //Another way to do the same
    // var audio = new Audio("sounds/"+randomChosenColor + ".mp3");
    // audio.play();

    // calling the function created
    playSound(randomChosenColor);
}



// we have refactored our code to play the sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to add and remove a class to create animation
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

//this function has whole logic of the game where we check the answers and if true call the next level 
//if wrong then we startOver the game from scratch
function checkAnswer(currentLevel){
    //here the most recently clicked button by user is checked with the game pattern by the indexed passed by user
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        
        //if the both the arrays length is equal that means the user has passed the level and can proceed to next lvl
        //hence we call the nextSequence in 1 sec time
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//here we reset the values of all variable in order to do a fresh start - as we set the value of gameStarted to false 
//hence our keydown event listener becomes active and automatically the game starts again
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}


