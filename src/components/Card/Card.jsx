import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { flip } from "../../reducers/board";

import "./Card.scss";

const Card = ({ index, word, role, flipped }) => {
  const turn = useSelector((state) => state.turn);
  const dispatch = useDispatch();

  return (
    <div
      className={"card " + (flipped ? "flipped" : "")}
      onClick={() => dispatch(flip(index))}
    >
      <div className="front">{word}</div>
      <div className={"back " + (role ? role : "neutral")}></div>
    </div>
  );
};

export default Card;
