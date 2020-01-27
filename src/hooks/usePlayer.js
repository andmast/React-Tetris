import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const rotate = (matrix, dir) => {
    // Rows become coloumns (transpose)
    const rotateTetromino = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );
    // Reverse each row to get roated matrix
    if (dir > 0) {
      return rotateTetromino.map(row => row.reverse());
    }
    return rotateTetromino.reverse();
  };

  const playerRotate = (stage, dir) => {
    // Deep clone to avoid mutating data
    const clonedPlayer = JSON.parse(JSON.stringify(player));

    const pos = clonedPlayer.pos.x;
    let offSet = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offSet;
      offSet = -(offSet + (offSet > 0 ? 1 : -1));
      if (offSet > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
