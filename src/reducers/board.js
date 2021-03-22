import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import StegCloak from "stegcloak";

import wordList from "../words.json";

const computeWords = createAsyncThunk("board/compute-words", () => {
  const futureWords = new Promise((resolve, reject) => {
    const boardWords = [];

    for (let i = 0; i < 25; i++) {
      console.debug(wordList.length + " still availables");
      const index = Math.ceil(Math.random() * (wordList.length - 1));
      const word = wordList.splice(index, 1)[0];
      console.debug("Peeking word " + word + " at index " + index);
      boardWords.push(word);
    }

    resolve(boardWords);
  });

  return futureWords;
});

const computeCards = createAsyncThunk("board/compute-cards", (words) => {
  console.debug("words for cards", words);

  const addWordForRole = (wordStack, board, role, count = 1) => {
    for (let i = 0; i < count; i++) {
      const roleIndex = Math.ceil(Math.random() * (wordStack.length - 1));
      const word = wordStack.splice(roleIndex, 1)[0];
      const wordIndex = words.indexOf(word);
      board.push({
        index: wordIndex,
        word: word,
        role: role,
        flipped: false,
      });
    }
  };

  const board = [];

  const wordsStack = [...words];

  addWordForRole(wordsStack, board, "F");
  addWordForRole(wordsStack, board, "A", 9);
  addWordForRole(wordsStack, board, "B", 8);
  addWordForRole(wordsStack, board, "N", 7);

  const futureBoard = Promise.all(
    board.map((card) => {
      return new Promise((resolve, reject) => {
        console.debug("Initialising worker for card", card);

        const worker = new Worker(
          new URL("cardCompute.worker.js", import.meta.url)
        );
        worker.postMessage(card);
        worker.onmessage = ({ data: computedCard }) => {
          worker.terminate();
          delete computedCard.role;
          resolve(computedCard);
        };
      }).then((card) => ({
        ...card,
        coordinates: decodeURIComponent(card.coordinates),
      }));
    })
  ).then((cards) => cards.sort((a, b) => a.index - b.index));

  return futureBoard;
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    words: [],
    cards: [],
  },
  reducers: {
    flip(state, { payload: index }) {
      const card = state.cards[index];
      if (card.flipped) {
        return;
      }
      const stegcloak = new StegCloak(true, false);
      const role = stegcloak.reveal(card.coordinates, card.word);

      card.role = role;
      card.flipped = true;
    },
  },
  extraReducers: {
    [computeWords.pending]: (state, action) => {
      state.status = "loading";
    },
    [computeWords.fulfilled]: (state, { payload: words }) => {
      state.status = "succeeded";
      state.words = words;
    },
    [computeWords.rejected]: (state, { error: { message } }) => {
      state.status = "failed";
      state.error = message;
    },
    [computeCards.pending]: (state, action) => {
      state.status = "loading";
    },
    [computeCards.fulfilled]: (state, { payload: cards }) => {
      state.status = "succeeded";
      state.cards = cards;
    },
    [computeCards.rejected]: (state, { error: { message } }) => {
      state.status = "failed";
      state.error = message;
    },
  },
});

export { computeWords, computeCards };
export const { flip } = boardSlice.actions;

export default boardSlice.reducer;
