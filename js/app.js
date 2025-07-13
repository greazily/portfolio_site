gsap.registerPlugin(Draggable);

const allItems = gsap.utils.toArray(".item");
const marquee = document.querySelector(".marquee");
const track = document.querySelector(".track");
const part = document.querySelector(".part");
let loadingValue = document.querySelector(".loading-value");
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let information = document.querySelector(".information");
let videoLenghts = [0, 630, 1890, 2520, 3150, 3780];

console.log(part.offsetWidth);

canvas.width = 1920;
canvas.height = 1080;

let frameCount = 5040;
let currentFrame = index => (
  `img/frm/${(index).toString().padStart(5, "0")}.webp`
);

let progression = 0.01
let images = []
let sequence = {
  frame: 0
};

let imagesToLoad = frameCount;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.onload = onLoad;
  img.src = currentFrame(i);
  images.push(img);
};

function progressChecker(progress) {
  if (progress >= 0 / frameCount && progress < videoLenghts[1] / frameCount){
    projectChanger(0);
  }
  else if (progress >= videoLenghts[1] / frameCount && progress < videoLenghts[2] / frameCount){
    projectChanger(1);
  } 
  else if (progress >= videoLenghts[2] / frameCount && progress < videoLenghts[3] / frameCount){
    projectChanger(2);
  } 
  else if (progress >= videoLenghts[3] / frameCount && progress < videoLenghts[4] / frameCount){
    projectChanger(3);
  } 
  else if (progress >= videoLenghts[4] / frameCount && progress < videoLenghts[5] / frameCount){
    projectChanger(4);
  } 
  else if (progress >= videoLenghts[5] / frameCount && progress < frameCount){
    projectChanger(5);
  } 
};
executed = [false, false, false, false, false, false];
function projectChanger(number) {
  if(number == 0 && !executed[0]){
    resetArr()
    executed[0] = true;
    infoSet(number);
  }
  else if (number == 1 && !executed[1]){
    resetArr()
    executed[1] = true;
    infoSet(number);
  }
  else if (number == 2 && !executed[2]){
    resetArr()
    executed[2] = true;
    infoSet(number);
  }
  else if (number == 3 && !executed[3]){
    resetArr()
    executed[3] = true;
    infoSet(number);
  }
  else if (number == 4 && !executed[4]){
    resetArr()
    executed[4] = true;
    infoSet(number);
  }
  else if (number == 5 && !executed[5]){
    resetArr()
    executed[5] = true;
    infoSet(number);
  }
};

function resetArr() {
  for (let i = 0; i < executed.length; i++){executed[i] = false;}
};

function infoSet(index) {


  let inactive = document.querySelectorAll(".project");
  let active = document.getElementById("n" + index);
  let paragraph = document.querySelector(".info ~ .information div p");
  const insights = [
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.", 
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.", 
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.", 
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?", 
    "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
  ];

  paragraph.innerHTML = insights[index];

  // inactive.forEach((inactivate) => inactivate.classList.remove("active"));
  // active.classList.add("active");
}

function infoButtons(){
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function(){
      this.classList.toggle("active");
    });
  });
};

function partAdder() {
  for (let i = 0; i < 2; i++) {
    let partClone = part.cloneNode(true);
    track.appendChild(partClone);
  }

}

partAdder();

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[sequence.frame], 0, 0);
}

let imageSequencer = gsap.to(sequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  paused: true,
  onUpdate: render 
});

track.t1 = gsap.timeline({
  paused: true,
  repeat: -1, 
  onUpdate() {
    imageSequencer.progress(this.progress());
    progressChecker(this.progress());
  }
})
.to(".track", {
  duration: frameCount/30,
  x: part.offsetWidth * -1,
  ease: "none"
});

const proxy = document.createElement("div");
proxy.style.backgroundColor = "red";

Draggable.create(proxy, {
  type: 'x',
  trigger: track,
  onDragStart: function() {
    track.t1.pause();
  },
  onDrag: function() {
    let x = (this.x * -1) % part.offsetWidth;
    if( x < 0 ) {
        track.t1.progress(x/part.offsetWidth + 1);
        // console.log(this.x, x % part.offsetWidth, x/part.offsetWidth);
      } else {
        track.t1.progress(x/part.offsetWidth);
      }
  },
  onDragEnd: function() {
    track.t1.play();
  },
  onPress: function() {
    gsap.set(this.target, {
      x: gsap.getProperty(track, "x")
    });
    this.update();
  }
});



function onLoad() {
  imagesToLoad--;
  this.onload = null;
  let percent = Math.round((frameCount - imagesToLoad) / frameCount * 100 * 2)
  if(percent <= 100){
    loadingValue.textContent = percent + "%";
  }
  
  if (percent == 100) {
    gsap.set(canvas, { autoAlpha: 1 });
    gsap.to(".loading-container", { 
      autoAlpha: 0,
      onComplete: function(){
        track.t1.play();
        infoButtons();
      }
    });    
  }
}