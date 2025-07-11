gsap.registerPlugin(Draggable);

const indicator = document.getElementById("indicator");
const allItems = gsap.utils.toArray(".item");
const marquee = document.querySelector(".marquee");
let loadingValue = document.querySelector(".loading-value");
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let information = document.querySelector(".information");
let videoLenghts = [0, 630, 1890, 2520, 3150, 3780];

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
  let paragraph = document.querySelector(".information div p");
  const insights = [
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.", 
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.", 
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.", 
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?", 
    "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
  ];
  const details = 
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  ;

  if(column == 1){
    paragraph.innerHTML = details;
  } else {
    paragraph.innerHTML = insights[index];
  }



  inactive.forEach((inactivate) => inactivate.classList.remove("active"));
  active.classList.add("active");
}

function infoButtons(){
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function(){
      infoSet(executed.indexOf(true));
      this.classList.toggle("active");
    });
  });
};

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

gsap.set(marquee, { height: Math.max(...allItems.map(el => el.offsetHeight)) });

let tl = horizontalLoop(allItems, {
  paused: true,
  draggable: true,
  repeat: -1
});
['mousedown', 'touchstart'].forEach(event => marquee.addEventListener(event, () => gsap.to(tl, {timeScale: 0, overwrite: true})));
['mouseout','mouseup', 'touchend'].forEach(event => marquee.addEventListener(event, () => gsap.to(tl.play(), {timeScale: 1, overwrite: true})));

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
  - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
  - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
  - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
  - current() - returns the current index (if an animation is in-progress, it reflects the final index)
  - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let onChange = config.onChange,
		lastIndex = 0,
		tl = gsap.timeline({repeat: config.repeat, onUpdate: function(){
      // console.log('fire');
      imageSequencer.progress(tl.progress());
      onChange && function() {
				let i = tl.closestIndex();
				if (lastIndex !== i) {
					lastIndex = i;
					onChange(items[i], i);
				}
      }
			}, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		spaceBefore = [],
		xPercents = [],
		curIndex = 0,
		indexIsDirty = false,
		center = config.center,
		pixelsPerSecond = (config.speed || 1) * 3.2,// set speed total length of items / (frames / 30fps)
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		timeOffset = 0,
		container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
		totalWidth,
		getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
		populateWidths = () => {
			let b1 = container.getBoundingClientRect(), b2;
			items.forEach((el, i) => {
				widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
				xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
				b2 = el.getBoundingClientRect();
				spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
				b1 = b2;
			});
			gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
				xPercent: i => xPercents[i]
			});
			totalWidth = getTotalWidth();
		},
		timeWrap,
		populateOffsets = () => {
			timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
			center && times.forEach((t, i) => {
				times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
			});
		},
		getClosest = (values, value, wrap) => {
			let i = values.length,
				closest = 1e10,
				index = 0, d;
			while (i--) {
				d = Math.abs(values[i] - value);
				if (d > wrap / 2) {
					d = wrap - d;
				}
				if (d < closest) {
					closest = d;
					index = i;
				}
			}
			return index;
		},
		populateTimeline = () => {
			let i, item, curX, distanceToStart, distanceToLoop;
			tl.clear();
			for (i = 0; i < length; i++) {
				item = items[i];
				curX = xPercents[i] / 100 * widths[i];
				distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
				distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
				tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
				  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
				  .add("label" + i, distanceToStart / pixelsPerSecond);
				times[i] = distanceToStart / pixelsPerSecond;
			}
			timeWrap = gsap.utils.wrap(0, tl.duration());
		},
		refresh = (deep) => {
			let progress = tl.progress();
			tl.progress(0, true);
			populateWidths();
			deep && populateTimeline();
			populateOffsets();
			deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
		},
		proxy;
	gsap.set(items, {x: 0});
	populateWidths();
	populateTimeline();
	populateOffsets();
	window.addEventListener("resize", () => refresh(true));
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		if (time < 0 || time > tl.duration()) {
			vars.modifiers = {time: timeWrap};
		}
		curIndex = newIndex;
		vars.overwrite = true;
		gsap.killTweensOf(proxy);    
		return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
	}
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.closestIndex = setCurrent => {
		let index = getClosest(times, tl.time(), tl.duration());
		if (setCurrent) {
			curIndex = index;
			indexIsDirty = false;
		}
		return index;
	};
	tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
	tl.next = vars => toIndex(tl.current()+1, vars);
	tl.previous = vars => toIndex(tl.current()-1, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); // pre-render for performance
	if (config.reversed) {
		tl.vars.onReverseComplete();
		tl.reverse();
	}
	if (config.draggable && typeof(Draggable) === "function") {
		proxy = document.createElement("div")
		let wrap = gsap.utils.wrap(0, 1),
			ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
			align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
			syncIndex = () => tl.closestIndex(true);
		typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
		draggable = Draggable.create(proxy, {
			trigger: items[0].parentNode,
			type: "x",
			onPressInit() {
        let x = this.x;
				gsap.killTweensOf(tl);
        wasPlaying = !tl.paused();
        tl.pause();
				startProgress = tl.progress();
				refresh();
				ratio = 1 / totalWidth;
        initChangeX = (startProgress / -ratio) - x;
				gsap.set(proxy, {x: startProgress / -ratio});
			},
			onDrag: align,
			onThrowUpdate: align,
      overshootTolerance: 0,
			inertia: true,
			snap(value) {
        //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX
        }
				let time = -(value * ratio) * tl.duration(),
					wrappedTime = timeWrap(time),
					snapTime = times[getClosest(times, wrappedTime, tl.duration())],
					dif = snapTime - wrappedTime;
				Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
        lastSnap = (time + dif) / tl.duration() / -ratio;
				return lastSnap;
			},
			onRelease() {
				syncIndex();
				draggable.isThrowing && (indexIsDirty = true);
			},
			onThrowComplete: () => {
        syncIndex();
        wasPlaying && tl.play();
      }
		})[0];
		tl.draggable = draggable;
	}
	tl.closestIndex(true);
  lastIndex = curIndex;
	onChange && onChange(items[curIndex], curIndex);
	return tl;
}

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
        tl.play();
        infoButtons();
      }
    });    
  }
}