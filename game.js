//alert ("Hello");
var level = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var score = 0

var x = 0


// Adding Keyboard Shortcuts To The Game
document.addEventListener('keyup',shortcut)

function shortcut() {
  if(event.keyCode=='82') {
    var userChosenColour = 'red'
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
  
  else if(event.keyCode=='71') {
    var userChosenColour = 'green'
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }

  else if(event.keyCode=='66') {
    var userChosenColour = 'blue'
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }

  else if(event.keyCode=='89') {
    var userChosenColour = 'yellow'
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
}

// This dictionary holds the record of time available for every level.
dict = {}
var time = 3
for(var i=1; i<1000; i++) {
  dict[i] = time
  time+=5
}

function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
    
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
   
})


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" + " " + level);
  $('#score').text("")
  $('#level').text("")
  $("#type").text("")
  $("#timer").text("")
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}

var start = false;
var id = 0

//  Timer set .
function timer() {
  x+=1
  if(x<=parseInt(dict[level])) {
  $('#timer').text(x)
  }

  else {
    clearInterval(id)
    startOver()
    $('#level-title').text("Game Over, To Restart The Game Press A Key")
    $('#score').text('Your Total score is ' + score)
    $('#type').text('You are Too Slow!!!')
    x=0
    score=0
  }
}

$(document).on("keypress", function(){
    if (start == false){
      nextSequence();
      start = true;
      id = setInterval(timer,1000)
      x=0
      score = 0

    } 
})


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      
      score+=5
      $('#score').html('Score : ' + score)
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  else {
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
    score-=10
    $("body").addClass ("game-over");
    setTimeout (function(){
      $("body").removeClass("game-over");
    }, 200);
    // $("h1").text("Game Over, Press Any Key to Restart");
    $("#level-title").text("Game Over, Press A Key To Restart The Game")
    $("#timer").text("You are able to survive in the game for " + x + " seconds ")
    $('#score').text("Your Total Score is : " + score)
    $('#level').text("You survived Till LEVEL :" +  level)
    if(score<50) {
      $("#type").text("You Have a very bad memory")
    }

    else if(score>50 && score<100) {
      $('#type').text("You have the potential but need to work upon your memory skills.")
    }

    else if(score>100 && score<150) {
      $("#type").text("You have a good memory but improvement required.")
    }

    else if(score>150 && score<200) {
        $("#type").text("You have a very good memory!! Keep It Up.")
    }

    else if(score>=200) {
      $("#type").text("Bravo!!! You Have a Wonderful Memory.")
    }
    
    startOver();
    
  }
}

function startOver(){
  level = 0;
  start = false;
  gamePattern = [];
  clearInterval(id)
}
