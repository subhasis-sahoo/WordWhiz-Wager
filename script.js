// A Dectionary with differnt words.
let wordDictionary = [
    "Apple",
    "Ant",
    "Airplane",
    "Banana",
    "Bear",
    "Ball",
    "Cat",
    "Carrot",
    "Castle",
    "Dinosaur",
    "Dolphin",
    "Doctor",
    "Elephant",
    "Eagle",
    "Earth",
    "Fish",
    "Fox",
    "Flower",
    "Giraffe",
    "Guitar",
    "Globe",
    "House",
    "Hat",
    "Heart",
    "Ice Cream",
    "Island",
    "Insect",
    "Jellyfish",
    "Jet",
    "Jacket",
    "Kite",
    "Kangaroo",
    "King",
    "Lion",
    "Lamp",
    "Leaf",
    "Monkey",
    "Moon",
    "Milk",
    "Nest",
    "Net",
    "Notebook",
    "Octopus",
    "Orange",
    "Owl",
    "Penguin",
    "Piano",
    "Pirate",
    "Quack",
    "Queen",
    "Question",
    "Rainbow",
    "Robot",
    "Rocket",
    "Sun",
    "Star",
    "Ship",
    "Tiger",
    "Train",
    "Tree",
    "Umbrella",
    "Unicorn",
    "Uniform",
    "Vegetable",
    "Van",
    "Volcano",
    "Watermelon",
    "Whale",
    "Wizard",
    "Xylophone",
    "X-ray",
    "Xmas",
    "Yacht",
    "Yellow",
    "Yak",
    "Zebra",
    "Zoo",
    "Zipper",
  ];

// References
let mainDiv = document.querySelector(".mainBox");
let chancesCountDiv = document.getElementById("chancesCount");
let hintsCountDiv = document.getElementById("hintsCount");
let puzzeledWordDiv = document.getElementById("puzzeledWord");
let message = document.getElementById("msg");
let inputEle = document.getElementById("inputField");
let submitButton = document.getElementById("btn");

// Initial values
let word = "START";
let wordWithSpace = "S T A R T";
let puzzeledWord = "S _ _ R _";
let newPuzzeledWord = "";
let chancesCount = 5;
let hintsCount = 2
let isCorrect = false;


// Functions definations

// generate puzzeled word
const generatePuzzeledWord = () => {
  puzzeledWord = "";
  let flag;
  let countDash;

  // Here word with space is generated
  wordWithSpace = "";
  for(let i = 0; i < word.length; i++){
    wordWithSpace += word[i] + " ";
  }
  console.log("wordWithSpace:", wordWithSpace);

  // Here the dash words are generated
  for (let i = 0; i < word.length; i++) {
    countDash = 0;
    flag = Math.floor(Math.random() * 2);
    if (flag === 0) {
      puzzeledWord = puzzeledWord + "_" + " ";
      countDash++;
    } else {
      puzzeledWord = puzzeledWord + word[i] + " ";
    }
  }

  // Here the verification part of the word is done wheather the dashed word properly generated or not
  if (word.length < 4 && countDash > 2) {
    generatePuzzeledWord(word);
  } else if (word.length > 4 && word.length < 7 && countDash > 3) {
    generatePuzzeledWord(word);
  } else if (word.length >= 7 && countDash > 4) {
    generatePuzzeledWord(word);
  }
  // console.log("puzzeledWord:", puzzeledWord);
  return puzzeledWord;
};

// guessCorrectMsg()
const guessCorrectMsg = () => {
  console.log("correct");
  message.innerText = `Hurry! you guessed the right word. | Type "NEXT" to play further or "EXIT" to stop the game.`;
  message.style.color = "#007d01";
  inputEle.value = "";
}; 

// guessIncorrectMsg()
const guessIncorrectMsg = () => {
  if(hintsCount > 0){
    message.innerText = `Oops! you guessed incorrect word. | Type "HINT" to use your ${hintsCount} hints.`;
  }
  else{
    message.innerText = `Oops! you guessed incorrect word.`;
  }
  message.style.color = "#ff1616";
  inputEle.value = "";
  chancesCountDiv.innerText = `Chances Left: ${chancesCount}`;
};

// generateRandomIndex(word.length) function takes length of the word
let generateRandomIndex = () => {
  let index = Math.floor(Math.random() * puzzeledWord.length);
  // console.log(index);
  if (puzzeledWord[index] != "_") {
    index = generateRandomIndex();
  }
  // console.log(word[index]);
  return index;
};

// useHint()
const useHint = () => {
  if(hintsCount > 0){
    hintsCount--;
    inputEle.value = "";
    hintsCountDiv.innerText = `Hints Left: ${hintsCount}`;
    message.innerText = `Now you will guess the right word.`;
    message.style.color = "#007d01";
    let hintIndex = generateRandomIndex();
    let firstPart = puzzeledWord.substring(0, hintIndex);
    let lastPart = puzzeledWord.substring(hintIndex + 1);
    puzzeledWord = firstPart + wordWithSpace[hintIndex] + lastPart;
    puzzeledWordDiv.innerText = `${puzzeledWord}`;
  }
  else{
    inputEle.value = "";
    message.innerText = `Sorry! you are already use your all "Hints".`
    message.style.color = "#ff1616";
  }
};

// playAgain()
const playAgain = () => {
  if(chancesCount === 0 || isCorrect === true){
    message.innerText = `Here is your new word, now guess it correctly.`;
    message.style.color = "#007d01";
    inputEle.value = "";
    word = wordDictionary[Math.floor(Math.random()*78)].toUpperCase();
    console.log("word:", word);
    puzzeledWord = generatePuzzeledWord();
    console.log("puzzeledWord:", puzzeledWord);
    puzzeledWordDiv.innerText = `${puzzeledWord}`;
    chancesCountDiv.innerText = `Chances Left: 5`;
    hintsCountDiv.innerText = `Hints Left: 2`;
    chancesCount = 5;
    hintsCount = 2;
  }
  else{
    message.innerText = `Sorry! you can't move further utill you guess the word correctly or your chance is equal to 0.`;
    message.style.color = "#ff1616";
  }
};

// exitGame()
const exitGame = () => {
  message.innerText = `Hope you enjoyed while playing this game.`;
  message.style.color = "#007d01";
  inputEle.style.display = "none";
  submitButton.style.display = "none";
  let exitDiv = document.createElement("div");
  exitDiv.innerText = "Thanks! for playing.";
  mainDiv.append(exitDiv);
  exitDiv.classList.add("exitMsg");
};


const handelSubmitButton = () => {

    if(chancesCount === 0){
        message.innerText = `Oops! you lose all your chances. | Type "NEXT" play further or "EXIT" to stop the game..`
        message.style.color = "#ff1616";
        puzzeledWordDiv.innerText = `${wordWithSpace}`
        if(inputEle.value.toUpperCase() === "NEXT"){
          playAgain();
        }
        else if(inputEle.value.toUpperCase() === "EXIT"){
          exitGame();
        }
        inputEle.value = "";
    }
    else{
        if(inputEle.value.toUpperCase() === word.toUpperCase()){
          chancesCount--;
          isCorrect = true;
          chancesCountDiv.innerText = `Chances Left: ${chancesCount}`
          guessCorrectMsg();
          puzzeledWordDiv.innerText = `${wordWithSpace}`;
        }
        else if(inputEle.value.toUpperCase() === "HINT"){
          useHint();
        }
        else if(inputEle.value.toUpperCase() === "NEXT"){
          playAgain();
        }
        else if(inputEle.value.toUpperCase() === "EXIT"){
          exitGame();
        }
        else{
          chancesCount--;
          guessIncorrectMsg();
        }
    }
    
};


submitButton.addEventListener("click", () => {
    handelSubmitButton();
});