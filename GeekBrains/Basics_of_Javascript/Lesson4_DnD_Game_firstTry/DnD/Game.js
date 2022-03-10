"use strict";

import * as CONSTANTS from "./modules/Constants.mjs";
import * as Handlers from "./modules/Handlers.mjs";

const stateOfGame = {
  player: {
    power: 10,
    position: {
      x: 0,
      y: 0,
    },
  },
};
const logHandler = new Handlers.LogHandler();

const movementsOfPlayer = new Handlers.MovementsOfPlayerHandler(stateOfGame.player.position, logHandler);

const validateStateOfGame = (stateOfGame) => {
  // TODO: проверить всё ли игровое поле корректное
  // TODO: проверить все ли строки одинаковые
};

while (true) {
  const availableMovements = Handlers.getAvailableMovements(stateOfGame.player.position);
  const stringMovementOfPlayer = prompt(Handlers.getMessageForMovement(availableMovements, stateOfGame.player.position));
    if (availableMovements.indexOf(stringMovementOfPlayer) === -1) {
        const logReading = parseInt(stringMovementOfPlayer);
        if (!isNaN(logReading)) {
            console.log(`readed log: ${logHandler.readLog(logReading)}`);
            continue;
         }
    // некорректный ввод
    alert("Некорректный ввод, попробуйте еще раз");

    //TODO: вернуть continue после отладки
    break;
    //continue;
  }

  movementsOfPlayer[stringMovementOfPlayer]();

  // проверка на монстра
  const gameCell = CONSTANTS.GAME_FIELD[stateOfGame.player.position.y][stateOfGame.player.position.x];
  if (gameCell === null) {
    continue;
  }

    const monster = CONSTANTS.MONSTERS[gameCell];
    
    logHandler.logFight(
        stateOfGame.player.position,
        monster.name,
        stateOfGame.player.power,
        monster.power
    );
  // сражение с монстром
  let messageOfBattle = `Вы встретили монстра ${gameCell}\n`;
  if (stateOfGame.player.power >= monster.power) {
    stateOfGame.player.power += monster.power;
    messageOfBattle += "Вы выиграли\n";
      messageOfBattle += `Ваша сила теперь ${stateOfGame.player.power}`;
      
    alert(messageOfBattle);
  } else {
    messageOfBattle += "Вы проиграли\n";
    messageOfBattle += "Конец игры";
    alert(messageOfBattle);
  }
}
