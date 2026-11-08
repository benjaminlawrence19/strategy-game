/*
Created by: Ben Lawrence
Last updated: 17/08/2024
This code defines the Kingdom class
The Kingdom object contains attributes kingdomName, kingdomColour and kingdomPower. Set methods are used to change the value stored in the attributes.
*/

class Kingdom {
  constructor(name, colour, power) {
    this.kingdomName = name;
    this.kingdomColour = colour;
    this.kingdomPower = power;
  }

  setName(newName) {
    this.kingdomName = newName;
  }

  setColor(newColor) {
    this.kingdomColour = newColor;
  }
  
  setPower(newPower) {
    this.kingdomPower = newPower;
  }
}