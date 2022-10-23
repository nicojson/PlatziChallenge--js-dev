const form = document.querySelector("form");
const passwordParagraph = document.querySelector("#password-output-copy");
const rangeInput = document.querySelector("#password-length-range");
const manualInput = document.querySelector("#password-manual-length");
const allCharacNode = document.querySelector("#option-all");

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];

// genera una cadena de caracteres con letras, numeros o simbolos

// const passwordLength = document.querySelector("#passtword-length-range");

function passwordGenerator (length, checksBotonsitos) {
  const allCharaters = [];
  let strongPassword = [];

  if (checksBotonsitos.numbers === true) {
    allCharaters.push(numbers);
  }
  if (checksBotonsitos.letters === true) {
    allCharaters.push(letters);
  }
  if (checksBotonsitos.symbols === true) {
    allCharaters.push(symbols);
  }
  if (checksBotonsitos.allCharaters === true) {
    allCharaters.push(numbers);
    allCharaters.push(letters);
    allCharaters.push(symbols);
  }

  for (let i = 0; i < length; i++) {
    const characterType = allCharaters[numberRamdom(0, allCharaters.length - 1)];
    const character = characterType[numberRamdom(0, characterType.length - 1)];
    strongPassword.push(character);
  }

  strongPassword = strongPassword.join("");
  return strongPassword
}

function numberRamdom (min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}

//pendiente de convertir a una función
rangeInput.addEventListener("change", (event) => {
  event.preventDefault();
  const getValue = event.target.value;

  manualInput.value = getValue;
})

manualInput.addEventListener("change", (event) => {
  event.preventDefault();
  const getValue = event.target.value;

  rangeInput.value = getValue;
})

allCharacNode.addEventListener("change", (event) => {
  const onChecked = event.target.checked;
  if (onChecked === true) {
    form.numbers.checked = true;
    form.letters.checked = true;
    form.symbols.checked = true;
    form.words.checked = true;
  } else if (onChecked === false) {
    form.numbers.checked = false;
    form.letters.checked = false;
    form.symbols.checked = false;
    form.words.checked = false;
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const lengthRange = event.target.lengthrange.value;

  const checks = {
    numbers: event.target.numbers.checked,
    letters: event.target.letters.checked,
    symbols: event.target.symbols.checked,
    words: event.target.words.checked,
    allCharaters: event.target.allCharacteres.checked,
  };

  passwordParagraph.innerText = passwordGenerator(lengthRange, checks);
});

passwordParagraph.addEventListener("click", (event) => {
  const copyPassword = event.target; //elemento a copiar
  let passwordSelect = document.createRange(); //creo una selección vacia

  passwordSelect.selectNodeContents(copyPassword);//incluyo el nodo de la selección
  //Antes de añadir el intervalo de selección a la selección actual, elimino otros que puedieran existir (sino no funciona en Edge)
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(passwordSelect);// y le añado a lo selecionado actualmente
  
  //utilizamos Clipboard.writeText() de la Clipboard API es una sustitucion de document.execComand() para aceder al portapapeles
  navigator.clipboard.writeText(passwordSelect).then(
    () => {
      copyExito();
    },
    () => {
      console.log("Failed")
    }
  )
  window.getSelection().removeAllRanges(passwordSelect);
})

//Funciones auxiliares para mostrar y ocultar alerta
const divAlert = document.querySelector("#alerta");

function copyExito () {
  passwordParagraph.classList.add("output-copy-ativate");
  divAlert.innerText = "!!Copiado al portapapeles corectamente!!";
  divAlert.classList.add("alert");
  setTimeout(hiddenCopyExito, 5000);
}

function hiddenCopyExito () {
  passwordParagraph.classList.remove("output-copy-ativate")
  divAlert.innerText = "";
  divAlert.classList.remove("alert");
}