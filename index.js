
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

$(".inst").click(function(){
  alert("you have to follow the color sequence");
});


$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence()
{
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level " + level);
   var randomnumber=Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomnumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}


function checkAnswer(currentlevel)
{
   if(userClickedPattern[currentlevel]===gamePattern[currentlevel])
   {
     if(gamePattern.length-1===userClickedPattern.length-1)
     {
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   }
   else
   {
      Startover();
   }
}


function playSound(event)
{
  var audio = new Audio("sounds/"+event+".mp3");
  audio.play();
}


function animatePress(event)
{
    $("#"+event).addClass("pressed");
    setTimeout(function(){
      $("#"+event).removeClass("pressed");
    },100);
}


function Startover()
{
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  level=0;
  started=false;
  gamePattern=[];
}
