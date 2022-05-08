var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
// var userClickedPattern=[];
var f=1;
var level=0;
var seqCheckingIndex=0;
function soundEffect(i) {
  switch (i) {
    case "green":
      var audio=new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio=new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio=new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "blue":
      var audio=new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "wrong":
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      break;
    default:

  }
}
function pressEffect(i){
  $("#"+i).addClass("pressed");
  setTimeout(function() {
    $("#"+i).removeClass("pressed");
  },100);
}

function changeHeading(levelNo){
  var heading=$("#level-title");
  if(levelNo===-1){
    heading.text("Game over! Press ANY key to restart!");
  }
  else{
    heading.text("Level "+levelNo);
  }
}

function nextSequence(){
  level++;
  changeHeading(level);
  randomNumber=Math.floor(Math.random()*4);
  randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  soundEffect(randomChosenColor);
}
$(".btn").click(function() {
  var userChosenColor=$(this).attr("id");
  // userClickedPattern.push(userChosenColor);
  soundEffect(userChosenColor);
  pressEffect(userChosenColor);
  if(userChosenColor!==gamePattern[seqCheckingIndex]){
    changeHeading(-1);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },100);
    soundEffect("wrong");
    f=1;
    gamePattern=[];
    // userClickedPattern=[];
    level=0;
    seqCheckingIndex=0;
  }
  seqCheckingIndex++;
  if(seqCheckingIndex==gamePattern.length){
    // userClickedPattern=[];
    seqCheckingIndex=0;
    setTimeout(nextSequence,1000);
  }
});

$(document).keyup(function() {
  if (f) {
    nextSequence();
    f=!f;
  }
});
