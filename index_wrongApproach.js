var btnSeq=[];
var level=1;
var f=1;
var answerCheckingIndex=0;
function changeHeading(levelNo){
  var heading=$("#level-title");
  if(levelNo==-1){
    heading.text("Game over! Press ANY key to restart!");
  }
  else{
    heading.text("Level No."+levelNo);
  }
}
function pressEffect(i){
  $("."+i).addClass("pressed");
  setTimeout(function() {
    $("."+i).removeClass("pressed");
  },100);
}
function soundEffect(i) {
  switch (i) {
    case 1:
      var audio=new Audio("sounds/green.mp3");
      audio.play();
      break;
    case 2:
      var audio=new Audio("sounds/red.mp3");
      audio.play();
      break;
    case 3:
      var audio=new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case 4:
      var audio=new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case 5:
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      break;
    default:

  }
}

function playSeq() {
  pressEffect(btnSeq[level-1]);
  soundEffect(btnSeq[level-1]);
}

function play(){
  changeHeading(level);
  btnSeq.push(Math.floor(Math.random()*4)+1);
  setTimeout(playSeq,1000);
}


$(document).on("keyup",function(){
  if(f){
    play();
    f=!f;
  }
});


$(".btn").click(function() {
  var userInput=$(this).attr("value");
  pressEffect(userInput);
  if(userInput!=btnSeq[answerCheckingIndex]){
    changeHeading(-1);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    soundEffect(5);
    f=1;
    btnSeq=[];
    answerCheckingIndex=0;
    level=1;
  }else{
    soundEffect(userInput);
    answerCheckingIndex++;
  }
  if((answerCheckingIndex==btnSeq.length)&&(btnSeq.length>0))
  // NOTICE ABOIVE THT WHEN THE GAME OVER HAPPENS answerCheckingIndex is 0 AND SO IS btnSeq.length
  // AS btnSeq IS MADE EMPTY IN PREPARATION FOR THE NEW GAME. BUT IN DOIN SO THE FIRST PART OF THE IF STATEMENT ABOVE
  // BECOMES TRUE AS 0==0 AND THAT IS WHY THE 2ND CONDITION IS PROVIDED FOR THT EDGE CASE TO AVOID THIS IF FROM TRIGGERING
  // WHEN THE GAME OVER HAPPENS AND BOTH VALUES BECOME 0.
  {
    console.log(answerCheckingIndex+" & "+btnSeq.length);
    answerCheckingIndex=0;
    level++;
    setTimeout(play,1000);
  }
});
