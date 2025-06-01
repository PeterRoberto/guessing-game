

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
const wordArrayKeys = Object.keys(wordsList); 



// Função que pega um elemento aleatório de um array
function getRandomArrayElement(array) {
  if (array.length === 0) {
    return undefined; // Retorna undefined para um array vazio
  }
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}


// 2 - Passamos as chaves(categorias) do objeto para a função que gera um elemento aleatório
const categoryKey = getRandomArrayElement(wordArrayKeys);
console.log(categoryKey)

// 3 - Guardamos o objeto + a chave(categorias) | Nos retorna o array referente a chave
const objectWithRandomKey = wordsList[categoryKey];


// 4 - Passamos o objeto c/ a chave p/ a função, aí gera uma palavra aleatória do array
let getIndice = getRandomArrayElement(objectWithRandomKey);


// 5 - Transformamos a palavra em array, pra cada letra ficar em um índice
let splitIndice = getIndice.split('');
let getSplitWord = [];


// 6 - Passamos a palavra como array p/ o forEach, criamos e inserimos cada letra no FRONT END
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
  
});


// 7 - Função que pega a palavra "sorteada" e exibe algumas informações no front, antes e depois do click
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

            // if(testTrue === true) {
            //   points = 50;
            //   console.log(points);
            //   let issos = getRandomArrayElement(wordArrayKeys);
            //   let aquilo = getRandomArrayElement(issos)
            //   let denovo = wordsList[categoryKey];

            //   // 4 - Passamos o objeto c/ a chave p/ a função, aí gera uma palavra aleatória do array
            //   let yeah = getRandomArrayElement(denovo);

            //   console.log(issos)
            //   console.log(aquilo)
            //   console.log(yeah)
            // }
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
getWordSorted(getSplitWord, categoryKey);
