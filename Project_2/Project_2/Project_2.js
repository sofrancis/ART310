let aeData = [];
let kData = [];
let nData = [];
let resizedAespaWidth = [];
let resizedKehlaniWidth = [];
let resizedNikiWidth = [];

let aespaButtonPressed = false;
let kehlaniButtonPressed = false;
let nikiButtonPressed = false;
let organize = false;

let aespaButton, kehlaniButton, nikiButton, switchButton;

let aespaTable, kehlaniTable, nikiTable;

let backie;

function preload() {
  
  aeData[0] = loadImage('data/aespa/Drama.jpeg');
  aeData[1] = loadImage('data/aespa/Spicy.jpeg');
  aeData[2] = loadImage('data/aespa/Savage.jpeg');
  aeData[3] = loadImage('data/aespa/BetterThings.jpeg');
  aeData[4] = loadImage('data/aespa/HoldOnTight.jpeg');
  aeData[5] = loadImage('data/aespa/NextLevel.jpeg');
  aeData[6] = loadImage('data/aespa/BlackMamba.jpeg');  
  aeData[7] = loadImage('data/aespa/Illusion.jpeg');
  aeData[8] = loadImage('data/aespa/Girls.jpeg');
  aeData[9] = loadImage('data/aespa/LucidDream.jpeg');
  
  kData[0] = loadImage('data/kehlani/WhileWeWait.jpeg');
  kData[1] = loadImage('data/kehlani/SweetSexySavage.jpeg');
  kData[2] = loadImage('data/kehlani/Voicenotes.jpeg');
  kData[3] = loadImage('data/kehlani/TheFateOfTheFurious.jpeg');
  kData[4] = loadImage('data/kehlani/ItWasGoodUntilItWasnt.jpeg');
  kData[5] = loadImage('data/kehlani/ItWasGoodUntilItWasnt.jpeg');
  kData[6] = loadImage('data/kehlani/InvasionOfPrivacy.jpeg');
  kData[7] = loadImage('data/kehlani/GoodThing.jpeg');
  kData[8] = loadImage('data/kehlani/Honey.jpeg');
  kData[9] = loadImage('data/kehlani/PinkPlanet.jpeg');
  
  nData[0] = loadImage('data/niki/TakeAChanceWithMe.jpeg');
  nData[1] = loadImage('data/niki/lowkey.jpeg');
  nData[2] = loadImage('data/niki/EverySummertime.jpeg');
  nData[3] = loadImage('data/niki/Backburner.jpeg');
  nData[4] = loadImage('data/niki/Oceans&Engines.jpeg');
  nData[5] = loadImage('data/niki/HighSchoolInJakarta.jpeg');
  nData[6] = loadImage('data/niki/urs.jpeg');
  nData[7] = loadImage('data/niki/LaLaLostYou.jpeg');
  nData[8] = loadImage('data/niki/ILikeU.jpeg');
  nData[9] = loadImage('data/niki/Anaheim.jpeg');
  
  backie = loadImage('data/backie.jpeg');
  
 aespaTable = loadTable('data/aespa_data.csv', 'csv', 'header');
 kehlaniTable = loadTable('data/kehlani_data.csv', 'csv', 'header');
 nikiTable = loadTable('data/niki_data.csv', 'csv', 'header');
  
}

function setup() {
  createCanvas(1800, 1000);
  
  
  aespaButton = createButton('aespa');
  aespaButton.position(10, 10);
  aespaButton.size(145, 75);
  aespaButton.style('font-size', '40px'); //font size
  aespaButton.mousePressed(aespaData);
  
  kehlaniButton = createButton('Kehlani');
  kehlaniButton.position(10, 915);
  kehlaniButton.size(170, 75);
  kehlaniButton.style('font-size', '40px'); //font size
  kehlaniButton.mousePressed(kehlaniData);
  
  nikiButton = createButton('Niki');
  nikiButton.position(1673, 915);
  nikiButton.size(115, 75);
  nikiButton.style('font-size', '40px'); //font size
  nikiButton.mousePressed(nikiData);
  
  switchButton = createButton('switch');
  switchButton.position(1673, 10);
  switchButton.mousePressed(switchy);
  
  resizeAespaImages();
  resizeKehlaniImages();
  resizeNikiImages();
    
}
function resizeAespaImages() {
  for (let i = 0; i < aeData.length; i++) {
  let aSize = aespaTable.getNum(i, 'Streams');
  aeData[i].resize(aSize, 0);
  resizedAespaWidth[i] = aeData[i].width;
  }
}


function resizeKehlaniImages() {
  for (let i = 0; i < kData.length; i++) {
    let kSize = kehlaniTable.getNum(i, 'Streams');
    kData[i].resize(kSize, 0);
    resizedKehlaniWidth[i] = kData[i].width;
  }
}

function resizeNikiImages() {
  for (let i = 0; i < nData.length; i++) {
    let nSize = nikiTable.getNum(i, 'Streams');
    nData[i].resize(nSize, 0);
    resizedNikiWidth[i] = nData[i].width;
  } 
}



function draw() {
  background(225);
  
  if (organize) {
    streamSpots();
  } else {
    popularitySpots();
  }
}


function streamSpots() {
if (aespaButtonPressed) {
  for (let i = 0; i < aeData.length; i++) {
        let x = random(width);
        let y = random(height);
        image(aeData[i], x, y);
    }
} else if (kehlaniButtonPressed) {
  for (let i = 0; i < kData.length; i++) {
        let x = random(width);
        let y = random(height);
        image(kData[i], x, y);
  }
} else if (nikiButtonPressed) {
  for (let i = 0; i < nData.length; i++) {
        let x = random(width);
        let y = random(height);
        image(nData[i], x, y);
  }
 }
noLoop();
}



function popularitySpots() {
let spacing = 100;
if (aespaButtonPressed) {
  for (let i = 0; i < aeData.length; i++) {
    // Calculate position for each image
    let x = i * (resizedAespaWidth[i] + spacing); // Adjust the spacing between images
    let y = 100;
    image(aeData[i], x, y); // Draw the image at the calculated position
    }
} else if (kehlaniButtonPressed) {
  for (let i = 0; i < kData.length; i++) {
    // Calculate position for each image
    let x = i * (resizedKehlaniWidth[i] + spacing); // Adjust the spacing between images
    let y = 100;
    image(kData[i], x, y); // Draw the image at the calculated position
    }
} else if (nikiButtonPressed) {
  for (let i = 0; i < nData.length; i++) {
    // Calculate position for each image
    let x = i * (resizedNikiWidth[i] + spacing); // Adjust the spacing between images
    let y = 100;
    image(nData[i], x, y); // Draw the image at the calculated position
    }
 }
}



function switchy() {
  organize = !organize;
  loop();
}


function aespaData() {
  aespaButtonPressed = true;
  kehlaniButtonPressed = false;
  nikiButtonPressed = false;
}



function kehlaniData() {
  aespaButtonPressed = false;
  kehlaniButtonPressed = true;
  nikiButtonPressed = false;
}



function nikiData() {
  aespaButtonPressed = false;
  kehlaniButtonPressed = false;
  nikiButtonPressed = true;
}
