// Please be aware when you running the app you need to use a browser that dont have other tab compete using the microphone.Close all the tabs that using your microphone before running this app.

function start() { 
  setTimeout(annyang.start(),2000);
  let utterance = new SpeechSynthesisUtterance("I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you're ready,say the name out loud.");
  speechSynthesis.speak(utterance);
    $('#btnStart').hide();
  } 

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
var nums = ["0","0","0","0","0","1","1","1","1","1","2","2","2","2","2","3","3","3","3","3","4","4","4","4","4"];
//var nums =["0","1"]
var index = 0;
var correctCount=0;
var totalCount=0;
shuffle(nums);

if (annyang) {
  //console.log("VOICE ENABLED")
  const commands = { 
    "circle" : function() {
      console.log("circle");
      calculate(0);
    }, 
    "plus": function() {
      console.log("plus");
      calculate(1);
    }, 
    "square" : function() {
      console.log("square")
      calculate(2);
    },
    "waves" : function() {
      console.log("waves");
      calculate(3);
    },
    "star" : function() {
      console.log("star");
      calculate(4);
    }
  
  }
  annyang.addCommands(commands);
} else {
  console.log("NO VOICE SUPPORT")
}

function displayCard() {
  const wave = `<p class="icon wave"><span>&#8779</span></p>`;
  const square = `<p class="icon square"><span>□</span></p>`;
  const plus = `<p class="icon plus"><span>➕</span></p>`;
  const star = `<p class="icon star"><span>☆</span></p>`;
  const circle = `<p class="icon circle"><span>◯</span></p>`;
  $("#display span").text(nums[index]);
  var obj = "";
  if(nums[index]==0){
  obj = circle;
  }
  else if(nums[index]==1){
    obj = plus;
  }
  else if(nums[index]==2){
    obj = square;
  }
  else if(nums[index]==3){
    obj = wave;
  }
  else if(nums[index]==4){
    obj = star;
  }
  $("#display").html(obj);

  setTimeout(next,2000);
};

function calculate(number) {
  console.log(number);
  if (nums[index] == number ) {
    correctCount++;
  }
  totalCount++;
  displayCard();

  $("#correctCount span").text(correctCount);
  $("#totalCount span").text(totalCount);
};

function next() { 
  if(index>=nums.length - 1){
    if(correctCount >= 11){
      speechSynthesis.speak(new SpeechSynthesisUtterance("You have ESP, Congratulation!"));
      alert("You have ESP, Congratulation!");
    }
    else{
      speechSynthesis.speak(new SpeechSynthesisUtterance("Your ESP still need to develop!"));
      alert("Your ESP still need to develop!");
    }        
    return;
  }
  speechSynthesis.speak(new SpeechSynthesisUtterance("How about this one"));
  index++;
  $("#display").html("<p></p>");

}

