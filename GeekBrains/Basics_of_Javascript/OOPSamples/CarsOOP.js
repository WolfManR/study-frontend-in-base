const kiaCar = {
  id: "123",
  color: "grey",
  odometr: 10_000,
  speed: 0,
  leftFrontDoor: {},
  rightFrontDoor: {},
  subscribersOfTechnicalRepair: [],

  move: function (distance) {
    this.odometr += distance;

    if (this.odometr >= 100_000) {
      for (const subscriber of this.subscribersOfTechnicalRepair) {
        subscriber(this.id);
      }
    }
  },

  subscribeTechnicalRepair: function (functionToCall) {
    this.subscribersOfTechnicalRepair.push(functionToCall);
  },
};

const callTechnicalRepair = (id) => {
  console.log(`Repair of car with id ${id}`);
};
const callColorRepair = (id) => {
  console.log(`Change color of car with id ${id}`);
};

kiaCar.subscribeTechnicalRepair(callTechnicalRepair);
kiaCar.subscribeTechnicalRepair(callColorRepair);
kiaCar.move(100000);
