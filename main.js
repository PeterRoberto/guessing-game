

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

            // Apagar a última palavra acertarda, antes de mostrar a próxima
            // Por enquanto ta somando a última com a atual.

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

  let uai = getRandomArrayElement(wordsList[categoryKey]);
  let splitIndice = uai.split('');
  let getSplitWord = [];


  splitIndice.forEach((key, i) => {
    let divLetterCard = document.createElement("div"); 
    wordDisplay.appendChild(divLetterCard);

    // Adiciona a classe letter-card na div criada anteriormente
    divLetterCard.classList.add('letter-card');
    buildTagsElements(divLetterCard, 'span', 'front');
    buildTagsElements(divLetterCard, 'span', 'back', key);

    // Reatribuindo a variável getSplitWord
    getSplitWord = [...splitIndice];
  
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



