let huh;

function preload(){
    homeScreen = loadImage('data/home_screen_blank.png');
    weather_app = loadImage('data/weather_app.png');
    calendar_app = loadImage('data/calendar_app.png');
    nycWeather = loadImage('data/nyc_weather.png');
    frame = loadImage('data/hs_frame.png');
    notificationBar = loadImage('data/notification_bar.png');
    huh = loadSound('data/huh.mp3');
  }

function initializeMap() {

  document.getElementById('defaultCanvas0').style.visibility = 'hidden';
  document.getElementById('mapid').style.display = 'block';
    

  maps.hide();
  weather.hide();
  calendar.hide();
  picture.hide();
  returnHome.show();

  var bounds = [[-90, -180], [90, 180]];

  var stLouisMap = L.map('mapid').setView([38.60794134819674, -90.30100140503811], 15); // Centered on St. Louis City with a lower zoom level

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map Data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
  }).addTo(stLouisMap); 

  var imageOverlay = L.imageOverlay('hs_frame.png', bounds).addTo(stLouisMap);

  var stLouisMarker = L.marker([38.60794134819674, -90.30100140503811]).addTo(stLouisMap); // Marker for St. Louis City

  stLouisMarker.bindPopup("<b>Home</b><br>St. Louis City").openPopup(); // Popup for St. Louis marker

  //Marker for Central Park with popup when clicked on
  L.marker([40.782864, -73.965355]).bindPopup("<b>Central Park</b><br>Saved Location").addTo(stLouisMap);

  // Create a button control to return to canvas
  returnButton = L.control({ position: 'topright' });

  returnButton.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

      div.innerHTML = '<button onclick="returnToCanvas()">\n\n........\n.</button>';

      return div;
  };

  returnButton.addTo(stLouisMap);
}

function setup() {
    createCanvas(1080, 1920);

    picture = createImg('data/picture_icon.png');
    picture.position(136.5, 1048);

    maps = createImg('data/map_icon.png');
    maps.position(136.5, 1449);
    maps.mousePressed(initializeMap);
    maps.style('cursor', 'pointer');

    calendar = createImg('data/calendar_icon.png');
    calendar.position(598.5, 1048);
    calendar.mousePressed(calendarApp);
    calendar.style('cursor', 'pointer');


    weather = createImg('data/weather_icon.png');
    weather.position(598.5, 1449);
    weather.mousePressed(weatherApp);
    weather.style('cursor', 'pointer');

    
    returnHome = createImg('data/return_to_home_screen.png');
    returnHome.position(803, 783);
    returnHome.mousePressed(draw);
    returnHome.style('cursor', 'pointer');

    notifs = createImg('data/top_button.png')
    notifs.position(78, 80);
    notifs.mousePressed(notifBar);
    notifs.style('cursor', 'pointer');

    firstInput = createInput();
    firstInput.position(145, 730);
    firstInput.size(500, 80);
    firstInput.style('font-size', '40px');
    firstInput.input(checkAnswers);
    firstInput.attribute('id', 'firstInput'); // Add id attribute


    secondInput = createInput();
    secondInput.position(145, 1030);
    secondInput.size(500, 80);
    secondInput.style('font-size', '40px');
    secondInput.input(checkAnswers);
    secondInput.attribute('id', 'secondInput'); // Add id attribute



    thirdInput = createInput();
    thirdInput.position(145, 1360);
    thirdInput.size(500, 80);
    thirdInput.style('font-size', '40px');
    thirdInput.input(checkAnswers);
    thirdInput.attribute('id', 'thirdInput'); // Add id attribute



    fourthInput = createInput();
    fourthInput.position(145, 1680);
    fourthInput.size(500, 80);
    fourthInput.style('font-size', '40px');
    fourthInput.input(checkAnswers);
    fourthInput.attribute('id', 'fourthInput'); // Add id attribute

    
}

   
function draw() {

  document.getElementById('defaultCanvas0').style.visibility = 'visible';
  document.getElementById('mapid').style.display = 'none';

  image(homeScreen, 0, 0);
  homer();
  
  noLoop();
}

function returnToCanvas() {
  loop(); // Restart looping draw function
}

function weatherApp() {
  image(weather_app, 0, 0);    
  mouseClicked();
  appy();
}

function calendarApp() {
  image(calendar_app, 0, 0);    
  appy();
}

function notifBar() {
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
  if (mouseX >= 542.5 && mouseX <= 955.5 && mouseY >= 1666.5 && mouseY <= 1793.5) {
    image(nycWeather, 0, 0);

  } else if (mouseX >= 121.5 && mouseX <= 535.5 && mouseY >= 1658.5 && mouseY <= 1781.5){
    image(weather_app, 0, 0);    
  } 

  //coordinates for notification bar
  //display notification image
  //draw input bar and check button(s)
  //if text = certain results, display "call" and play audio

}

function homer() {
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
  let firstAnswer = firstInput.value().toLowerCase();
  let secondAnswer = secondInput.value().toLowerCase();
  let thirdAnswer = thirdInput.value().toLowerCase();
  let fourthAnswer = fourthInput.value().toLowerCase();

  if (firstAnswer === "Central Park, New York" && secondAnswer === "Rainy" && thirdAnswer === "960 miles" && fourthAnswer === "2:00 pm") {
      image(weather_app, 0, 0)
  } 

}