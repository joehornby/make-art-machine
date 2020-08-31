// Joseph Hornby Design
// Generative Art
// Series 2 No. 1
// Speech and text to image

// AttGAN model server address
const url = 'https://api.runwayml.com/v1/inference/runway/AttnGAN/default/generate';
let textInput;
let button;
let canvas;
let isProcessing = false;
let newCanvasImg;
let isGrid = false;
let resultsContainer;
let canvasContainer;
let userInput;
let outputContainer;
let nogridbtn, gridbtn;
let playbtn, stopbtn, toggleplay;
let showPlay = false;
let isPlaying = false;
let images = [];
let animations = [];


function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('#canvasContainer');
    outputContainer = select('#outputContainer');
    textInput = select('#textInput');
    resultsContainer = select('#results');
    canvasContainer = select('#canvasContainer');
    //   background('rgb(255,230,150)');
    background(0);
    nogridbtn = select('#nogrid');
    gridbtn = select('#grid');
    playbtn = select('#play');
    stopbtn = select('#stop');
    toggleplay = select('#input__playback');
    toggleplay.mousePressed(() => {
        isPlaying = !isPlaying;
        showPlayStop();
    });
    toggleView = select('#input__display');
    toggleView.mousePressed(() => {
        isGrid = !isGrid;
        updateView();
    });
}

function windowResized() { 
    resizeCanvas(window.innerWidth, window.innerHeight); 
}

function showPlayStop() {
  if (isPlaying) {
    playanimation();
    playbtn.hide();
    stopbtn.show();
  } else {
    playbtn.show();
    stopbtn.hide();
    if (animations && animations.length > 0) {
      animations.forEach(a => clearTimeout(a));
    }
    showTxt(userInput);
    newCanvasImg = images[images.length - 1].image;
  }
}

function playanimation() {
  animations = images.map((i, index) => {
    return setTimeout(() => {
      showTxt(i.text);
      newCanvasImg = i.image;
      if (index === images.length - 1) {
        isPlaying = false;
        playbtn.show();
        stopbtn.hide();
        return;
      }
    }, index * 1200);
  });
}

function updateView() {
  if (isGrid) {
    gridbtn.show();
    nogridbtn.hide();
    canvasContainer.hide();
    resultsContainer.style('display', 'grid');
    toggleplay.hide();
  } else {
    gridbtn.hide();
    nogridbtn.show();
    resultsContainer.hide();
    canvasContainer.show();
    toggleplay.show();
  }
}

function draw() {
  if (newCanvasImg) image(newCanvasImg, 0, 0, width, height);
//   filter(GRAY);
}

function keyReleased() {
  if (!isProcessing) text2Image();
  userInput = textInput.elt.value;
}

function text2Image() {
  isProcessing = true;
  const imgTxt = textInput.elt.value;
  if (!imgTxt || imgTxt.length < 0) {
    isProcessing = false;
    return;
  }
  playbtn.show();
  stopbtn.hide();
  const postData = {
    "caption": imgTxt
  };
  // Send HTTP Post request to ML model server. Output image src is returned.
  httpPost(url, 'json', {inputData: postData}, async (output) => {
    if (output &&  output.result) {
        newCanvasImg = await loadImage(output.result);
        images.push({
            image: newCanvasImg,
            text: imgTxt
        });
        let newImg = createImg(output.result,"An image from the machine's brain", "anonymous");
        newImg.parent('results');
        outputContainer.elt.scrollTop = outputContainer.elt.scrollHeight;
        newImg.mouseOver(() => {
            showTxt(imgTxt);
            textInput.style('opacity', '0.6');
        });
        newImg.mouseOut(() => {
            showTxt(userInput);
            textInput.style('opacity', '1');

        });
    }
    isProcessing = false;
  })
}

function showTxt(imgTxt) {
  textInput.elt.value = imgTxt;
}
