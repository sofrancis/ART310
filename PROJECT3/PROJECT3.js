let end, call; //variables for final audio and screen

function preload(){
    homeScreen = loadImage('data/home_screen_blank.png'); //Loads image for homescreen
    weather_app = loadImage('data/weather_app.png'); //Loads image for weather app
    calendar_app = loadImage('data/calendar_app.png'); //Loads image for calendar app
    nycWeather = loadImage('data/nyc_weather.png'); //Loads image for New York weather
    notificationBar = loadImage('data/notification_bar.png'); //Loads image for "drop-down" notification bar
    end = loadSound('data/winner.mp3'); //Loads sound for Mom's call
    call = loadImage('data/call.png'); //Loads image for final call
  }

function initializeMap() {
  //Hides map initially
  document.getElementById('defaultCanvas0').style.visibility = 'hidden';
  document.getElementById('mapid').style.display = 'block';
  
  //Hides all other buttons except the return button
  maps.hide();
  weather.hide();
  calendar.hide();
  picture.hide();
  returnHome.show();

  //Sets zoom and opening location of map, centered on St. Louis
  var bounds = [[-90, -180], [90, 180]];
  var stLouisMap = L.map('mapid').setView([38.60794134819674, -90.30100140503811], 15); 

  //Loads a tile to start
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
  }).addTo(stLouisMap); 

  //Creates a marker for St. Louis that says "Home"
  var stLouisMarker = L.marker([38.60794134819674, -90.30100140503811]).addTo(stLouisMap); // Marker for St. Louis City
  stLouisMarker.bindPopup("<b>Home</b><br>St. Louis City").openPopup(); // Popup for St. Louis marker

  //Creates a marker for Central Park with popup when clicked on
  L.marker([40.782864, -73.965355]).bindPopup("<b>Central Park</b><br>Saved Location").addTo(stLouisMap);

  //Creates a button to return to the home screen
  returnButton = L.control({ position: 'topright' });
  returnButton.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.innerHTML = '<button onclick="returnToCanvas()">\n\n........\n.</button>';
      return div;
  };
  returnButton.addTo(stLouisMap);
}

function setup() {
    createCanvas(1080, 1920); //Creates canvas

    //Picture of Mommy and Daughter
    picture = createImg('data/picture_icon.png');
    picture.position(136.5, 1048);

    //Button for the map app
    maps = createImg('data/map_icon.png');
    maps.position(136.5, 1449);
    maps.mousePressed(initializeMap);
    maps.style('cursor', 'pointer');

    //Button for the calendar app
    calendar = createImg('data/calendar_icon.png');
    calendar.position(598.5, 1048);
    calendar.mousePressed(calendarApp);
    calendar.style('cursor', 'pointer');

    //Button for the weather app
    weather = createImg('data/weather_icon.png');
    weather.position(598.5, 1449);
    weather.mousePressed(weatherApp);
    weather.style('cursor', 'pointer');

    //Button to return to home screen
    returnHome = createImg('data/return_to_home_screen.png');
    returnHome.position(803, 783);
    returnHome.mousePressed(draw);
    returnHome.style('cursor', 'pointer');

    //Button that shows notification bar
    notifs = createImg('data/top_button.png')
    notifs.position(78, 80);
    notifs.mousePressed(notifBar);
    notifs.style('cursor', 'pointer');

    //Text box to answer, "Where is Mommy?"
    firstInput = createInput();
    firstInput.position(145, 730);
    firstInput.size(500, 80);
    firstInput.style('font-size', '40px');
    firstInput.input(checkAnswers);

    //Text box to answer, "What is the weather where Mommy is?"
    secondInput = createInput();
    secondInput.position(145, 1030);
    secondInput.size(500, 80);
    secondInput.style('font-size', '40px');
    secondInput.input(checkAnswers);

    //Text box to answer, "Am I supposed to be alone?"
    thirdInput = createInput();
    thirdInput.position(145, 1360);
    thirdInput.size(500, 80);
    thirdInput.style('font-size', '40px');
    thirdInput.input(checkAnswers);

    //Text box to answer, "What time is it where Mommy is?"
    fourthInput = createInput();
    fourthInput.position(145, 1680);
    fourthInput.size(500, 80);
    fourthInput.style('font-size', '40px');
    fourthInput.input(checkAnswers);

    
}

   
function draw() {

  //Hides map
  document.getElementById('defaultCanvas0').style.visibility = 'visible';
  document.getElementById('mapid').style.display = 'none';

  //Displays home screen, displays app buttons, hides return button
  image(homeScreen, 0, 0);
  homer();
  
  //Stops loop so that the home screen can be returned to
  noLoop();
}

function returnToCanvas() {
  loop(); // Restart looping draw function
}

function weatherApp() {
  //Displays weather app image, runs mouseClicked function to switch between locations, hides apps
  image(weather_app, 0, 0);    
  mouseClicked();
  appy();
}

function calendarApp() {
  //Displays calendar app image, hides apps
  image(calendar_app, 0, 0);    
  appy();
}

function notifBar() {
  //Displays notification bar image, hides apps, shows return buttons as well as text boxes
  image(notificationBar, 0, 0);
  maps.hide();
  weather.hide();
  calendar.hide();
  picture.hide();
  returnHome.show();

  firstInput.show();
  secondInput.show();
  thirdInput.show();
  fourthInput.show();

}

function mouseClicked() {
  //Displays St. Louis weather if bottom left is clicked on and New York weather when bottom right is clicked on
  if (mouseX >= 542.5 && mouseX <= 955.5 && mouseY >= 1666.5 && mouseY <= 1793.5) {
    image(nycWeather, 0, 0);

  } else if (mouseX >= 121.5 && mouseX <= 535.5 && mouseY >= 1658.5 && mouseY <= 1781.5){
    image(weather_app, 0, 0);    
  } 

}

function homer() {
  //Function to hide return button and text boxes, shows apps
  returnHome.hide();
  maps.show();
  weather.show();
  calendar.show();
  picture.show();
  firstInput.hide();
  secondInput.hide();
  thirdInput.hide();
  fourthInput.hide();
}

function appy() {
  //Function to hide apps and texts boxes, shows return button
  maps.hide();
  weather.hide();
  calendar.hide();
  picture.hide();
  returnHome.show();
  firstInput.hide();
  secondInput.hide();
  thirdInput.hide();
  fourthInput.hide();
}

function checkAnswers() {
  
  //Retrieves values from text box answers and transforms all into lowercase values
  let firstAnswer = firstInput.value().toLowerCase();
  let secondAnswer = secondInput.value().toLowerCase();
  let thirdAnswer = thirdInput.value().toLowerCase();
  let fourthAnswer = fourthInput.value().toLowerCase();


  //If all the answers entered match up to the correct ones, a "call" will play with an icon of a phone
  if (firstAnswer === "central park, new york" && secondAnswer === "rainy" && thirdAnswer === "no" && fourthAnswer === "2:00 pm") {
      end.play();
      image(call, 0, 0);
  } 

}