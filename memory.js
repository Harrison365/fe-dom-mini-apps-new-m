let colorArray = [
  "yellow",
  "green",
  "#9EA3F5",
  "orange",
  "blue",
  "red",
  "yellow",
  "green",
  "#9EA3F5",
  "orange",
  "blue",
  "red",
];
let shuffledArray = colorArray.sort(() => Math.random() - 0.5);

let pairs = {
  yellow: [],
  green: [],
  "#9EA3F5": [],
  orange: [],
  blue: [],
  red: [],
};

shuffledArray.forEach((color, index) => {
  pairs[color].push(index);
});
console.log(pairs);
console.log(shuffledArray);
let count = 0;
let firstId = "";
let secondId = "";
let solvedSquares = [];
let livesLeft = 5;
let pairFound = false;
let clickable = true;

const card = document.getElementsByClassName("card");
const cards = [...card];
const score = document.getElementById("score");

cards.forEach((square) => {
  square.addEventListener("click", (event) => {
    if (clickable) {
      square.style.backgroundColor =
        shuffledArray[event.target.attributes[0].nodeValue];
    }
  });

  square.addEventListener("click", (event) => {
    if (clickable) {
      pairFound = false;
      if (count === 0) {
        firstId = event.target.attributes[0].nodeValue;
        count++;
      } else if (count === 1) {
        secondId = event.target.attributes[0].nodeValue;

        Object.keys(pairs).forEach((color) => {
          if (
            pairs[color].includes(+firstId) &&
            pairs[color].includes(+secondId)
          ) {
            pairFound = true;
          }
        });
        if (pairFound) {
          count = 0;
          solvedSquares.push(firstId, secondId);
          if (solvedSquares.length === 12) {
            const tag = document.createElement("p");
            const contents = document.createTextNode("You Win!!!");
            tag.appendChild(contents);
            const element = document.getElementById("score");
            element.appendChild(tag);
          }
          const tag = document.createElement("p");
          const contents = document.createTextNode("Well Done!!!");
          tag.appendChild(contents);
          const element = document.getElementById("score");
          element.appendChild(tag);
          setTimeout(() => {
            element.removeChild(tag);
          }, 1000);
        } else {
          clickable = false;
          count = 0;
          livesLeft--;
          score.innerText = `Remaining Lives: ${livesLeft}`;
          if (livesLeft > 0) {
            const tag = document.createElement("p");
            const contents = document.createTextNode("You suck!!!");
            tag.appendChild(contents);
            const element = document.getElementById("score");
            element.appendChild(tag);
            setTimeout(() => {
              element.removeChild(tag);
            }, 1000);
            setTimeout(() => {
              cards.forEach((square) => {
                let squareId = square.attributes[0].nodeValue;
                if (!solvedSquares.includes(squareId)) {
                  square.style.backgroundColor = "grey";
                }
              });
              clickable = true;
            }, 1000);
          } else {
            const tag = document.createElement("p");
            const contents = document.createTextNode(
              "Out of Lives. Please try again."
            );
            tag.appendChild(contents);
            const element = document.getElementById("score");
            element.appendChild(tag);
          }
        }
      }
    }
  });
});
