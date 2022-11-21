let colorArray = ["yellow", "green", "#9EA3F5", "orange", "blue", "red"];
let shuffledArray;

let pairs = [
  ["1", "7"],
  ["2", "8"],
  ["3", "9"],
  ["4", "10"],
  ["5", "11"],
  ["6", "12"],
];

let colors = {
  1: "yellow",
  2: "green",
  3: "#9EA3F5",
  4: "orange",
  5: "blue",
  6: "red",
  7: "yellow",
  8: "green",
  9: "#9EA3F5",
  10: "orange",
  11: "blue",
  12: "red",
};

let count = 0;
let firstColor = "";
let secondColor = "";
let solvedSquares = [];
let livesUsed = 0;
let pairFound = false;

const card = document.getElementsByClassName("card");
const cards = [...card];
const score = document.getElementById("score");

cards.forEach((square) => {
  square.addEventListener("click", (event) => {
    cardId = event.target.attributes[0].nodeValue;
    square.style.backgroundColor = colors[cardId];
  });
  square.addEventListener("click", (event) => {
    if (count === 0) {
      cardId = event.target.attributes[0].nodeValue;
      firstColor = cardId;
      console.log(firstColor);
      count++;
    } else if (count === 1) {
      cardId = event.target.attributes[0].nodeValue;
      secondColor = cardId;
      console.log(secondColor);
      console.log(firstColor, secondColor);
      pairs.forEach((pair) => {
        if (pair.includes(firstColor) && pair.includes(secondColor)) {
          pairFound = true;
          console.log(true);
        }
      });
      if (pairFound) {
        count = 0;
        solvedSquares.push(firstColor, secondColor);
        console.log(solvedSquares);
        pairFound = false;
      } else {
        count = 0;
        livesUsed++;
        score.innerText = `Score = ${livesUsed}`;
        setTimeout(() => {
          cards.forEach((square) => {
            let squareId = square.attributes[0].nodeValue;
            if (!solvedSquares.includes(squareId)) {
              square.style.backgroundColor = "grey";
            }
          });
        }, 2000);
      }
    }
  });
});
