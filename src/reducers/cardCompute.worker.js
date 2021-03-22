import StegCloak from "stegcloak";

self.onmessage = ({ data: card }) => {
  console.debug("Web worker card computing", card);
  const stegcloak = new StegCloak(true, false);
  card.coordinates = stegcloak.hide(
    card.role,
    card.word,
    "{" +
      " col: " +
      ((card.index % 5) + 1) +
      "," +
      " row: " +
      Math.ceil((card.index + 1) / 5) +
      " }"
  );
  self.postMessage(card);
};
