let aData = [];
let kData = [];
let nData = [];

let amineButtonPressed = false;
let kehlaniButtonPressed = false;
let nikiButtonPressed = false;
let organize = false;

let amineButton, kehlaniButton, nikiButton, switchButton;

let amineTable, kehlaniTable, nikiTable;

let backie;

function preload() {
  
  aData[0] = loadImage('data/amine/OnePointFive.jpeg');
  aData[1] = loadImage('data/amine/GoodForYou.jpeg');
  aData[2] = loadImage('data/amine/Kaytramine.jpeg');
  aData[3] = loadImage('data/amine/Kaytramine2.jpeg');
  aData[4] = loadImage('data/amine/DearAnnie.jpeg');
  aData[5] = loadImage('data/amine/GoodForYou2.jpeg');
  aData[6] = loadImage('data/amine/IntoTheSpider-Verse.jpeg');  
  aData[7] = loadImage('data/amine/Kaytramine3.jpeg');
  aData[8] = loadImage('data/amine/TwoPointFive.jpeg');
  aData[9] = loadImage('data/amine/Kaytramine4.jpeg');
  
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
  
  nData[0] = loadImage('data/niki/Nicole.jpeg');
  nData[1] = loadImage('data/niki/lowkey.jpeg');
  nData[2] = loadImage('data/niki/EverySummertime.jpeg');
  nData[3] = loadImage('data/niki/Nicole2.jpeg');
  nData[4] = loadImage('data/niki/Nicole3.jpeg');
  nData[5] = loadImage('data/niki/Nicole4.jpeg');
  nData[6] = loadImage('data/niki/urs.jpeg');
  nData[7] = loadImage('data/niki/LaLaLostYou.jpeg');
  nData[8] = loadImage('data/niki/ILikeU.jpeg');
  nData[9] = loadImage('data/niki/Nicole5.jpeg');
  
  backie = loadImage('data/backie.jpeg');
  
  amineTable = loadTable('data/amine_data.csv', 'csv', 'header', () => {
        resizeAmineImages(); // Callback function to resize images after CSV data is loaded
 });
 
 kehlaniTable = loadTable('data/kehlani_data.csv', 'csv', 'header', () => {
        resizeKehlaniImages(); // Callback function to resize images after CSV data is loaded
 });
 
 nikiTable = loadTable('data/niki_data.csv', 'csv', 'header', () => {
        resizeNikiImages(); // Callback function to resize images after CSV data is loaded
 });
}

function setup() {
  createCanvas(1800, 1000);
  
  
  amineButton = createButton('Aminé');
  amineButton.position(10, 10);
  amineButton.size(145, 75);
  amineButton.style('font-size', '40px'); //font size
  amineButton.mousePressed(amineData);
  
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
  
}
//sweet spot is A100,000, K1,000,000, 1,000,000
function resizeAmineImages() {
  for (let i = 0; i < aData.length; i++) {
  let aSize = amineTable.getNum(i, 'Streams'); // Corrected variable name
  let aScaledSize = aSize / 100000; 
  aData[i].resize(aScaledSize, 0);
  }
}


function resizeKehlaniImages() {
  for (let i = 0; i < kData.length; i++) {
    let kSize = kehlaniTable.getNum(i, 'Streams'); // Corrected variable name
    let kScaledSize = kSize / 1000000;              
    kData[i].resize(kScaledSize, 0);
  }
}

function resizeNikiImages() {
  for (let i = 0; i < nData.length; i++) {
    let nSize = nikiTable.getNum(i, 'Streams'); // Corrected variable name
    let nScaledSize = nSize / 1000000; 
    nData[i].resize(nScaledSize, 0);
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
if (amineButtonPressed) {
  for (let i = 0; i < aData.length; i++) {
        let x = random(width);
        let y = random(height);
        image(aData[i], x, y);
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
if (amineButtonPressed) {
  for (let i = 0; i < aData.length; i++) {
    // Calculate position for each image
    let x = i * 200; // Adjust the spacing between images
    let y = 100;
    image(aData[i], x, y); // Draw the image at the calculated position
    }
} else if (kehlaniButtonPressed) {
  for (let i = 0; i < kData.length; i++) {
    // Calculate position for each image
    let x = i * 200; // Adjust the spacing between images
    let y = 100;
    image(kData[i], x, y); // Draw the image at the calculated position
    }
} else if (nikiButtonPressed) {
  for (let i = 0; i < nData.length; i++) {
    // Calculate position for each image
    let x = i * 200; // Adjust the spacing between images
    let y = 100;
    image(nData[i], x, y); // Draw the image at the calculated position
    }
 }
}



function switchy() {
  organize = !organize;
  loop();
}


function amineData() {
  amineButtonPressed = true;
  kehlaniButtonPressed = false;
  nikiButtonPressed = false;
}



function kehlaniData() {
  amineButtonPressed = false;
  kehlaniButtonPressed = true;
  nikiButtonPressed = false;
}



function nikiData() {
  amineButtonPressed = false;
  kehlaniButtonPressed = false;
  nikiButtonPressed = true;
}
