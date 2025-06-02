

const wordsList = {
  carro: ["Motor", "Porta", "Capô", "Pneu", "Antena"],
  fruta: ["Banana", "Maçã", "Pêra", "Mamão", "Laranja"],
  corpo: ["Braço", "Perna", "Cérebro", "Pescoço", "Olhos"],
  computador: ["Mouse", "Teclado", "Monitor", "Gabinete"],
  programação: ["Linguagem", "Framework", "JavaScript", "React"],
  alimento: ["Arroz", "Feijão", "Carne", "Leite", "Ovo"],
};


let getSpaceLetters = document.querySelector('.letter-card ');
let wordDisplay = document.querySelector('.word-display');
const buttonGame = document.querySelector('.play-button');
const msgGameStatus = document.querySelector('.game-status');
const errors = document.querySelector('.wrong-letters');

// 1 Guardamos as chaves do array (carro, fruta...)
// const wordArrayKeys = Object.keys(wordsList); 


const getWordSorted = (word, category) => { 
  console.log(word);
  let buildRightLetters = [];
  let lettersWrong = [];
  let tip = document.querySelector('.dica');
  let strong = document.createElement('strong');
  tip.appendChild(strong);
  strong.innerText = `${category.toUpperCase()}`;
  let testTrue = true;
  let points = 0;

  buttonGame.addEventListener('click', (e) => {
    e.preventDefault();
    let getInputLetter = document.querySelector('.guess-input').value;
    let foundString = word.includes(getInputLetter); // Se o array (word)  tem a palavra digitada

    // getInputLetter.focus(); // manter o foco no botão depois que confirmar a letra

    if(foundString) {
      word.forEach((letter, i) => {
        let spanRightLetter = document.querySelectorAll('.front'); // como são varios span.front tem que ser querySelectorAll
        
        if(letter === getInputLetter) {
          buildRightLetters[i] = getInputLetter;
          spanRightLetter[i].innerText = getInputLetter;
          
          const checkIfArrayIsFull = word.every((letra, i) => buildRightLetters[i] === letra);
          if(checkIfArrayIsFull) {
            msgGameStatus.innerText = 'Parabéns você acertou a palavra.';



            // MEXENDO AQUI
            newFunction(wordsList);

          }
        }
      });
    } else {
      lettersWrong.push(getInputLetter);
      console.log(lettersWrong);
      errors.innerText = lettersWrong;

      if(lettersWrong.length === 3) {
        msgGameStatus.innerText = 'Você errou 3 letras. Boa sorte da próxima vez.';
      }  
    }
    
  });
}

const buildTagsElements = (place, tagElement, className) => {
  let wordDisplay = document.querySelector(place);
  let element = document.createElement(tagElement); 
  // let splitLetters = document.createTextNode(letter);

  console.log(wordDisplay)

  // adiciona uma elemento em um determinado lugar
  wordDisplay.appendChild(element);

  // Adiciona a classe letter-card na div criada anteriormente
  element.classList.add(className);

  // wordDisplay.appendChild(splitLetters);

}
buildTagsElements('.word-display', 'div', 'letter-card-function');
buildTagsElements('.letter-card-function', 'span', 'front-function');
buildTagsElements('.letter-card-function', 'span', 'back-function');
// buildTagsElements(letter = 'default', '.back-function', 'span', 'back-function');


const newFunction = (wordsList) => {
  let wordArrayKeys = Object.keys(wordsList);
  let categoryKey = getRandomArrayElement(wordArrayKeys);
  // console.log(wordArrayKeys);
  // console.log(categoryKey);

  let uai = getRandomArrayElement(wordsList[categoryKey]);
  let splitIndice = uai.split('');
  let getSplitWord = [];

  // console.log(uai);



  splitIndice.forEach((key, i) => {
    let divLetterCard = document.createElement("div"); 
    let newSpanBack = document.createElement("span");
    let newSpanFront = document.createElement("span");
    let splitLetters = document.createTextNode(key);


    // adiciona uma div dentro da div.word-display
    wordDisplay.appendChild(divLetterCard);

    // Adiciona a classe letter-card na div criada anteriormente
    divLetterCard.classList.add('letter-card');

    // Insere um span na div.letter-card
    divLetterCard.appendChild(newSpanFront);
    divLetterCard.appendChild(newSpanBack);

    // Adiciona a classe front em um span e back no outro spam
    newSpanFront.classList.add("front");
    newSpanBack.classList.add("back");

    // Adiciona as letras separadas dentro de cada span.back
    newSpanBack.appendChild(splitLetters);
    

    // Reatribuindo a variável getSplitWord
    getSplitWord = [...splitIndice];

    console.log(getSplitWord);

    
  });

  getWordSorted(getSplitWord, categoryKey);

}
newFunction(wordsList);





// Função que pega um elemento aleatório de um array
function getRandomArrayElement(array) {
  if (array.length === 0) {
    return undefined; // Retorna undefined para um array vazio
  }
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}



