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

  let inactive = document.querySelectorAll(".item");
  let active = document.querySelectorAll(".i" + index);
  let paragraph = document.querySelector(".expander.info .information div p");
  const insights = [
    "Hunterbrook Media is a newsroom dedicated to uncovering under-reported stories and holding bad actors to account without ads or paywalls, instead funding its work through litigation partnerships and strategic investments through its financial arm based on its reporting. Their investigations have appeared in <i>The New Yorker, The Financial Times, POLITICO, The Wall Street Journal,</i> and more.<br><br>Hunterbrook needed a brand that reflected their mission—bringing visibility to under-reported stories and holding bad actors to account—while resonating with its core audience: portfolio managers who value urgency, credibility, and personality by way of subtle flare. I built the identity around a dark-to-light transition to symbolize this mission, paired with a condensed logotype inspired by Vignelli’s proposal for <i>The European Journal</i> to convey urgency and old-school credibility. An abbreviated, ticker-inspired mark nods to their financial focus and influence, while the impactful blue echoes the audience’s sense of style, bringing all elements together with clarity and focus.", 
    "For a proposed rebrand of Sony Electronics, I explored a broader brand consolidation, aiming to bring coherence to the fragmented visual landscape across Sony’s sub-brands. I retained the original Sony logotype, honoring its legacy and global recognition, and focused on building a flexible system around it.<br><br>Rooted in Sony’s mission—“Fill the world with emotion, through the power of creativity and technology”—the identity balances these two forces. A perfect square anchors the system, symbolizing the precision and control of technology, while hand-painted forms—drawn from a Japanese artist breaking through constraint—represent the creative potential Sony’s products unlock. This idea is reinforced by dynamic fluid simulations that appear to burst from the products themselves. The color palette draws from the iconic Trinitron series, distilling its bold red, green, and blue into a modern reinterpretation. Within this system, Sony’s products become vessels: structured, intentional, and open, allowing creativity to flow through.", 
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
    "Data Desk offers NGOs, think tanks, and media outlets investigative research and analysis that provides insight into the global oil and gas sector. <br><br>Previously they have worked on stories published by The Washington Post, The Guardian, Bloomberg and Le Monde among others. For instance, identifying sanctions-busting shipments of jet fuel to Myanmar via a Vietnamese tank terminal.<br><br>The challenge I was faced with was the emergence of two distinct audiences at once—one that values scientific rigor, and another drawn to the cutting edge of philanthropic innovation?<br><br>To resolve this tension, I leaned into a paradox at the heart of data itself: it represents something concrete, yet it is often experienced as abstract or intangible. That duality became the foundation of the visual concept, leading me to explore impossible geometry—forms that visually capture both precision and ambiguity.<br><br>For typographic clarity, I chose Inter, but modified the wordmark to move away from its default utilitarian tone. The result is a typographic voice that feels authoritative yet understated—rooted in logic, but with a quiet confidence that appeals across audiences.", 
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
  ];

  paragraph.innerHTML = insights[index];
  console.log("Active", active, "Inactive", inactive)

  inactive.forEach((inactivate) => inactivate.classList.remove("active"));
  active.forEach((activate) => activate.classList.add("active"));
}

function infoButtons(){
  let buttons = document.querySelectorAll(".expander");
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