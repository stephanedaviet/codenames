import React, { useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Game from "./components/Game";
import configureStore from "./configureStore";

import { generateKey } from "./reducers/board";

console.info("Initialising application");

const store = configureStore();

const renderApp = () =>
  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./components/Game/Game.jsx", renderApp);
}

renderApp();
