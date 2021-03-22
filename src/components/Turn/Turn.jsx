import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import "./Turn.scss";

import { nextTurn } from "../../reducers/turn";

const Turn = () => {
  const turn = useSelector((state) => state.turn);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => dispatch(nextTurn(data));

  const stageBasedContent = {
    hint: (
      <form className="turn hint" onSubmit={handleSubmit(onSubmit)}>
        <span className={"team " + turn.team}>Équipe {turn.team}</span>
        <span className="hintInput">
          <input
            name="hint"
            type="text"
            placeholder="indice"
            disabled={turn == "blueHint" || turn == "redHint"}
            ref={register({ required: true })}
          />
          <label htmlFor="number"> pour </label>
          <input
            name="number"
            type="number"
            min="1"
            max="25"
            defaultValue="2"
            disabled={turn == "blueHint" || turn == "redHint"}
            ref={register}
          />
          <label htmlFor="number"> mots. </label>
        </span>
        <input
          className="validate"
          type="submit"
          value="Transmettre l'indice"
        />
      </form>
    ),
    guess: (
      <div className="turn guess">
        <span className={"team " + turn.team}>Équipe {turn.team}</span>
        <input
          className="validate"
          type="button"
          value="Terminer le tour"
          onClick={() => dispatch(nextTurn())}
        />
      </div>
    ),
  };

  return stageBasedContent[turn.stage];
};

export default Turn;
