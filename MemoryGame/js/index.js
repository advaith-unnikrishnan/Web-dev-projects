const cards=document.querySelectorAll(".memorycard");
var isFlipped=false;
var firstcard,secondcard;
var lock=false;

cards.forEach(card => card.addEventListener("click",flip));

function flip() {
  if(lock)
    return;
  if(this == firstcard)
    return;
  if(!isFlipped)
  {
    isFlipped=true;
    firstcard=this;
    return;
  }
  secondcard=this;
  check();
}

function check(){
  var isMatch= firstcard.dataset.image === secondcard.dataset.image;
  isMatch ? success():fail();
}

function success() {
    firstcard.removeEventListener("click",flip);
    secondcard.removeEventListener("click",flip);
    reset();
}

function fail() {
  lock=true;
  setTimeout(()=>{
    firstcard.classlist.remove("flip");
    secondcard.classlist.remove("flip");
    reset();
  },1000);
}


function reset() {
  [isFlipped,lock]=[false,false];
  [firstcard,secondcard]=[null,null];
}


(function shuffle() {
  cards.forEach((card => {
    var position=Math.floor(Math.random()*16);
    card.style.order=position;
  });

})();
