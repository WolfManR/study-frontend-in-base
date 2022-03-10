import { GAME_FIELD_SIZE, MOVEMENTS_OF_PLAYER } from "./Constants.mjs";

class Log {
  toString() {}
}

class FightLog extends Log {
  constructor(positionLog, enemyName, playerPower, enemyPower) {
    super();
    this.positionLog = positionLog;
    this.enemyName = enemyName;
    this.playerPower = playerPower;
    this.enemyPower = enemyPower;
    this.isPlayerWin = playerPower - enemyPower > 0;
    return this;
  }

  toString() {
    const winMessage = `Player ${this.isPlayerWin ? "Win" : "Lose"}`;
    return `fight at position ${this.positionLog.toString()} with ${this.enemyName},\
 player power: ${this.playerPower}, enemy power: ${this.enemyPower}, ${winMessage}`;
  }
}

class PositionLog extends Log {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    return this;
  }

  toString() {
    return `(x:${this.y}, y:${this.x})`;
  }
}

class MovementLog extends Log {
  constructor(previousPosition, nextPosition) {
    super();
    this.previousPosition = previousPosition;
    this.nextPosition = nextPosition;

    return this;
  }

  toString() {
    return `prev: ${this.previousPosition.toString()} next: ${this.nextPosition.toString()})`;
  }
}

class LogHandler {
  constructor() {
    this.log = [];
  }

  logMovement(previousPosition, nextPosition) {
    const movementLog = new MovementLog(previousPosition, nextPosition);
    this.log.push(movementLog);
    console.log(movementLog.toString());
  }

  logFight(position, enemy, playerPower, enemyPower) {
    const fightLog = new FightLog(new PositionLog(position.x, position.y), enemy, playerPower, enemyPower);
    this.log.push(fightLog);
    console.log(fightLog.toString());
  }

  readLog(step) {
    return this.log[step].toString();
  }
}

class MovementsOfPlayerHandler {
  constructor(position, logHandler) {
    this.playerPosition = position;
    this.logHandler = logHandler;
  }

  up() {
    const prev = new PositionLog(this.playerPosition.x, this.playerPosition.y);
    const next = new PositionLog(this.playerPosition.x, this.playerPosition.y - 1);
    this.logHandler.logMovement(prev, next);
    this.playerPosition.y -= 1;
  }

  down() {
    const prev = new PositionLog(this.playerPosition.x, this.playerPosition.y);
    const next = new PositionLog(this.playerPosition.x, this.playerPosition.y + 1);
    this.logHandler.logMovement(prev, next);
    this.playerPosition.y += 1;
  }

  right() {
    const prev = new PositionLog(this.playerPosition.x, this.playerPosition.y);
    const next = new PositionLog(this.playerPosition.x + 1, this.playerPosition.y);
    this.logHandler.logMovement(prev, next);
    this.playerPosition.x += 1;
  }

  left() {
    const prev = new PositionLog(this.playerPosition.x, this.playerPosition.y);
    const next = new PositionLog(this.playerPosition.x - 1, this.playerPosition.y);
    this.logHandler.logMovement(prev, next);
    this.playerPosition.x -= 1;
  }
}

const getAvailableMovements = (playerPosition) => {
  const availableMovements = [];

  if (playerPosition.y >= 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.up);
  }

  if (playerPosition.y < GAME_FIELD_SIZE.HEIGHT - 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.down);
  }

  if (playerPosition.x >= 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.left);
  }

  if (playerPosition.x < GAME_FIELD_SIZE.WIDTH - 1) {
    availableMovements.push(MOVEMENTS_OF_PLAYER.right);
  }

  return availableMovements;
};

const getMessageForMovement = (availableMovements, playerPosition) => {
  const movementString = `Введите направление движения(${availableMovements.join(", ")}): `;
  const currentCoordinatesString = `Текущие координаты x: ${playerPosition.x} y: ${playerPosition.y}`;

  return `${currentCoordinatesString}\n${movementString} или желаете прочитать лог по номеру шага?`;
};

export { MovementsOfPlayerHandler, getAvailableMovements, getMessageForMovement, LogHandler };
