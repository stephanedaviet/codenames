import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./Game.scss";

import { computeCards, computeWords } from "../../reducers/board";

import Turn from "../Turn/Turn";
import Chat from "../Chat/Chat";
import Board from "../Board/Board";

const Game = () => {
  const { words } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  useEffect(() => dispatch(computeWords()), [dispatch]);

  useEffect(
    () => (words && words.length ? dispatch(computeCards(words)) : undefined),
    [dispatch, words]
  );

  return (
    <div className="game">
      <Chat />
      <Turn />
      <Chat />
      <Board />
    </div>
  );
};

export default Game;
