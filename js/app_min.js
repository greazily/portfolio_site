gsap.registerPlugin(Draggable);

const allItems = gsap.utils.toArray(".it");
const mq = document.querySelector(".mq");
const tr = document.querySelector(".tr");
const pt = document.querySelector(".pt");
const lv = document.querySelector(".lv");
const c = document.querySelector("#c");
const context = c.getContext("2d");
const ifo = document.querySelector(".if");
const videoLengths = [0, 570, 1140, 2340, 2910, 3480];
let executed = Array(videoLengths.length).fill(false);
let activeInfo = 0;

c.width = 1920;
c.height = 1080;

const frameCount = 4679;
const currentFrame = i => `img/frm/${i.toString().padStart(5, "0")}.webp`;

let images = [];
let sequence = { frame: 0 };
let imagesToLoad = frameCount;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.onload = onLoad;
  img.src = currentFrame(i);
  images.push(img);
}

function indexOfActive() {
  const info = document.querySelector(".ex.in");
  if (info.classList.contains("active")) {
    activeInfo = executed.findIndex(Boolean);
  }
}

function infoLoop(progress) {
  if (activeInfo !== videoLengths.length - 1) {
    if ((videoLengths[activeInfo + 1] / frameCount).toFixed(3) === progress.toFixed(3)) {
      tr.t1.progress(videoLengths[activeInfo] / frameCount);
    }
  } else if (progress.toFixed(0) == 0) {
    tr.t1.progress(videoLengths[activeInfo] / frameCount);
  }
}

function progressChecker(progress) {
  const infoBtn = document.querySelector(".ex.in");
  for (let i = 0; i < videoLengths.length; i++) {
    const start = videoLengths[i] / frameCount;
    const end = videoLengths[i + 1] ? videoLengths[i + 1] / frameCount : 1;
    if (progress >= start && progress < end) {
      projectChanger(i);
      break;
    }
  }
  if (infoBtn.classList.contains("active")) infoLoop(progress);
}

function projectChanger(number) {
  const infoBtn = document.querySelector(".ex.in");
  if (infoBtn.classList.contains("active")) infoLoop(number);
  if (!executed[number]) {
    executed.fill(false);
    executed[number] = true;
    infoSet(number);
  }
}

function infoSet(index) {
  const inactive = document.querySelectorAll(".it");
  const active = document.querySelectorAll(".i" + index);
  const paragraph = document.querySelector(".ex.in .tx");
  const insights = [
    "<p>London, England</p><span>2023</span><p>Data Desk provides NGOs, think tanks, and media outlets with investigative research and analysis on the global oil and gas sector. Their work has appeared in <i>The Washington Post, The Guardian, Bloomberg, and Le Monde.</i> For instance—identifiing sanctions-busting shipments of jet fuel to Myanmar.</p><p>I was brought in to design their identity, website, data visualizations, and documents, with the challenge of appealing to two audiences: one seeking scientific rigor, the other drawn to innovative philanthropic approaches.</p><p>The solution embraced a paradox at the heart of data: it captures concrete realities, yet its representation often feels abstract and intangible. This duality became the foundation of the visual concept, inspiring impossible geometry that conveys certainty through disambiguation, while adjustable columns in the layout allow readers to navigate the information according to their perspective. The typeface Inter was chosen for its modern clarity, while the wordmark—customized with inspiration from Akzidenz Grotesk—balances authority with subtle personality, resulting in a confident, logical, yet approachable visual voice that resonates across both audiences.</p>",

    "<p>New York, USA</p><span>2024</span><p>Hunterbrook Media is a newsroom dedicated to uncovering under-reported stories and holding bad actors to account without ads or paywalls, instead funding its work through litigation partnerships and strategic investments through its financial arm based on its reporting. Their investigations have appeared in <i>The New Yorker, The Financial Times, POLITICO, The Wall Street Journal,</i> and more.</p><p>Hunterbrook needed a brand that reflected their mission—bringing visibility to under-reported stories and holding bad actors to account—while resonating with its core audience: portfolio managers who value urgency, credibility, and personality by way of subtle flare. I built the identity around a dark-to-light transition to symbolize this mission, paired with a condensed logotype inspired by Vignelli’s proposal for <i>The European Journal</i> to convey urgency and old-school credibility. An abbreviated, ticker-inspired mark nods to their financial focus and influence, while the impactful blue echoes the audience’s sense of style, bringing all elements together with clarity and focus.</p>",

    "<p>London, England</p><span>2022</span><p>For a proposed rebrand of Sony Electronics, I explored a broader brand consolidation, aiming to bring coherence to the fragmented visual landscape across Sony’s sub-brands. I retained the original Sony logotype, honoring its legacy and global recognition, and focused on building a flexible system around it.</p><p>Rooted in Sony’s mission—“Fill the world with emotion, through the power of creativity and technology”—the identity balances these two forces. A perfect square anchors the system, symbolizing the precision and control of technology, while hand-painted forms—drawn from a Japanese artist breaking through constraint—represent the creative potential Sony’s products unlock. This idea is reinforced by dynamic fluid simulations that appear to burst from the products themselves. The color palette draws from the iconic Trinitron series, distilling its bold red, green, and blue into a modern reinterpretation. Within this system, Sony’s products become vessels: structured, intentional, and open, allowing creativity to flow through.</p>",

    "<p>London, England</p><span>2022</span><p>While I was working at Stinsensqueeze, I helped produce the identity for a posthumous exhibition celebrating the life and legacy of Alber Elbaz—the iconic former creative director of Lanvin and founder of AZ Factory.</p><p>Elbaz was known for his playful spirit, distinctive presence, and commitment to a more inclusive and human-focused fashion industry. The visual language aimed to reflect these qualities with warmth and clarity.</p><p>The identity features bold, expressive colors drawn from Elbaz’s personal palette, a rounded, blocky typeface that subtly mirrors his form and character, and layers of collage and hand-drawn sketches inspired by his fashion illustrations. The result is an identity that feels personal, joyful, and true to the designer’s legacy.</p>",

    "<p>London, England</p><span>2022</span>I lead a small team brought on to develop the identity for Middlesex University’s Degree Show, themed “Radical Creativity.” The exhibition spanned a wide range of disciplines—visual arts, performance, design, games and media—and the challenge lay in creating a system that could unify such diversity without flattening it.<br><br>To reflect this range, we gathered material from each course and developed our own image database. I then used a generative adversarial network (GAN) to generate an evolving set of images. I intentionally interrupted the training process once the outputs became abstract and amorphous—visual representations of “pure” creativity always changing. I then transitioned these images between each other creating morphed animations, symbolizing creativity as a living, shifting force. To anchor this visual fluidity, we paired the imagery with a brutalist geometric typeface—a structured counterbalance that gave the imagery both scaffolding and contrast.",

    "<p>Multiple Locations</p><span>2022–25</span>This is a collection of select projects spanning different stages of my creative practice. It includes experimental interactive websites—taking the reader through my favorite passage from Carl Sagan, another exploring public perceptions of mental health medication—as well as my final major project, an identity system for children’s toys made from recycled pizza boxes.<br><br>More recently, I’ve explored laser-cut furniture design as a hands-on, material-focused hobby, extending my interest in function, form, and making."
  ];
  paragraph.innerHTML = insights[index];
  inactive.forEach(el => el.classList.remove("active"));
  active.forEach(el => el.classList.add("active"));
}

function infoButtons() {
  const buttons = document.querySelectorAll(".ex button");
  const expanders = document.querySelectorAll(".ex");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const wasActive = this.parentElement.classList.contains("active");
      expanders.forEach(expander => expander.classList.remove("active"));
      if (!wasActive) {
        this.parentElement.classList.add("active");
        indexOfActive();
      }
    });
  });
}

function partAdder() {
  for (let i = 0; i < 2; i++) {
    tr.appendChild(pt.cloneNode(true));
  }
}

function render() {
  context.clearRect(0, 0, c.width, c.height);
  context.drawImage(images[sequence.frame], 0, 0);
}

let imageSequencer = gsap.to(sequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  paused: true,
  onUpdate: render
});

tr.t1 = gsap.timeline({
  paused: true,
  repeat: -1,
  onUpdate() {
    imageSequencer.progress(this.progress());
    progressChecker(this.progress());
  }
}).to(".tr", {
  duration: frameCount / 30,
  x: pt.offsetWidth * -1,
  ease: "none"
});

const proxy = document.createElement("div");
proxy.style.backgroundColor = "red";

Draggable.create(proxy, {
  type: 'x',
  trigger: tr,
  onDragStart() { tr.t1.pause(); },
  onDrag() {
    let x = (this.x * -1) % pt.offsetWidth;
    tr.t1.progress(x / pt.offsetWidth + (x < 0 ? 1 : 0));
  },
  onDragEnd() {
    tr.t1.play();
    indexOfActive();
  },
  onPress() {
    gsap.set(this.target, { x: gsap.getProperty(tr, "x") });
    this.update();
  }
});

function onLoad() {
  imagesToLoad--;
  this.onload = null;
  let percent = Math.round((frameCount - imagesToLoad) / frameCount * 100 * 4);
  if (percent <= 100) lv.textContent = percent + "%";
  if (percent == 100) {
    gsap.set(c, { autoAlpha: 1 });
    gsap.to(".lc", {
      autoAlpha: 0,
      onComplete: () => tr.t1.play()
    });
  }
}

partAdder();
infoButtons();