/*
Created by: Ben Lawrence
Last updated: 25/10/2024
This code contains all the subroutines needed in order to run the program.
*/

//arrays
let eventButtons = [];
let addBuildingButtons = [];
let kingdomList = [];
let buildingList = [];
let easyScores = [];
let mediumScores = [];
let hardScores = [];

//boolean variables
let gameStarted = false;
let eventsStarted = false;
let eventActive = false;
let playerKingdomCreated = false;
let easy = false;
let medium = false;
let hard = false;
let gamePaused = false;

//other variables
let nameSetter;
let colourPicker;
let gold;
let goldInc;
let time;
let timeEventActive;
let timeInDebt;
let conquerCount;
let swordClashCount = -1;

function preload() {
  //sound
  swordClashSound = loadSound("sound/sword_clash.mp3");
  buttonPress = loadSound("sound/button_press.mp3");
  startScreenMusic = loadSound("sound/start_screen_music.mp3");
  gameMusic = loadSound("sound/game_music.mp3");
  winScreenMusic = loadSound("sound/win_screen_music.mp3");
  loseScreenMusic = loadSound("sound/lose_screen_music.mp3");
  
  //background images
  backgroundCastleImg = loadImage("images/backgrounds/background_castle.jpg");
  scrollImg = loadImage("images/backgrounds/scroll.png");
  difficultyImg = loadImage("images/backgrounds/difficulty.jpg");
  winScreenImg = loadImage("images/backgrounds/win_screen.webp");
  loseScreenImg = loadImage("images/backgrounds/lose_screen.webp");
  gameTipsImg = loadImage("images/backgrounds/game_tips.jpg");
  swordImg = loadImage("images/backgrounds/sword.png");
  
  //event images
  banditsInTownImg = loadImage("images/events/bandits_in_town.jpg");
  blacksmithsAvailableImg = loadImage("images/events/blacksmiths_available.jpg");
  bountifulHarvestImg = loadImage("images/events/bountiful_harvest.jpg");
  excellentTradeDealImg = loadImage("images/events/excellent_trade_deal.jpg");
  famousChampionImg = loadImage("images/events/famous_champion.jpg");
  goldRushImg = loadImage("images/events/gold_rush.jpg");
  legendaryCommanderImg = loadImage("images/events/legendary_commander.jpg");
  meagreHarvestImg = loadImage("images/events/meagre_harvest.jpg");
  mercenariesAvailableImg = loadImage("images/events/mercenaries_available.jpg");
  regularHarvestImg = loadImage("images/events/regular_harvest.jpg");
  severeDroughtImg = loadImage("images/events/severe_drought.jpg");
  significantDiscoveryImg = loadImage("images/events/significant_discovery.jpg");
  thePlagueImg = loadImage("images/events/the_plague.jpg");
  theStormImg = loadImage("images/events/the_storm.jpg");
  
  //military buildings
  barracksImg = loadImage("images/buildings/barracks.webp");
  largeCampImg = loadImage("images/buildings/large_camp.webp");
  castleImg = loadImage("images/buildings/castle.webp");
  
  //economic buildings
  farmlandsImg = loadImage("images/buildings/farmlands.webp");
  waterMillsImg = loadImage("images/buildings/water_mills.WEBP");
  mineImg = loadImage("images/buildings/mine.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  //button creations
  addBarracks = createButton("+");
  addBuildingButtons.push(addBarracks);
  addBarracks.position(windowWidth*(37/48) - addBarracks.width, windowWidth*(11/90) + windowHeight*(3/40) - addBarracks.height);
  addLargeCamp = createButton("+");
  addBuildingButtons.push(addLargeCamp);
  addLargeCamp.position(windowWidth*(7/8) - addLargeCamp.width, windowWidth*(11/90) + windowHeight*(3/40) - addLargeCamp.height);
  addCastle = createButton("+");
  addBuildingButtons.push(addCastle);
  addCastle.position(windowWidth*(47/48) - addCastle.width, windowWidth*(11/90) + windowHeight*(3/40) - addCastle.height);
  addFarmlands = createButton("+");
  addBuildingButtons.push(addFarmlands);
  addFarmlands.position(windowWidth*(37/48) - addFarmlands.width, windowWidth*(5/18) + windowHeight*(3/40) - addFarmlands.height);
  addWaterMills = createButton("+");
  addBuildingButtons.push(addWaterMills);
  addWaterMills.position(windowWidth*(7/8) - addWaterMills.width, windowWidth*(5/18) + windowHeight*(3/40) - addWaterMills.height);
  addMine = createButton("+");
  addBuildingButtons.push(addMine);
  addMine.position(windowWidth*(47/48) - addMine.width, windowWidth*(5/18) + windowHeight*(3/40) - addMine.height);
  
  undo = createButton("Restart Game");
  undo.position(windowWidth*(5/6) - undo.width/2, windowHeight - undo.height*2);
  
  pause = createButton("||");
  pause.position(pause.width, pause.height);
  
  seeLeaderboard = createButton("See Leaderboard");
  seeLeaderboard.position(windowHeight*(3/8) - seeLeaderboard.width/2, windowHeight*(3/4) - 40 - seeLeaderboard.height/2);
  
  tips = createButton("See Game Tips");
  tips.position(windowHeight*(3/8) - seeLeaderboard.width/2 - tips.width - 10, windowHeight*(3/4) - 40 - tips.height/2);
  
  backToLoseScreen = createButton("Back to Lose Screen");
  backToLoseScreen.position(windowWidth*(1/2) - backToLoseScreen.width/2, windowWidth*(63/320) + windowHeight/2);
  
  backToWinScreen = createButton("Back to Win Screen");
  backToWinScreen.position(windowWidth*(1/2) - backToWinScreen.width/2, windowWidth*(63/320) + windowHeight/2);
  
  conquer = createButton("Conquer Neighbouring Kingdom!");
  conquer.position(windowWidth*(1/2) - conquer.width/2, conquer.height);

  //setting the colour rgb values so they can be passed in as parameters in to the Kingdom class
  let or = color(201, 72, 20);
  let yl = color(217, 178, 72);
  let prp = color(126, 17, 150);
  let lbl = color(104, 135, 237);
  
  //creating the kingdoms and putting them in a array
  let mercia = new Kingdom("Mercia", or, 40);
  let castile = new Kingdom("Castile", yl, 60);
  let byzantineEmpire = new Kingdom("Byzantine Empire", prp, 80);
  let mongolEmpire = new Kingdom("Mongol Empire", lbl, 100);
  kingdomList.push(mongolEmpire, byzantineEmpire, castile, mercia);
  
  //creating the buildings and putting them in a array
  let barracks = new Building("Barracks", 100, 3, 0);
  let smallCamp = new Building("Small Camp", 250, 10, 0);
  let castle = new Building("Castle", 500, 25, 0);
  let farmlands = new Building("Farmlands", 100, 0, 1);
  let waterMills = new Building("Water Mills", 250, 0, 3);
  let mine = new Building("Mine", 500, 0, 10);
  buildingList.push(barracks, smallCamp, castle, farmlands, waterMills, mine);
  
  startScreen();
}

function startScreen() {
  
  //sound
  startScreenMusic.loop();
  gameMusic.stop();
  winScreenMusic.stop();
  loseScreenMusic.stop();
  
  //resetting variables
  easy = false;
  medium = false;
  hard = false;
  gamePaused = false;
  eventActive = false;
    
  goldInc = 0;
  time = 0;
  timeEventActive = 0;
  timeInDebt = 0;
  conquerCount = 0;
  
  //resets all building amounts
  for (i = 0; i < (buildingList.length); i++) {
    buildingList[i].setBuildingAmount(0);
  }
    
  //hiding addBuilding buttons
  for (i= 0; i < addBuildingButtons.length; i++) {
    addBuildingButtons[i].hide();
  }
  
  //hiding event buttons
  if (eventsStarted) {
    eventsStarted = false;
    for (i= 0; i < eventButtons.length; i++) {
      eventButtons[i].hide();
    }
  }
  
  background(255);
  gameStarted = false;
  
  //displaying the background
  noStroke();
  imageMode(CORNER);
  image(backgroundCastleImg, 0, 0, windowWidth, windowHeight);
  imageMode(CENTER);
  image(scrollImg, windowHeight*(3/8), windowHeight/2, windowHeight*(1/2), windowHeight*(3/4));
  
  //displaying the text for the start screen
  fill(0);
  textAlign(CENTER);
  textSize(windowHeight/35);
  textStyle(BOLD);
  text("Welcome to Kingdom Wars!", windowHeight*(3/8), windowHeight*(49/180) + 10);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(windowHeight/65);
  text("Your goal is to conquer every kingdom on the map until you rule", windowHeight*(31/200), windowHeight*(31/105) + 15);
  text("them all! In this game, you start in the bottom left of the screen.", windowHeight*(31/200), windowHeight*(424/1365) + 15);
  text("To be successful, you must first increase your income so that", windowHeight*(31/200), windowHeight*(466/1365) + 15);
  text("you are able to afford more buildings, including some that will", windowHeight*(31/200), windowHeight*(487/1365) + 15);
  text("increase your power level. Power is the most essential resource", windowHeight*(31/200), windowHeight*(508/1365) + 15);
  text("in this game because if your power level is at least 10% higher", windowHeight*(31/200), windowHeight*(529/1365) + 15);
  text("than your opponents, then you will be able to conquer them. You", windowHeight*(31/200), windowHeight*(110/273) + 15);
  text("can do this by clicking on the button at the top of the screen.", windowHeight*(31/200), windowHeight*(571/1365) + 15);
  text("However, if your power level reaches 0, your enemies will sense", windowHeight*(31/200), windowHeight*(592/1365) + 15);
  text("your weakness and invade your kingdom! If your gold level.", windowHeight*(31/200),windowHeight*(613/1365) + 15);
  text("decreases below 0, then your power will decrease by 1 every 10", windowHeight*(31/200), windowHeight*(634/1365) + 15);
  text("seconds Events will appear every 30 seconds and you must", windowHeight*(31/200), windowHeight*(131/273) + 15);
  text("press the button at the bottom to close them. I would suggest", windowHeight*(31/200), windowHeight*(52/105) + 15);
  text("your first building to be economic so that you can start making", windowHeight*(31/200), windowHeight*(697/1365) + 15);
  text("money. You can reset the game and start again by clicking the", windowHeight*(31/200), windowHeight*(718/1365) + 15);
  text("button on the bottom right of the screen and you can pause the", windowHeight*(31/200), windowHeight*(739/1365) + 15);
  text("game at any time by clicking the button at the top left of the", windowHeight*(31/200), windowHeight*(152/273) + 15);
  text("screen.", windowHeight*(31/200), windowHeight*(781/1365) + 15);
  text("Please enter your kingdom name and choose a colour", windowHeight*(31/200), windowHeight*(823/1365) + 15);
  text("below to start the game.", windowHeight*(31/200), windowHeight*(844/1365) + 15);
  
  //hides buttons
  undo.hide();
  pause.hide();
  tips.hide();
  seeLeaderboard.hide()
  backToLoseScreen.hide();
  backToWinScreen.hide();
  conquer.hide();
  
  //creating the input boxes and finish setup button
  nameSetter = createInput("");
  nameSetter.position(windowHeight*(3/8) - nameSetter.width, windowHeight*(3/4) - 40 - nameSetter.height/2);
  
  colourPicker = createColorPicker('white');
  colourPicker.position(windowHeight*(1/2) - colourPicker.width/2, windowHeight*(3/4) - 40 - colourPicker.height/2);
  
  let button = createButton("Finish Setup");
  button.position(windowHeight*(3/8) - button.width/2, windowHeight*(3/4) - 20);
  button.mousePressed(difficulty);
}

function difficulty() {
  buttonPress.play();
  
  //presence check
  if (nameSetter.value() == "") {
    alert("Kingdom Name is blank");
    return;
  }
  
  //length check
  if (nameSetter.value().length < 3) {
    alert("Kingdom Name is too short");
    return;
  } else if (nameSetter.value().length > 15) {
    alert("Kingdom Name is too long");
    return;
  }
  
  let r = red(colourPicker.color());
  let g = green(colourPicker.color());
  let b = blue(colourPicker.color());
  
  //luminance check
  if ((0.2126*r + 0.7152*g + 0.0722*b) < 20) {
    alert("Kingdom Colour is too dark");
    return;
  }
  
  background(64);
  
  //hides button
  nameSetter.hide();
  colourPicker.hide();
  this.hide();
  
  //displays new background
  imageMode(CENTER);
  image(difficultyImg, windowWidth/2, windowHeight/2, windowWidth, windowWidth*(9/16));
  
  //creating buttons for each difficulty
  let chooseEasy = createButton("Choose Easy");
  chooseEasy.position(windowWidth*(1/5) - chooseEasy.width/2, windowWidth*(63/320) + windowHeight/2);
  chooseEasy.mousePressed(() => {
    //sets difficulty
    easy = true
    createPlayerKingdom(chooseEasy, chooseMedium, chooseHard);
  });
  
  let chooseMedium = createButton("Choose Medium");
  chooseMedium.position(windowWidth*(1/2) - chooseMedium.width/2, windowWidth*(63/320) + windowHeight/2);
  chooseMedium.mousePressed(() => {
    //sets difficulty
    medium = true
    createPlayerKingdom(chooseEasy, chooseMedium, chooseHard);
  });
  
  let chooseHard = createButton("Choose Hard");
  chooseHard.position(windowWidth*(4/5) - chooseHard.width/2, windowWidth*(63/320) + windowHeight/2);
  chooseHard.mousePressed(() => {
    //sets difficulty
    hard = true
    createPlayerKingdom(chooseEasy, chooseMedium, chooseHard);
  });
}

function createPlayerKingdom(chooseEasy, chooseMedium, chooseHard) {
  //sound
  startScreenMusic.stop();
  gameMusic.loop();
  buttonPress.play();
  
  //changes undo position to centre of the screen
  undo.position(windowWidth*(5/6) - undo.width/2, windowHeight - undo.height*2);
  
  let playerKingdomName = nameSetter.value();
  let playerKingdomColour = colourPicker.color();
  
  //hiding buttons
  chooseEasy.hide();
  chooseMedium.hide();
  chooseHard.hide();
  
  if (playerKingdomCreated == false) {
    //creating the player kingdom and adding it to the end of the queue
    let playerKingdom = new Kingdom(playerKingdomName, playerKingdomColour, 0);
  kingdomList.push(playerKingdom);
    playerKingdomCreated = true;
  } else {
    //if the kingdom has already been created, setter methods must be used
    kingdomList[4].setColor(playerKingdomColour);
    kingdomList[4].setName(playerKingdomName);
  }
  
  //setting initial variables for the chosen difficulty
  if (easy) {
    gold = 500;
    kingdomList[4].setPower(30);
  } else if (medium) {
    gold = 350;
    kingdomList[4].setPower(25);
  } else {
    gold = 250;
    kingdomList[4].setPower(20);
  }
  
  //initial gold increase
  goldInc = 0;
  
  gameStarted = true;
  game();
}

function drawBuildings() {
  
  //creating the buildings ribbon
  stroke(0);
  fill(50);
  rect(windowWidth*(2/3), 0, windowWidth/3, windowHeight);
  fill(255);
  noStroke();
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(windowWidth/60);
  text("Military Buildings:", windowWidth*(11/16), windowHeight*(3/40) + windowWidth*(1/36));
  text("Economic Buildings:", windowWidth*(11/16), windowHeight*(3/40) + windowWidth*(11/60));
  textAlign(CENTER);
  textSize(windowHeight/25);
  text("Buildings:", windowWidth*(5/6), windowHeight*(3/40));
  
  //drawing each building and corresponding text, buttons
  imageMode(CENTER);
  fill(255);
  textSize(windowWidth/90);
  textStyle(NORMAL);
  for (i = 0; i < (buildingList.length); i++) {
    if (i == 0) {
      image(barracksImg, windowWidth*(35/48), windowHeight*(3/40) + windowWidth*(29/360), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + ": " + buildingList[i].buildingAmount, windowWidth*(35/48), windowWidth*(2/15) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(35/48), windowWidth*(13/90) + windowHeight*(3/40));
      text("(Power +" + buildingList[i].buildingPowerIncrease + ")", windowWidth*(35/48), windowWidth*(7/45) + windowHeight*(3/40));
      addBarracks.show();
    } else if (i == 1) {
      image(largeCampImg, windowWidth*(5/6), windowHeight*(3/40) + windowWidth*(29/360), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + "s: " + buildingList[i].buildingAmount, windowWidth*(5/6), windowWidth*(2/15) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(5/6), windowWidth*(13/90) + windowHeight*(3/40));
      text("(Power +" + buildingList[i].buildingPowerIncrease + ")", windowWidth*(5/6), windowWidth*(7/45) + windowHeight*(3/40));
      addLargeCamp.show();
    } else if (i == 2) {
      image(castleImg, windowWidth*(15/16), windowHeight*(3/40) + windowWidth*(29/360), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + "s: " + buildingList[i].buildingAmount, windowWidth*(15/16), windowWidth*(2/15) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(15/16), windowWidth*(13/90) + windowHeight*(3/40));
      text("(Power +" + buildingList[i].buildingPowerIncrease + ")", windowWidth*(15/16), windowWidth*(7/45) + windowHeight*(3/40));
      addCastle.show();
    } else if (i == 3) {
      image(farmlandsImg, windowWidth*(35/48), windowWidth*(17/72) + windowHeight*(3/40), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + ": " + buildingList[i].buildingAmount, windowWidth*(35/48), windowWidth*(13/45) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(35/48), windowWidth*(3/10) + windowHeight*(3/40));
      text("(Gold= +" + buildingList[i].buildingGoldIncrease + "/s)", windowWidth*(35/48), windowWidth*(14/45) + windowHeight*(3/40));
      addFarmlands.show();
    } else if (i == 4) {
      image(waterMillsImg, windowWidth*(5/6), windowWidth*(17/72) + windowHeight*(3/40), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + ": " + buildingList[i].buildingAmount, windowWidth*(5/6), windowWidth*(13/45) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(5/6), windowWidth*(3/10) + windowHeight*(3/40));
      text("(Gold= +" + buildingList[i].buildingGoldIncrease + "/s)", windowWidth*(5/6), windowWidth*(14/45) + windowHeight*(3/40));
      addWaterMills.show();
    } else if (i == 5) {
      image(mineImg, windowWidth*(15/16), windowWidth*(17/72) + windowHeight*(3/40), windowWidth*(1/12), windowWidth*(1/12));
      text(buildingList[i].buildingName + "s: " + buildingList[i].buildingAmount, windowWidth*(15/16), windowWidth*(13/45) + windowHeight*(3/40));
      text("(Cost: " + buildingList[i].buildingCost + " gold)", windowWidth*(15/16), windowWidth*(3/10) + windowHeight*(3/40));
      text("(Gold= +" + buildingList[i].buildingGoldIncrease + "/s)", windowWidth*(15/16), windowWidth*(14/45) + windowHeight*(3/40));
      addMine.show();
    }
  }
}

function drawKingdoms() {
  
  for (i = 0; i < (kingdomList.length); i++) {
    //setting the colour of the region of the map to the kingdom colour
    fill(kingdomList[i].kingdomColour);
    textAlign(CENTER);
    textStyle(BOLD);
    //borders for each kingdom
    strokeWeight(3);
    stroke(0);
    
    //creating each kingdoms area and colour and displaying its name and power
    if (i == 0) {
      rect(0, 0, windowWidth*(2/3), windowHeight/2);
      fill(0);
      noStroke();
      textSize(windowHeight/15);
      text(kingdomList[i].kingdomName, windowWidth/3, windowHeight/4);
      textStyle(NORMAL);
      textSize(windowHeight/20);
      text("Power: " + kingdomList[i].kingdomPower, windowWidth/3, windowHeight*(19/60));
    } else if (i == 1) {
      rect(windowWidth/3, windowHeight/2, windowWidth/3, windowHeight/2);
      fill(0);
      noStroke();
      textSize(windowHeight/20);
      text("Byzantine", windowWidth / 2, windowHeight*(29/40));
      text("Empire", windowWidth / 2, windowHeight*(31/40));
      textStyle(NORMAL);
      textSize(windowHeight/25);
      text("Power: " + kingdomList[i].kingdomPower, windowWidth/2, windowHeight*(33/40));
    } else if (i == 2) {
      rect(0, windowHeight/2, windowWidth/3, windowHeight/4);
      fill(0);
      noStroke();
      textSize(windowHeight/20);
      text(kingdomList[i].kingdomName, windowWidth/6, windowHeight*(5/8));
      textStyle(NORMAL);
      textSize(windowHeight/25);
      text("Power: " + kingdomList[i].kingdomPower, windowWidth/6, windowHeight*(27/40));
    } else if (i == 3) {
      rect(windowWidth/6, windowHeight*(3/4), windowWidth/6, windowHeight/4);
      fill(0);
      noStroke();
      textSize(windowHeight/30);
      text(kingdomList[i].kingdomName, windowWidth/4, windowHeight*(7/8));
      textStyle(NORMAL);
      textSize(windowHeight/40);
      text("Power: " + kingdomList[i].kingdomPower, windowWidth/4, windowHeight*(109/120));
    } else if (i == 4) {
      rect(0, windowHeight*(3/4), windowWidth/6, windowHeight/4);
      fill(0);
      noStroke();
      textSize(windowWidth/(5*kingdomList[i].kingdomName.length));
      text(kingdomList[i].kingdomName, windowWidth/12, windowHeight*(7/8));
    } 
    
  }
  
  //showing buttons
  undo.show();
  undo.mousePressed(() => {
    buttonPress.play();
    startScreen();
  });
  pause.show();
  pause.mousePressed(() => {
    buttonPress.play();
    changePause();
  });
  
}

function changePause() {
  //pauses if unpaused and unpauses if paused
  if (gamePaused) {
    gamePaused = false;
  } else {
    gamePaused = true;
  }
}

function drawEventImg(currentEventImg) {
  //draws event image if active after drawBuildings and drawKingdom has been run
  image(currentEventImg, windowWidth/2, windowHeight/2, windowWidth*(3/4), windowWidth*(27/64));
}

function draw() {
  if (gameStarted) {
    
    //makes sure the map updates properly, any changes to gold power etc. are displayed
    drawBuildings();
    drawKingdoms();
    
    //draws the current state of the player kingdom 
    fill(kingdomList[4].kingdomColour);
    textAlign(CENTER);
    textStyle(BOLD);
    strokeWeight(3);
    stroke(0);
    if (conquerCount == 0) {
      fill(0);
      noStroke();
      textStyle(NORMAL);
      textSize(windowHeight/40);
      text("Power: " + kingdomList[4].kingdomPower, windowWidth/12, windowHeight*(9/10) + windowWidth*(1/(20*kingdomList[4].kingdomName.length)));
    } else if (conquerCount == 1) {
      //recentres kingdom name and power
      rect(0, windowHeight*(3/4), windowWidth/3, windowHeight/4);
      fill(0);
      noStroke();
      textSize(windowWidth/(3*kingdomList[4].kingdomName.length));
      text(kingdomList[4].kingdomName, windowWidth/6, windowHeight*(7/8));
      textSize(windowHeight/25);
      textStyle(NORMAL);
      text("Power: " + kingdomList[4].kingdomPower, windowWidth/6, windowHeight*(183/200) + windowWidth*(1/(12*kingdomList[4].kingdomName.length)));
    } else if (conquerCount == 2) {
      rect(0, windowHeight/2, windowWidth/3, windowHeight/2);
      fill(0);
      noStroke();
      textSize(windowWidth/(3*kingdomList[4].kingdomName.length));
      text(kingdomList[4].kingdomName, windowWidth/6, windowHeight*(3/4));
      textSize(windowHeight/25);
      textStyle(NORMAL);
      text("Power: " + kingdomList[4].kingdomPower, windowWidth/6, windowHeight*(79/100) + windowWidth*(1/(12*kingdomList[4].kingdomName.length)));
    } else if (conquerCount == 3) {
      rect(0, windowHeight/2, windowWidth*(2/3), windowHeight/2);
      fill(0);
      noStroke();
      textSize(windowWidth/(2*kingdomList[4].kingdomName.length));
      text(kingdomList[4].kingdomName, windowWidth/3, windowHeight*(3/4));
      textSize(windowHeight/20);
      textStyle(NORMAL);
      text("Power: " + kingdomList[4].kingdomPower, windowWidth/3, windowHeight*(4/5) + windowWidth*(1/(8*kingdomList[4].kingdomName.length)));
    }
    
    if (gamePaused == false) {
      time ++;
      //every 5 minutes
      if (time % 9000 == 0) {
        harvest();
      //every minute
      } else if (time % 1800 == 0) {
        event();
      }
    } 
    
    //increases gold every second
    if (time % 60 == 0) {
      gold = gold + goldInc;
    }
    
    //displaying gold level
    fill(212,175,55);
    textStyle(NORMAL);
    textAlign(LEFT);
    textSize(windowHeight/40);
    text("Gold: " + gold + " (+" + goldInc + "/s)" , windowWidth*(11/16), windowHeight/40);
    
    //penalises player for being in debt
    if (gold < 0) {
      timeInDebt ++;
      // power is decreased by 1 every 10 seconds
      if (timeInDebt == 600) {
        kingdomList[4].setPower(kingdomList[4].kingdomPower - 1);
        timeInDebt = 0;
      }
    }
    
    if (eventActive) {
      drawEventImg(currentEventImg);
      timeEventActive ++;
      //closes event after 25 seconds
      if (timeEventActive == 1500) {
        game();
      }
      //making sure buttons don't appear over event image
      addBarracks.hide();
      addLargeCamp.hide();
      addCastle.hide();
      addFarmlands.hide();
      addWaterMills.hide();
      addMine.hide();
    } else {
      timeEventActive = 0;
      addBarracks.show();
      addLargeCamp.show();
      addCastle.show();
      addFarmlands.show();
      addWaterMills.show();
      addMine.show();
    }
    
    //time formatting
    textAlign(CENTER);
    timeMin = Math.floor(time/3600);
    if (timeMin < 10) {
      timeMin = "0" + timeMin
    }
    timeSec = Math.floor(time/60) - timeMin*60
    if (timeSec < 10) {
      timeSec = "0" + timeSec
    }
    
    //displaying time
    fill(255);
    noStroke();
    text(timeMin + ":" + timeSec, windowWidth - windowHeight*(3/80), windowHeight/40);
    strokeWeight(2);
    stroke(255);
    noFill();
    rect(windowWidth - windowHeight*(6/80), -10, windowHeight, 10 + windowHeight/30)
    
    //checks if button is pressed to buy building
    addBarracks.mousePressed(() => {
      buttonPress.play();
      //must have enough gold to buy
        if (gold >= buildingList[0].buildingCost) {
          kingdomList[4].setPower(kingdomList[4].kingdomPower + buildingList[0].buildingPowerIncrease);
          gold = gold - buildingList[0].buildingCost;
          buildingList[0].setBuildingAmount(buildingList[0].buildingAmount + 1);
        }
    });
    addLargeCamp.mousePressed(() => {
      buttonPress.play();
        if (gold >= buildingList[1].buildingCost) {
          kingdomList[4].setPower(kingdomList[4].kingdomPower + buildingList[1].buildingPowerIncrease);
          gold = gold - buildingList[1].buildingCost;
          buildingList[1].setBuildingAmount(buildingList[1].buildingAmount + 1);
        }
    });
    addCastle.mousePressed(() => {
      buttonPress.play();
        if (gold >= buildingList[2].buildingCost) {
          kingdomList[4].setPower(kingdomList[4].kingdomPower + buildingList[2].buildingPowerIncrease);
          gold = gold - buildingList[2].buildingCost;
          buildingList[2].setBuildingAmount(buildingList[2].buildingAmount + 1);
        }
    });
    addFarmlands.mousePressed(() => {
      buttonPress.play();
        if (gold >= buildingList[3].buildingCost) {
          goldInc = goldInc + buildingList[3].buildingGoldIncrease;
          gold = gold - buildingList[3].buildingCost;
          buildingList[3].setBuildingAmount(buildingList[3].buildingAmount + 1);
        }
    });
    addWaterMills.mousePressed(() => {
      buttonPress.play();
        if (gold >= buildingList[4].buildingCost) {
          goldInc = goldInc + buildingList[4].buildingGoldIncrease;
          gold = gold - buildingList[4].buildingCost;
          buildingList[4].setBuildingAmount(buildingList[4].buildingAmount + 1);
        }
    });
    addMine.mousePressed(() => {
      buttonPress.play();
        if (gold >= buildingList[5].buildingCost) {
          goldInc = goldInc + buildingList[5].buildingGoldIncrease;
          gold = gold - buildingList[5].buildingCost;
          buildingList[5].setBuildingAmount(buildingList[5].buildingAmount + 1);
        }
    });
    
    //makes sure the player's power is at least 10% higher than the kingdom they are trying to conquer
    if (conquerCount == 0 && kingdomList[4].kingdomPower >= Math.floor(1.1*kingdomList[3].kingdomPower)) {
      conquer.show();
      conquer.mousePressed(swordClash);
    } else if (conquerCount == 1 && kingdomList[4].kingdomPower >= Math.floor(1.1*kingdomList[2].kingdomPower)) {
      conquer.show();
      conquer.mousePressed(swordClash);
    } else if (conquerCount == 2 && kingdomList[4].kingdomPower >= Math.floor(1.1*kingdomList[1].kingdomPower)) {
      conquer.show();
      conquer.mousePressed(swordClash);
    } else if (conquerCount == 3 && kingdomList[4].kingdomPower >= Math.floor(1.1*kingdomList[0].kingdomPower)) {
      conquer.show();
      conquer.mousePressed(swordClash);
    } else {
      conquer.hide();
    }
    
    //plays sound effect and displays animation
    if (swordClashCount == 0) {
      kingdomList[4].setPower(kingdomList[4].kingdomPower + 5);
      swordClash();
      swordClashSound.play();
      swordClashCount ++;
    //rorates swords for 0.5 seconds
    } else if (swordClashCount >= 0 && swordClashCount < 30) {
      swordClash();
      swordClashCount ++;
    //displays stationary swords for 0.5 seconds
    } else if (swordClashCount >= 30 && swordClashCount <= 60) {
      displaySwords();
      swordClashCount ++;
    //hides swords
    } else if (swordClashCount > 60) {
      conquerCount ++;
      swordClashCount = -1;
    }
    
    //win condition
    if (conquerCount == 4) {
      changePause();
      if (easy) {
        leaderboard(easyScores);
      } else if (medium) {
        leaderboard(mediumScores);
      } else {
        leaderboard(hardScores)
      }
      gameStarted = false;
      winScreen();
      winScreenMusic.loop();
    //lose condition
    } else if (kingdomList[4].kingdomPower <= 0) {
      changePause();
      gameStarted = false;
      loseScreen();
      loseScreenMusic.loop();
    }
  }
}

function game() {
  
  //hiding buttons
  if (eventsStarted) {
    eventActive = false;
    for (i= 0; i < eventButtons.length; i++) {
      eventButtons[i].hide();
    }
  }
}

function swordClash() {
  swordClashCount ++;
  
  //left sword rotating clockwise
  push();
  translate(windowWidth/2 - windowHeight/8, windowHeight / 2);
  rotate(swordClashCount * (PI/120));
  image(swordImg, 0, 0, windowHeight*(3/16), windowHeight*(3/4));
  pop();
  
  //right sword rotating anticlockwise
  push();
  translate(windowWidth/2 + windowHeight/8, windowHeight / 2);
  rotate(-swordClashCount * (PI/120));
  image(swordImg, 0, 0, windowHeight*(3/16), windowHeight*(3/4));
  pop();
}

function displaySwords() {
  //displays swords in clashing state
  
  push();
  translate(windowWidth/2 - windowHeight/8, windowHeight / 2);
  rotate(PI/4);
  image(swordImg, 0, 0, windowHeight*(3/16), windowHeight*(3/4));
  pop();
  
  push();
  translate(windowWidth/2 + windowHeight/8, windowHeight / 2);
  rotate(-PI/4);
  image(swordImg, 0, 0, windowHeight*(3/16), windowHeight*(3/4));
  pop();
}

function event() {
  //selects an event at random, sets the image and changes the variables if necessary
  eventsStarted = true;
  eventActive = true;
  let eventNum = Math.floor(random(0,11));
  imageMode(CENTER);
  switch (eventNum) {
    case 0:
      currentEventImg = banditsInTownImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower - 5);
      gold = gold - 300;
      event0 = createButton("We must increase the punishment!");
      eventButtons.push(event0);
      event0.position(windowWidth/2 - event0.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event0.height);
      event0.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 1:
      currentEventImg = blacksmithsAvailableImg;
      event1Accept = createButton("An excellent opportunity");
      eventButtons.push(event1Accept);
      event1Accept.position(windowWidth*(5/16) - event1Accept.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event1Accept.height);
      event1Accept.mousePressed(() => {
        buttonPress.play();
        kingdomList[4].setPower(kingdomList[4].kingdomPower + 10);
        gold = gold - 150;
        game();
      });
      event1Decline = createButton("It is not the right time to use our funds");
      eventButtons.push(event1Decline);
      event1Decline.position(windowWidth*(11/16) - event1Accept.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event1Decline.height);
      event1Decline.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 2:
      currentEventImg = excellentTradeDealImg;
      gold = gold + 100;
      event2 = createButton("We have outsmarted them");
      eventButtons.push(event2);
      event2.position(windowWidth/2 - event2.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event2.height);
      event2.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 3:
      currentEventImg = famousChampionImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower + 5);
      event3 = createButton("He is welcome here");
      eventButtons.push(event3);
      event3.position(windowWidth/2 - event3.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event3.height);
      event3.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 4:
      currentEventImg = goldRushImg;
      gold = gold + 200;
      event4 = createButton("These funds will be put to good use");
      eventButtons.push(event4);
      event4.position(windowWidth/2 - event4.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event4.height);
      event4.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 5:
      currentEventImg = mercenariesAvailableImg;
      event5Accept = createButton("We could do with some reinforcements");
      eventButtons.push(event5Accept);
      event5Accept.position(windowWidth*(5/16) - event5Accept.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event5Accept.height);
      event5Accept.mousePressed(() => {
        buttonPress.play();
        kingdomList[4].setPower(kingdomList[4].kingdomPower + 20);
        gold = gold - 250;
        game();
      });
      event5Decline = createButton("They are are only loyal to their coin purse");
      eventButtons.push(event5Decline);
      event5Decline.position(windowWidth*(11/16) - event5Decline.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event5Decline.height);
      event5Decline.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 6:
      currentEventImg = severeDroughtImg;
      gold = gold - 250;
      event6 = createButton("Mother Nature has been unkind to us");
      eventButtons.push(event6);
      event6.position(windowWidth/2 - event6.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event6.height);
      event6.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 7:
      currentEventImg = thePlagueImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower - 20);
      gold = gold - 500;
      event7 = createButton("Lock the doors!");
      eventButtons.push(event7);
      event7.position(windowWidth/2 - event7.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event7.height);
      event7.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 8:
      currentEventImg = theStormImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower - 15);
      event8 = createButton("We must never speak of this again");
      eventButtons.push(event8);
      event8.position(windowWidth/2 - event8.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event8.height);
      event8.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 9:
      currentEventImg = legendaryCommanderImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower + 15);
      event9 = createButton("May he lead us to many victories");
      eventButtons.push(event9);
      event9.position(windowWidth/2 - event9.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event9.height);
      event9.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 10:
      currentEventImg = significantDiscoveryImg;
      kingdomList[4].setPower(kingdomList[4].kingdomPower + 10);
      gold = gold + 100;
      event10 = createButton("Let's use this to our advantage");
      eventButtons.push(event10);
      event10.position(windowWidth/2 - event10.width/2, windowHeight/2 + windowWidth*(3/16) - 2*event10.height);
      event10.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    
  }
}

function harvest() {
  //chooses how good this years harvest was
  eventsStarted = true;
  eventActive = true;
  let harvestNum = Math.floor(random(0,3));
  imageMode(CENTER);
  switch (harvestNum) {
    case 0:
      currentEventImg = bountifulHarvestImg;
      gold = gold + 150;
      harvest0 = createButton("We can sell the excess!");
      eventButtons.push(harvest0);
      harvest0.position(windowWidth/2 - harvest0.width/2, windowHeight/2 + windowWidth*(3/16) - 2*harvest0.height);
      harvest0.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 1:
      currentEventImg = regularHarvestImg;
      gold = gold + 50;
      harvest1 = createButton("Another year another harvest");
      eventButtons.push(harvest1);
      harvest1.position(windowWidth/2 - harvest1.width/2, windowHeight/2 + windowWidth*(3/16) - 2*harvest1.height);
      harvest1.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
    case 2:
      currentEventImg = meagreHarvestImg;
      gold = gold - 150;
      harvest2 = createButton("We may struggle through the winter");
      eventButtons.push(harvest2);
      harvest2.position(windowWidth/2 - harvest2.width/2, windowHeight/2 + windowWidth*(3/16) - 2*harvest2.height);
      harvest2.mousePressed(() => {
        buttonPress.play();
        game();
      });
      break;
  }
}

function winScreen() {
  gameMusic.stop();
  
  //hiding and showing correct buttons
  for (i= 0; i < eventButtons.length; i++) {
    eventButtons[i].hide();
  }
  addBarracks.hide();
  addLargeCamp.hide();
  addCastle.hide();
  addFarmlands.hide();
  addWaterMills.hide();
  backToLoseScreen.hide();
  backToWinScreen.hide();
  addMine.hide();
  pause.hide();
  conquer.hide();
  undo.show();
  tips.show();
  seeLeaderboard.show();
  undo.position(windowHeight*(3/8) + seeLeaderboard.width/2 + 10, windowHeight*(3/4) - 40 - undo.height/2);
  
  tips.mousePressed(gameTips);
  seeLeaderboard.mousePressed(() => {
    if (easy) {
      displayLeaderboard("Easy", easyScores);
    } else if (medium) {
      displayLeaderboard("Medium", mediumScores);
    } else {
      displayLeaderboard("Hard", hardScores)
    }
  });
  
  //displays background
  imageMode(CORNER);
  image(winScreenImg, 0, 0, windowWidth, windowHeight);
  imageMode(CENTER);
  image(scrollImg, windowHeight*(3/8), windowHeight/2, windowHeight*(1/2), windowHeight*(3/4));
  
  //displaying the text for the win screen
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(windowHeight/35);
  textStyle(BOLD);
  text("Congtratulations!", windowHeight*(3/8), windowHeight*(49/180) + 10);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(windowHeight/50);
  text("You have successfully defeated every enemy in a", windowHeight*(31/200), windowHeight*(31/105) + 15);
  text("time of " + timeMin + ":" + timeSec + ".", windowHeight*(31/200), windowHeight*(331/1050) + 15);
  text("Friend and foe alike bow before your glorious", windowHeight*(31/200), windowHeight*(373/1050) + 15);
  text("banner for you have achieved what none other", windowHeight*(31/200), windowHeight*(197/525) + 15);
  text("ever will. Through this great victory, peace has", windowHeight*(31/200), windowHeight*(83/210) + 15);
  text("been achieved as none would dare to stand", windowHeight*(31/200), windowHeight*(218/525) + 15);
  text("against the great army of " + kingdomList[4].kingdomName + ".", windowHeight*(31/200), windowHeight*(457/1050) + 15);
  text("Through brutal conquest, you have changed the", windowHeight*(31/200), windowHeight*(499/1050) + 15);
  text("world forever.", windowHeight*(31/200), windowHeight*(52/105) + 15);
}

function loseScreen() {
  gameMusic.stop();
  
  //hiding and showing correct buttons
  for (i= 0; i < eventButtons.length; i++) {
    eventButtons[i].hide();
  }
  addBarracks.hide();
  addLargeCamp.hide();
  addCastle.hide();
  addFarmlands.hide();
  addWaterMills.hide();
  backToLoseScreen.hide();
  backToWinScreen.hide();
  addMine.hide();
  pause.hide();
  conquer.hide();
  undo.show();
  tips.show();
  seeLeaderboard.show();
  undo.position(windowHeight*(3/8) + seeLeaderboard.width/2 + 10, windowHeight*(3/4) - 40 - undo.height/2);
  
  tips.mousePressed(gameTips);
  seeLeaderboard.mousePressed(() => {
    if (easy) {
      displayLeaderboard("Easy", easyScores);
    } else if (medium) {
      displayLeaderboard("Medium", mediumScores);
    } else {
      displayLeaderboard("Hard", hardScores)
    }
  });
  
  //displaying background
  imageMode(CORNER);
  image(loseScreenImg, 0, 0, windowWidth, windowHeight);
  imageMode(CENTER);
  image(scrollImg, windowHeight*(3/8), windowHeight/2, windowHeight*(1/2), windowHeight*(3/4));
  
  //displaying the text for the lose screen
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(windowHeight/35);
  textStyle(BOLD);
  text("Game Over", windowHeight*(3/8), windowHeight*(49/180) + 10);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(windowHeight/50);
  text("Your Kingdom has fallen!", windowHeight*(31/200), windowHeight*(31/105) + 15);
  text("The land has been ravaged by your enemies.", windowHeight*(31/200), windowHeight*(176/525) + 15);
  text("Kingdoms that once feared you now celebrate", windowHeight*(31/200), windowHeight*(373/1050) + 15);
  text("your downfall, and the land you fought so hard to", windowHeight*(31/200), windowHeight*(197/525) + 15);
  text("protect is lost. The army has been crushed and", windowHeight*(31/200), windowHeight*(83/210) + 15);
  text("your once-proud banner will fade into the annals", windowHeight*(31/200), windowHeight*(218/525) + 15);
  text("of history, forgotten by all but those who", windowHeight*(31/200), windowHeight*(457/1050) + 15);
  text("witnessed your fall.", windowHeight*(31/200), windowHeight*(239/525) + 15);
}

function gameTips() {
  //hiding buttons
  tips.hide();
  seeLeaderboard.hide();
  undo.hide();
  
  buttonPress.play();
  
  //showing the correct button based on why the game ended
  if (kingdomList[4].kingdomPower <= 0) {
    backToLoseScreen.show();
    backToLoseScreen.mousePressed(() => {
      buttonPress.play();
      loseScreen();
    });
  } else if (kingdomList[4].kingdomPower >= 100) {
    backToWinScreen.show();
    backToWinScreen.mousePressed(() => {
      buttonPress.play();
      winScreen();
    });
  }
  
  background(64);
  imageMode(CENTER);
  image(gameTipsImg, windowWidth/2, windowHeight/2, windowWidth, windowWidth*(9/16));
}

function leaderboard(scores) {
  //inserts the value into the array as it doesn't have to be sorted
  if (scores.length == 0) {
    scores.push([kingdomList[4].kingdomName, time]);
  } else {
    scores.push([kingdomList[4].kingdomName, time]);
    
    //insertion sort
    let i = scores.length - 2;
    while (i >= 0 && easyScores[i][1] > time) {
      scores[i + 1] = scores[i];
      i--;
    }
    scores[i + 1] = [kingdomList[4].kingdomName, time];
  }
}

function displayLeaderboard(chosenDifficulty, scores) {
  //hiding buttons
  tips.hide();
  seeLeaderboard.hide();
  undo.hide();
  
  buttonPress.play();
  
  //showing the correct button based on why the game ended
  if (kingdomList[4].kingdomPower <= 0) {
    backToLoseScreen.show();
    backToLoseScreen.mousePressed(() => {
      buttonPress.play();
      loseScreen();
    });
  } else if (kingdomList[4].kingdomPower >= 100) {
    backToWinScreen.show();
    backToWinScreen.mousePressed(() => {
      buttonPress.play();
      winScreen();
    });
  }
  
  background(64);
  fill(255);
  textAlign(CENTER);
  textSize(windowWidth/25);
  textStyle(BOLD);
  text("Leaderboard", windowWidth*(1/2), windowHeight*(1/8));
  textStyle(NORMAL);
  textSize(windowWidth/40);
  text("(" + chosenDifficulty + " Difficulty)", windowWidth*(1/2), windowWidth*(1/40) + windowHeight*(1/8));
  
  //creating and displaying the table
  stroke(255);
  line(windowWidth*(1/3), windowWidth*(13/200) + windowHeight*(1/8), windowWidth*(1/3), windowWidth*(73/200) + windowHeight*(1/8));
  line(windowWidth*(2/3), windowWidth*(13/200) + windowHeight*(1/8), windowWidth*(2/3), windowWidth*(73/200) + windowHeight*(1/8));
  line(windowWidth*(31/120), windowWidth*(41/400) + windowHeight*(1/8), windowWidth*(89/120), windowWidth*(41/400) + windowHeight*(1/8));
  textSize(windowWidth/40);
  noStroke();
  text("Rank", windowWidth*(71/240), windowWidth*(9/100) + windowHeight*(1/8));
  textAlign(LEFT);
  text("Time", windowWidth*(269/400), windowWidth*(9/100) + windowHeight*(1/8));
  text("Kingdom Name", windowWidth*(407/1200), windowWidth*(9/100) + windowHeight*(1/8));
  textAlign(RIGHT);
  text("1", windowWidth*(131/400), windowWidth*(51/400) + windowHeight*(1/8));
  text("2", windowWidth*(131/400), windowWidth*(61/400) + windowHeight*(1/8));
  text("3", windowWidth*(131/400), windowWidth*(71/400) + windowHeight*(1/8));
  text("4", windowWidth*(131/400), windowWidth*(81/400) + windowHeight*(1/8));
  text("5", windowWidth*(131/400), windowWidth*(91/400) + windowHeight*(1/8));
  text("6", windowWidth*(131/400), windowWidth*(101/400) + windowHeight*(1/8));
  text("7", windowWidth*(131/400), windowWidth*(111/400) + windowHeight*(1/8));
  text("8", windowWidth*(131/400), windowWidth*(121/400) + windowHeight*(1/8));
  text("9", windowWidth*(131/400), windowWidth*(131/400) + windowHeight*(1/8));
  text("10", windowWidth*(131/400), windowWidth*(141/400) + windowHeight*(1/8));
  
  //making sure the leaderboard only displays the top 10 scores
  let i = 0;
  if (scores.length > 10) {
    end = 10;
  } else {
    end = scores.length;
  }
  
  //diplays contents of the table
  for (i; i < end; i++) {
    textAlign(LEFT);
    text(scores[i][0], windowWidth*(407/1200), windowWidth*(51/400 + i/40) + windowHeight*(1/8));
    timeMin = Math.floor(scores[i][1]/3600);
    if (timeMin < 10) {
      timeMin = "0" + timeMin
    }
    timeSec = Math.floor(scores[i][1]/60) - timeMin*60
    if (timeSec < 10) {
      timeSec = "0" + timeSec
    }
    text(timeMin + ":" + timeSec, windowWidth*(269/400), windowWidth*(51/400 + i/40) + windowHeight*(1/8));
  }
}