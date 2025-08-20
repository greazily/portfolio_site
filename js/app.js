gsap.registerPlugin(Draggable);

const allItems = gsap.utils.toArray(".item");
const marquee = document.querySelector(".marquee");
const track = document.querySelector(".track");
const part = document.querySelector(".part");
let loadingValue = document.querySelector(".loading-value");
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let information = document.querySelector(".information");
let videoLenghts = [0, 570, 1140, 2340, 2910, 3480];
let executed = [false, false, false, false, false, false];
let activeInfo = 0;



canvas.width = 1920;
canvas.height = 1080;

let frameCount = 4679;
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

function indexOfActive() {
  let info = document.querySelector(".expander.info");
  if (info.classList.contains("active")) {
    activeInfo = executed.indexOf(true);
  }
};

function infoLoop(progress) {
  if((videoLenghts[activeInfo + 1] / frameCount).toFixed(3) == progress.toFixed(3)){
    track.t1.progress(videoLenghts[activeInfo] / frameCount);
  }
};

function progressChecker(progress) {
  let infoBtn = document.querySelector(".expander.info");
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

  if (infoBtn.classList.contains("active")) {
    infoLoop(progress);
  }
};


function projectChanger(number) {
  let infoBtn = document.querySelector(".expander.info");
  if (infoBtn.classList.contains("active")) {
    infoLoop(number);
  }
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
  let paragraph = document.querySelector(".expander.info .text");
  const insights = [
    "<p>London, England</p><span>2023</span><p>Data Desk provides NGOs, think tanks, and media outlets with investigative research and analysis on the global oil and gas sector. Their work has appeared in <i>The Washington Post, The Guardian, Bloomberg, and Le Monde.</i> For instance—identifiing sanctions-busting shipments of jet fuel to Myanmar.</p><p>I was brought in to design their identity, website, data visualizations, and documents, with the challenge of appealing to two audiences: one seeking scientific rigor, the other drawn to innovative philanthropic approaches.</p><p>The solution embraced a paradox at the heart of data: it captures concrete realities, yet its representation often feels abstract and intangible. This duality became the foundation of the visual concept, inspiring impossible geometry that conveys certainty through disambiguation, while adjustable columns in the layout allow readers to navigate the information according to their perspective. The typeface Inter was chosen for its modern clarity, while the wordmark—customized with inspiration from Akzidenz Grotesk—balances authority with subtle personality, resulting in a confident, logical, yet approachable visual voice that resonates across both audiences.</p>",

    "<span>Brand Identity, Web Design & Development</span><span>2024</span><p>Hunterbrook Media is a newsroom dedicated to uncovering under-reported stories and holding bad actors to account without ads or paywalls, instead funding its work through litigation partnerships and strategic investments through its financial arm based on its reporting. Their investigations have appeared in <i>The New Yorker, The Financial Times, POLITICO, The Wall Street Journal,</i> and more.</p><p>Hunterbrook needed a brand that reflected their mission—bringing visibility to under-reported stories and holding bad actors to account—while resonating with its core audience: portfolio managers who value urgency, credibility, and personality by way of subtle flare. I built the identity around a dark-to-light transition to symbolize this mission, paired with a condensed logotype inspired by Vignelli’s proposal for <i>The European Journal</i> to convey urgency and old-school credibility. An abbreviated, ticker-inspired mark nods to their financial focus and influence, while the impactful blue echoes the audience’s sense of style, bringing all elements together with clarity and focus.</p>",

    "<span>Brand Identity, Web Design, 3D Simulation</span><span>2022</span><p>For a proposed rebrand of Sony Electronics, I explored a broader brand consolidation, aiming to bring coherence to the fragmented visual landscape across Sony’s sub-brands. I retained the original Sony logotype, honoring its legacy and global recognition, and focused on building a flexible system around it.</p><p>Rooted in Sony’s mission—“Fill the world with emotion, through the power of creativity and technology”—the identity balances these two forces. A perfect square anchors the system, symbolizing the precision and control of technology, while hand-painted forms—drawn from a Japanese artist breaking through constraint—represent the creative potential Sony’s products unlock. This idea is reinforced by dynamic fluid simulations that appear to burst from the products themselves. The color palette draws from the iconic Trinitron series, distilling its bold red, green, and blue into a modern reinterpretation. Within this system, Sony’s products become vessels: structured, intentional, and open, allowing creativity to flow through.</p>",

    "<span>Exhibition Design, Layout, Typesetting, Collage</span><span>2022</span><p>While I was working at Stinsensqueeze, I helped produce the identity for a posthumous exhibition celebrating the life and legacy of Alber Elbaz—the iconic former creative director of Lanvin and founder of AZ Factory.</p><p>Elbaz was known for his playful spirit, distinctive presence, and commitment to a more inclusive and human-focused fashion industry. The visual language aimed to reflect these qualities with warmth and clarity.</p><p>The identity features bold, expressive colors drawn from Elbaz’s personal palette, a rounded, blocky typeface that subtly mirrors his form and character, and layers of collage and hand-drawn sketches inspired by his fashion illustrations. The result is an identity that feels personal, joyful, and true to the designer’s legacy.</p>",

    "<span>Brand Identity, Exhibition Design, Neural Network</span><span>2022</span>I lead a small team brought on to develop the identity for Middlesex University’s Degree Show, themed “Radical Creativity.” The exhibition spanned a wide range of disciplines—visual arts, performance, design, games and media—and the challenge lay in creating a system that could unify such diversity without flattening it.<br><br>To reflect this range, we gathered material from each course and developed our own image database. I then used a generative adversarial network (GAN) to generate an evolving set of images. I intentionally interrupted the training process once the outputs became abstract and amorphous—visual representations of “pure” creativity always changing. I then transitioned these images between each other creating morphed animations, symbolizing creativity as a living, shifting force. To anchor this visual fluidity, we paired the imagery with a brutalist geometric typeface—a structured counterbalance that gave the imagery both scaffolding and contrast.",

    "This is a collection of select projects spanning different stages of my creative practice. It includes experimental interactive websites—taking the reader through my favorite passage from Carl Sagan, another exploring public perceptions of mental health medication—as well as my final major project, an identity system for children’s toys made from recycled pizza boxes.<br><br>More recently, I’ve explored laser-cut furniture design as a hands-on, material-focused hobby, extending my interest in function, form, and making."
  ];

  paragraph.innerHTML = insights[index];

  inactive.forEach((inactivate) => inactivate.classList.remove("active"));
  active.forEach((activate) => activate.classList.add("active"));

};


function infoButtons(){
  let buttons = document.querySelectorAll(".expander");
  buttons.forEach((button) => {
    button.addEventListener("click", function(){
      this.classList.toggle("active");
      indexOfActive();
    });
  });
};

function partAdder() {
  for (let i = 0; i < 2; i++) {
    let partClone = part.cloneNode(true);
    track.appendChild(partClone);
  }

};

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[sequence.frame], 0, 0);
};

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
    indexOfActive();
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
  let percent = Math.round((frameCount - imagesToLoad) / frameCount * 100 * 3)
  if(percent <= 100){
    loadingValue.textContent = percent + "%";
  }
  
  if (percent == 100) {
    gsap.set(canvas, { autoAlpha: 1 });
    gsap.to(".loading-container", { 
      autoAlpha: 0,
      onComplete: function(){
        track.t1.play();
      }
    });    
  }
}
partAdder();
infoButtons();