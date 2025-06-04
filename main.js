

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
let getInputLetter = document.querySelector('.guess-input');
let tip = document.querySelector('.dica');
let strong = document.createElement('strong');
let buildRightLetters = []; 
let getSplitWord = []; // array pra pegar a palavra sorteada, com cada letra em um índice
let lettersWrong = []; // array para pegar letras erradas (inicia vazio)


const buttonGame = document.querySelector('.play-button');
const msgGameStatus = document.querySelector('.game-status');
const errors = document.querySelector('.wrong-letters');


// 1 Guardamos as chaves do array (carro, fruta...)


const buildTagsElements = (parent, tagElement, className, text = null) => {
  let element = document.createElement(tagElement); 
  element.classList.add(className);

  if (text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }
  
  parent.appendChild(element);
  return element;

};


const newFunction = (wordsList) => {
  let wordArrayKeys = Object.keys(wordsList);
  let categoryKey = getRandomArrayElement(wordArrayKeys);

  let sortedWord = getRandomArrayElement(wordsList[categoryKey]);
  let splitIndice = sortedWord.split('');
  tip.appendChild(strong);
  strong.innerText = categoryKey.toUpperCase();

  // Reatribuindo a variável getSplitWord
  getSplitWord = [...splitIndice];
  buildRightLetters = Array(splitIndice.length).fill('');
  wordDisplay.replaceChildren();

  splitIndice.forEach((key, i) => {
    let divLetterCard = document.createElement("div"); 
    wordDisplay.appendChild(divLetterCard);

    // Adiciona a classe letter-card na div criada anteriormente
    divLetterCard.classList.add('letter-card');

    buildTagsElements(divLetterCard, 'span', 'front');
    buildTagsElements(divLetterCard, 'span', 'back', key);
  });
}



// Função que pega um elemento aleatório de um array
function getRandomArrayElement(array) {
  if (array.length === 0) {
    return undefined; // Retorna undefined para um array vazio
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}


buttonGame.addEventListener('click', (e) => {
  e.preventDefault();
  
  let valueInput = getInputLetter.value.trim();
  let foundString = getSplitWord.includes(valueInput);
  getInputLetter.focus(); // manter o foco no botão depois que confirmar a letra

  if(foundString) {
    let spanRightLetter = document.querySelectorAll('.front'); // como são varios span.front tem que ser querySelectorAll

    getSplitWord.forEach((letter, i) => {
      if(letter === valueInput) {
        buildRightLetters[i] = valueInput;
        spanRightLetter[i].innerText = valueInput;
        getInputLetter.value = '';
      }
    });

    const checkIfArrayIsFull = getSplitWord.every((letra, i) => buildRightLetters[i] === letra);
    if(checkIfArrayIsFull) {
      msgGameStatus.innerText = 'Parabéns você acertou a palavra.';
      
      // Apagar a última palavra acertarda, antes de mostrar a próxima
      // Por enquanto ta somando a última com a atual.
      lettersWrong = [];
      getSplitWord = [];
      strong.innerText = '';
      errors.innerText = '';

      setTimeout(function() {
        msgGameStatus.innerText = '';
        newFunction(wordsList);
      }, 1000);

    }
  } else {
    lettersWrong.push(valueInput);
    errors.innerText = lettersWrong.join(', ');
    getInputLetter.value = '';

    if(lettersWrong.length === 3) {
      msgGameStatus.innerText = 'Você errou 3 letras. Boa sorte da próxima vez.';
      lettersWrong = [];

      setTimeout(function() {
        msgGameStatus.innerText = '';
        errors.innerText = '';
        newFunction(wordsList);
      }, 1500);
    }  
  }
  
});

newFunction(wordsList);