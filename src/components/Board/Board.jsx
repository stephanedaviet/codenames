import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Board.scss";

import Card from "../Card";

const Board = () => {
  const { cards } = useSelector((state) => state.board);

  return (
    <div className="board">
      {cards?.map((card) => (
        <Card
          key={card.word}
          index={card.index}
          word={card.word}
          role={card.role}
          flipped={card.flipped}
        />
      ))}
    </div>
  );
};

export default Board;
