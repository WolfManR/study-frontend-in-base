const GAME_FIELD = [
  [null, null, "goblin", null, null, null, null, "troll", null, null],
  ["goblin", null, null, "troll", null, "cyclops", null, null, "goblin", null],
  [null, null, "troll", null, "goblin", null, "goblin", null, null, "cyclops"],
  ["goblin", null, "goblin", null, null, "cyclops", null, null, "goblin", null],
  [null, null, null, null, "goblin", null, "cyclops", "troll", null, "troll"],
  ["troll", "goblin", "cyclops", "goblin", null, null, "goblin", null, "cyclops", null],
  [null, null, null, null, null, "cyclops", null, null, null, null],
  [null, "cyclops", null, "goblin", "cyclops", null, null, "goblin", null, "troll"],
  ["troll", null, "goblin", null, "goblin", "troll", null, null, null, null],
  [null, "goblin", null, null, null, null, "troll", "goblin", null, "dragon"],
];

const MONSTERS = {
  goblin: {
    name: "goblin",
    power: 10,
  },
  troll: {
    name: "troll",
    power: 20,
  },
  cyclops: {
    name: "cyclops",
    power: 50,
  },
  dragon: {
    name: "dragon",
    power: 100,
  },
};

const GAME_FIELD_SIZE = {
  WIDTH: GAME_FIELD[0].length,
  HEIGHT: GAME_FIELD.length,
};

const MOVEMENTS_OF_PLAYER = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};

export { GAME_FIELD, MONSTERS, GAME_FIELD_SIZE, MOVEMENTS_OF_PLAYER };