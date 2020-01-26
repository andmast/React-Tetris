import React from "react";

// Styles
import { StyledCell } from "./styles/StyledCell";

import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    cell
  </StyledCell>
);

export default Cell;
