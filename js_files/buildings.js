/*
Created by: Ben Lawrence
Last updated: 25/09/2024
This code defines the Building class
The Building object contains attributes buildingName, buildingCost, buildingPowerIncrease and buildingGoldIncrease.
*/

class Building {
  constructor(name, cost, powerIncrease, goldIncrease) {
    this.buildingName = name;
    this.buildingCost = cost;
    this.buildingAmount = 0;
    this.buildingPowerIncrease = powerIncrease;
    this.buildingGoldIncrease = goldIncrease;
  }
  
  setBuildingAmount(newBuildingAmount) {
    this.buildingAmount = newBuildingAmount;
  }
}