import React from "react";

// Components
import Cell from "./Cell";

// Styles
import { StyledStage } from "./styles/StyledStage";

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
