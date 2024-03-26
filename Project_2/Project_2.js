//Arrays holding image data
let aeData = [];
let kData = [];
let nData = [];

//Arrays holding resized images
let resizedAespaWidth = [];
let resizedKehlaniWidth = [];
let resizedNikiWidth = [];

//Sets all buttons to false to prevent overlapping functions
let aespaButtonPressed = false;
let kehlaniButtonPressed = false;
let nikiButtonPressed = false;

//Sets organization of streams vs. popularity to false
let organize = false;

//Blocks streams and song titles from displaying
let currentText = false;
let streamText = false;

//Declares buttons, tables, and background image for data
let aespaButton, kehlaniButton, nikiButton, switchButton;
let aespaTable, kehlaniTable, nikiTable;
let backie;

function preload() {  
  backie = loadImage('data/backie.jpeg'); //Loads image for background
  
//Loads in data from tables of stream data and song titles 
  aespaTable = loadTable('data/aespa_data.csv', 'csv', 'header');
  kehlaniTable = loadTable('data/kehlani_data.csv', 'csv', 'header');
  nikiTable = loadTable('data/niki_data.csv', 'csv', 'header');
  
//For loops to load images for each artist more efficiently
  for (let i = 0; i < 10; i++) {
    aeData[i] = loadImage('data/aespa/aespa' + i + '.jpeg');
  }
  for (let i = 0; i < 10; i++) {
    kData[i] = loadImage('data/kehlani/kehlani' + i + '.jpeg');
  }
  for (let i = 0; i < 10; i++) {
    nData[i] = loadImage('data/niki/niki' + i + '.jpeg');
  }
  
}

function setup() {
  createCanvas(1900, 1000); //Creates a canvas 1900 pixels wide and 1000 pixels tall
  background(backie); //Sets background to previously loaded image
  textFont('Dongle'); //Sets font to "Dongle"
  
  aespaButton = createButton('æspa'); //Creates button that reads "æspa"
  aespaButton.position(1730, 715); //Sets button position to bottom right of screen
  aespaButton.size(145, 75); //Sets button size
  aespaButton.style('font-size', '60px'); //Sets font size
  aespaButton.style('font-family', 'Dongle'); //Sets font for text
  aespaButton.mousePressed(aespaPopData); //Sets function aespaPopData for button
  
  kehlaniButton = createButton('Kehlani'); //Creates button that reads "Kehlani"
  kehlaniButton.position(1705, 810); //Sets button position to bottom right of screen
  kehlaniButton.size(170, 75); 
  kehlaniButton.style('font-size', '60px');
  kehlaniButton.style('font-family', 'Dongle');
  kehlaniButton.mousePressed(kehlaniPopData); //Sets function kehlaniPopData for button
  
  nikiButton = createButton('NIKI'); //Creates button that reads "NIKI"
  nikiButton.position(1760, 905);  //Sets button position to bottom right of screen
  nikiButton.size(115, 75); 
  nikiButton.style('font-size', '60px');
  nikiButton.style('font-family', 'Dongle'); 
  nikiButton.mousePressed(nikiPopData); //Sets function nikiPopData for button
  
  switchButton = createButton('Streams'); //Creates button that reads "Streams"
  switchButton.position(1715, 10); //Sets button position to top left of screen
  switchButton.size(170, 75);
  switchButton.style('font-size', '60px');
  switchButton.style('font-family', 'Dongle');
  switchButton.mousePressed(switchy); //Sets function switchy for button
  
//Calls resizing functions for all images proportional to data
  resizeAespaImages();
  resizeKehlaniImages();
  resizeNikiImages();
    
}
//For loops that resize images according to data from CSV files
function resizeAespaImages() {
  for (let i = 0; i < aeData.length; i++) { //For loop from ChatGPT
  let aSize = aespaTable.getNum(i, 'Streams'); //Gets stream data from table
  aeData[i].resize(aSize, 0); //Resizes images to data from table
  resizedAespaWidth[i] = aeData[i].width; //Saves new sizes of resized images in array
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
  background(backie); //Sets background to preloaded image

  fill(50); //Sets color to dark grey
  rect(0, 0, 2000, 100); //Draws narrow rectangle across the top of the screen
  rect(1111, 530, 572, 450); //Draws rectangle to contain text

  textSize(80); //Sets size of text for instructions
  fill(255); //Sets color to white
  text("Song Name: ", 20, 60); //Displays text that reads "Song Name: "
  
  textSize(45); //Sets size of text

//Text that provides instructions and context to code
  text("* To view different artists' top ten", 1140, 585);
  text("songs, click their names!", 1140, 625);
  text("* Each album cover correlates to an", 1140, 705);
  text("artist's top ten songs on Spotify.", 1140, 745);
  text("* Click the 'Streams' button to see how", 1140, 825);
  text("many plays each song has in millions.", 1144, 865);
  
  textSize(24); //Resizes text for source to make it smaller
  text("All data collected curtesy of Spotify, Kehlani and NIKI stream data collected", 1125, 935);
  text("on February 29th, 12:27 pm, and æspa data collected on March 19, 12:43 pm.", 1125, 955);
  
//Sets code to either display the stream box or not
  if (organize) {
    streamSpots();
  } else {
    albumSpots();
  }
//Code used to show coordinates to facilitate lining up overlays with album covers
//  fill(255);
//  textSize(20);
//  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);

//This bit of code exists because for some reason even if I set the buttons to true or nothing at all at
//the beginning, the buttons just don't work. I can't get rid of this without everything breaking.
  if (aespaButtonPressed) {
    aespaPopData();
  } else if (kehlaniButtonPressed) {
    kehlaniPopData();
  } else if (nikiButtonPressed) {
    nikiPopData();
  }
}

//Function that displays stream numbers
function streamSpots() {
  albumSpots(); //Calls albumSpots function to organize the album covers
  
  fill(50); //Sets color to dark grey
  rect(600, 550, 480, 130); //Draws a rectangle in the middle of the screen
  
  fill(255); //Sets color to white
  textSize(110); //Increases text size
  text(streamText, 630, 635); //Displays amount of streams on top of the previously drawn rectangle
  streamText = true; //Sets text to true
  streamText = '   '; //Makes text disappear

//If/else if statements that display stream count when the area over the album covers is hovered over
//For Aespa
if (mouseX >= 17 && mouseX <= 142 && mouseY >= 125 && mouseY <= 252 && aespaButtonPressed) {
    streamText = '128,995,177';
  } else if (mouseX >= 162 && mouseX <= 273 && mouseY >= 125 && mouseY <= 237 && aespaButtonPressed) {
    streamText = '113,949,561';
  } else if (mouseX >= 293 && mouseX <= 494 && mouseY >= 125 && mouseY <= 330 && aespaButtonPressed) {
    streamText = '205,803,984';
  } else if (mouseX >= 514 && mouseX <= 573 && mouseY >= 125 && mouseY <= 182 && aespaButtonPressed) {
    streamText = '62,446,537';
  } else if (mouseX >= 592 && mouseX <= 686 && mouseY >= 125 && mouseY <= 211 && aespaButtonPressed) {
    streamText = '92,609,838';
  } else if (mouseX >= 702 && mouseX <= 934 && mouseY >= 125 && mouseY <= 355 && aespaButtonPressed) {
    streamText = '231,268,394';
  } else if (mouseX >= 952 && mouseX <= 1176 && mouseY >= 125 && mouseY <= 347 && aespaButtonPressed) {
    streamText = '224,649,121';
  } else if (mouseX >= 1193 && mouseX <= 1331 && mouseY >= 125 && mouseY <= 263 && aespaButtonPressed) {
    streamText = '141,250,839';
  } else if (mouseX >= 1350 && mouseX <= 1456 && mouseY >= 125 && mouseY <= 230 && aespaButtonPressed) {
    streamText = '107,821,954';
  } else if (mouseX >= 1477 && mouseX <= 1546 && mouseY >= 125 && mouseY <= 190 && aespaButtonPressed) {
    streamText = '6,739,518';
  }  
//For Kehlani
if (mouseX >= 17 && mouseX <= 573 && mouseY >= 127 && mouseY <= 680 && kehlaniButtonPressed) {
    streamText = '556,802,039';
  } else if (mouseX >= 596 && mouseX <= 1000 && mouseY >= 125 && mouseY <= 526 && kehlaniButtonPressed) {
    streamText = '404,298,928';
  } else if (mouseX >= 1021 && mouseX <= 1296 && mouseY >= 125 && mouseY <= 396 && kehlaniButtonPressed) {
    streamText = '277,101,416';
  } else if (mouseX >= 1318 && mouseX <= 1697 && mouseY >= 125 && mouseY <= 502 && kehlaniButtonPressed) {
    streamText = '380,241,484';
  } else if (mouseX >= 1717 && mouseX <= 1880 && mouseY >= 125 && mouseY <= 288 && kehlaniButtonPressed) {
    streamText = '164,054,694';
  } else if (mouseX >= 20 && mouseX <= 148 && mouseY >= 700 && mouseY <= 827 && kehlaniButtonPressed) {
    streamText = '130,735,458';
  } else if (mouseX >= 169 && mouseX <= 404 && mouseY >= 700 && mouseY <= 931 && kehlaniButtonPressed) {
    streamText = '235,521,786';
  } else if (mouseX >= 425 && mouseX <= 677 && mouseY >= 700 && mouseY <= 954 && kehlaniButtonPressed) {
    streamText = '253,812,917';
  } else if (mouseX >= 698 && mouseX <= 933 && mouseY >= 700 && mouseY <= 934 && kehlaniButtonPressed) {
    streamText = '235,010,448';
  } else if (mouseX >= 953 && mouseX <= 1070 && mouseY >= 700 && mouseY <= 815 && kehlaniButtonPressed) {
    streamText = '119,41,021';
  }
//For Niki
if (mouseX >= 16 && mouseX <= 132 && mouseY >= 125 && mouseY <= 239 && nikiButtonPressed) {
    streamText = '116,735,293';
  } else if (mouseX >= 151 && mouseX <= 574 && mouseY >= 125 && mouseY <= 547 && nikiButtonPressed) {
    streamText = '426,132,107';
  } else if (mouseX >= 593 && mouseX <= 959 && mouseY >= 125 && mouseY <= 476 && nikiButtonPressed) {
    streamText = '355,085,065';
  } else if (mouseX >= 965 && mouseX <= 1038 && mouseY >= 125 && mouseY <= 198 && nikiButtonPressed) {
    streamText = '73,234,964';
  } else if (mouseX >= 1057 && mouseX <= 1172 && mouseY >= 125 && mouseY <= 239 && nikiButtonPressed) {
    streamText = '117,973,495';
  } else if (mouseX >= 1192 && mouseX <= 1329 && mouseY >= 125 && mouseY <= 259 && nikiButtonPressed) {
    streamText = '138,758,137';
  } else if (mouseX >= 1346 && mouseX <= 1453 && mouseY >= 125 && mouseY <= 227 && nikiButtonPressed) {
    streamText = '108,365,205';
  } else if (mouseX >= 1472 && mouseX <= 1633 && mouseY >= 125 && mouseY <= 285 && nikiButtonPressed) {
    streamText = '164,933,358';
  } else if (mouseX >= 1652 && mouseX <= 1807 && mouseY >= 125 && mouseY <= 279 && nikiButtonPressed) {
    streamText = '157,871,156';
  } else if (mouseX >= 1826 && mouseX <= 1860 && mouseY >= 125 && mouseY <= 157 && nikiButtonPressed) {
    streamText = '34,440,802';
  }
}


//Function that organizes the album covers according to the data from the table
function albumSpots() {
  let spacer = 20; //Sets spacing variable to 20
  let totalWidth = 0; //Sets base width to 0
  let spacingFactor = 0.1; //Sets spacing factor to 0.1
  let y1 = 125; //Sets y-coordinate of the first line to 125
  let y2 = 700; //Sets y-coordinate of the second line to 700
  let x1 = spacer; //Sets x-coordinate of the first line to spacing variable
  let x2 = spacer; //Sets x-coordinate of the second line to spacing variable
  let count = 0; //Set count to 0


// Calculate dynamic spacing for Aespa and Kehlani to prevent images from running off the edge and space them
  let aeSpacing = (width - totalWidth) / (aeData.length + 1) * spacingFactor;
  let nSpacing = (width - totalWidth) / (nData.length + 1) * spacingFactor;

//Spaces Aespa album covers in accordance with the proportions from the corresponding table
  if (aespaButtonPressed) {
    let x = aeSpacing;
    for (let i = 0; i < aeData.length; i++) {
      image(aeData[i], x, 125); //Displays Aespa album covers
      x += resizedAespaWidth[i] + aeSpacing;
    }
    
//Kehlani's album covers have a difference code because the scaling of the images is so large
  } else if (kehlaniButtonPressed) {
    for (let i = 0; i < kData.length; i++) {
      if (i < kData.length / 2) { // Draw the image at the calculated position
        image(kData[i], x1, y1); // Draw in the first row
        //Code to display Kehlani's album covers in two different rows
        x1 += resizedKehlaniWidth[i] + spacer; 
      } else {
        if (count === 0) {
          x2 = spacer;
        }
        image(kData[i], x2, y2); // Draw in the second row
        x2 += resizedKehlaniWidth[i] + spacer; 
        count++;  
    }

      // Checks if the next album cover runs off the canvas in the second row
      if (x2 + resizedKehlaniWidth[i + 1] + spacer > width) {
        x2 = spacer; // Reset the x position for the second row
        y2 += resizedKehlaniWidth[i] + spacer; 
        count = 0;  
    }
}
  } else if (nikiButtonPressed) {
    let x = nSpacing;
    for (let i = 0; i < nData.length; i++) {
      image(nData[i], x, 125);
      x += resizedNikiWidth[i] + nSpacing;
    }
  }
}

//Function that loops the stream vs. popularity functions to prevent glitches
function switchy() {
  organize = !organize;
  loop(); //Loops switchy function
}


function aespaPopData() {
//Sets Aespa button to true and all others to false
  aespaButtonPressed = true;
  kehlaniButtonPressed = false;
  nikiButtonPressed = false;
  
  noTint(); //Removes tint
  noStroke(); //Removes Stroke
  textSize(70); //Resizes text
  text(currentText, 320, 62); //Displays song titles at the top left of the screen
  currentText = true; //Sets text to true
  currentText = '   '; //Makes text disappear

//Displays white, semi-transparent, squares proportional to the Aespa album covers as well as the popularity standing and song title
  if (mouseX >= 17 && mouseX <= 142 && mouseY >= 125 && mouseY <= 252) {
    fill(255, 255, 255, 200); //Sets color to white and semi-transparent
    rect(17, 125, 128, 128); //Draws square over album cover
    fill(0); //Sets color to black
    textSize(110); //Sets text size
    text('#1', 40, 210); //Sets text on album cover in the middle to #1
    currentText = 'Drama'; //Displays song name
  } else if (mouseX >= 162 && mouseX <= 273 && mouseY >= 125 && mouseY <= 237) {
    fill(255, 255, 255, 200);
    rect(162, 125, 114, 113);
    fill(0);
    textSize(90);
    text('#2', 180, 200);
    currentText = 'Spicy';
  } else if (mouseX >= 293 && mouseX <= 494 && mouseY >= 125 && mouseY <= 330) {
    fill(255, 255, 255, 200);
    rect(293, 125, 205, 205);
    fill(0);
    textSize(170);
    text('#3', 325, 260);
    currentText = 'Savage';
  } else if (mouseX >= 514 && mouseX <= 573 && mouseY >= 125 && mouseY <= 182) {
    fill(255, 255, 255, 200);
    rect(514, 125, 63, 62);
    fill(0);
    textSize(40);
    text('#4', 530, 165);
    currentText = 'Better Things';
  } else if (mouseX >= 592 && mouseX <= 686 && mouseY >= 125 && mouseY <= 211) {
    fill(255, 255, 255, 200);
    rect(592, 125, 95, 95);
    fill(0);
    textSize(70);
    text('#5', 610, 190);
    currentText = 'Hold On Tight';
  } else if (mouseX >= 702 && mouseX <= 934 && mouseY >= 125 && mouseY <= 355) {
    fill(255, 255, 255, 200);
    rect(702, 125, 233, 232);
    fill(0);
    textSize(190);
    text('#6', 740, 280);
    currentText = 'Next Level';
  } else if (mouseX >= 952 && mouseX <= 1176 && mouseY >= 125 && mouseY <= 347) {
    fill(255, 255, 255, 200);
    rect(952, 125, 224, 225);
    fill(0);
    textSize(180);
    text('#7', 990, 270);
    currentText = 'Black Mamba';
  } else if (mouseX >= 1193 && mouseX <= 1331 && mouseY >= 125 && mouseY <= 263) {
    fill(255, 255, 255, 200);
    rect(1193, 125, 141, 141);
    fill(0);
    textSize(110);
    text('#8', 1220, 220);
    currentText = 'Illusion';
  } else if (mouseX >= 1350 && mouseX <= 1456 && mouseY >= 125 && mouseY <= 230) {
    fill(255, 255, 255, 200);
    rect(1350, 125, 108, 107);
    fill(0);
    textSize(80);
    text('#9', 1370, 195);
    currentText = 'Girls';
  } else if (mouseX >= 1477 && mouseX <= 1546 && mouseY >= 125 && mouseY <= 190) {
    fill(255, 255, 255, 200);
    rect(1476, 125, 67, 67);
    fill(0);
    textSize(40);
    text('#10', 1485, 167);
    currentText = 'Lucid Dream';
  }
}

//Same thing as above for Kehlani
function kehlaniPopData() {
  aespaButtonPressed = false;
  kehlaniButtonPressed = true;
  nikiButtonPressed = false;
  
  noStroke();
  textSize(70);
  text(currentText, 320, 62);
  currentText = true;
  currentText = '   ';
  fill(255);
  
if (mouseX >= 17 && mouseX <= 573 && mouseY >= 127 && mouseY <= 680) {
    fill(255, 255, 255, 200);
    rect(18, 125, 558, 556);
    fill(0);
    textSize(510);
    text('#1', 110, 510);
    currentText = 'Nights Like This (feat. Ty Dolla $ign)';
  } else if (mouseX >= 596 && mouseX <= 1000 && mouseY >= 125 && mouseY <= 526) {
    fill(255, 255, 255, 200);
    rect(596, 125, 405, 404);
    fill(0);
    textSize(350);
    text('#2', 650, 400);
    currentText = 'Gangsta';
  } else if (mouseX >= 1021 && mouseX <= 1296 && mouseY >= 125 && mouseY <= 396) {
    fill(255, 255, 255, 200);
    rect(1020, 125, 277, 277);
    fill(0);
    textSize(220);
    text('#3', 1070, 300);
    currentText = 'Done for Me (feat. Kehlani)';
  } else if (mouseX >= 1318 && mouseX <= 1697 && mouseY >= 125 && mouseY <= 502) {
    fill(255, 255, 255, 200);
    rect(1317, 125, 380, 380);
    fill(0);
    textSize(330);
    text('#4', 1370, 380);
    currentText = 'Good Life (with G-Eazy and Kehlani)';
  } else if (mouseX >= 1717 && mouseX <= 1880 && mouseY >= 125 && mouseY <= 288) {
    fill(255, 255, 255, 200);
    rect(1716, 125, 165, 164);
    fill(0);
    textSize(150);
    text('#5', 1740, 240);
    currentText = 'Toxic';
  } else if (mouseX >= 20 && mouseX <= 148 && mouseY >= 700 && mouseY <= 827) {
    fill(255, 255, 255, 200);
    rect(20, 700, 130, 130);
    fill(0);
    textSize(100);
    text('#6', 45, 785);
    currentText = 'Can I';
  } else if (mouseX >= 169 && mouseX <= 404 && mouseY >= 700 && mouseY <= 931) {
    fill(255, 255, 255, 200);
    rect(170, 700, 237, 235);
    fill(0);
    textSize(170);
    text('#7', 225, 850);
    currentText = 'Ring (feat. Kehlani)';
  } else if (mouseX >= 425 && mouseX <= 677 && mouseY >= 700 && mouseY <= 954) {
    fill(255, 255, 255, 200);
    rect(424, 700, 255, 252);
    fill(0);
    textSize(190);
    text('#8', 470, 860);
    currentText = 'Good Thing (with Kehlani)';
  } else if (mouseX >= 698 && mouseX <= 933 && mouseY >= 700 && mouseY <= 934) {
    fill(255, 255, 255, 200);
    rect(697, 700, 236, 235);
    fill(0);
    textSize(170);
    text('#9', 740, 860);
    currentText = 'Honey';
  } else if (mouseX >= 953 && mouseX <= 1070 && mouseY >= 700 && mouseY <= 815) {
    fill(255, 255, 255, 200);
    rect(954, 700, 118, 118);
    fill(0);
    textSize(70);
    text('#10', 975, 780);
    currentText = 'At My Worst (feat. Kehlani)';
  }
}

//Same thing as above for Niki
function nikiPopData() {
  aespaButtonPressed = false;
  kehlaniButtonPressed = false;
  nikiButtonPressed = true;
  
  noStroke();
  textSize(70);
  text(currentText, 320, 62);
  currentText = true;
  currentText = '   ';
  fill(255);
  
if (mouseX >= 16 && mouseX <= 132 && mouseY >= 125 && mouseY <= 239) {
    fill(255, 255, 255, 200);
    rect(16, 125, 120, 117);
    fill(0);
    textSize(80);
    text('#1', 50, 200);
    currentText = 'Take A Chance With Me';
  } else if (mouseX >= 151 && mouseX <= 574 && mouseY >= 125 && mouseY <= 547) {
    fill(255, 255, 255, 200);
    rect(151, 125, 427, 426);
    fill(0);
    textSize(370);
    text('#2', 210, 400);
    currentText = 'lowkey';
  } else if (mouseX >= 593 && mouseX <= 959 && mouseY >= 125 && mouseY <= 476) {
    fill(255, 255, 255, 200);
    rect(593, 125, 356, 355);
    fill(0);
    textSize(275);
    text('#3', 650, 365);
    currentText = 'Every Summertime';
  } else if (mouseX >= 965 && mouseX <= 1038 && mouseY >= 125 && mouseY <= 198) {
    fill(255, 255, 255, 200);
    rect(965, 125, 75, 74);
    fill(0);
    textSize(60);
    text('#4', 980, 175);
    currentText = 'Backburner';
  } else if (mouseX >= 1057 && mouseX <= 1172 && mouseY >= 125 && mouseY <= 239) {
    fill(255, 255, 255, 200);
    rect(1057, 125, 120, 117);
    fill(0);
    textSize(100);
    text('#5', 1075, 203);
    currentText = 'Oceans & Engines';
  } else if (mouseX >= 1192 && mouseX <= 1329 && mouseY >= 125 && mouseY <= 259) {
    fill(255, 255, 255, 200);
    rect(1192, 125, 136, 138);
    fill(0);
    textSize(125);
    text('#6', 1205, 223);
    currentText = 'High School in Jakarta';
  } else if (mouseX >= 1346 && mouseX <= 1453 && mouseY >= 125 && mouseY <= 227) {
    fill(255, 255, 255, 200);
    rect(1346, 125, 108, 108);
    fill(0);
    textSize(80);
    text('#7', 1365, 195);
    currentText = 'urs';
  } else if (mouseX >= 1472 && mouseX <= 1633 && mouseY >= 125 && mouseY <= 285) {
    fill(255, 255, 255, 200);
    rect(1471, 125, 165, 165);
    fill(0);
    textSize(120);
    text('#8', 1500, 235);
    currentText = 'La La Lost You - Acoustic Version';
  } else if (mouseX >= 1652 && mouseX <= 1807 && mouseY >= 125 && mouseY <= 279) {
    fill(255, 255, 255, 200);
    rect(1651, 125, 158, 157);
    fill(0);
    textSize(115);
    text('#9', 1685, 225);
    currentText = 'I Like U';
  } else if (mouseX >= 1826 && mouseX <= 1860 && mouseY >= 125 && mouseY <= 157) {
    fill(255, 255, 255, 200);
    rect(1826, 125, 33, 34);
    fill(0);
    textSize(20);
    text('#10', 1833, 146);
    currentText = 'Anaheim';
  }
}
