const messageElement = document.querySelector(".message");

const randomNumber = Math.floor(Math.random() * 100) + 1;

let playable = true;

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function speak(e) {
  const num = +e.results[0][0].transcript;

  messageElement.innerHTML = `<p> you said: ${num}</p>`;
  checkNumber(num);
}

function checkNumber(num) {
  if (Number.isNaN(num)) {
    messageElement.innerHTML = `<p>name the card!</p>`;
    return;
  }

  if (num > 100 || num < 1) {
    messageElement.innerHTML = `<p>the number mustbe between 1 and 100</p>`;
    return;
  }

  if (num === randomNumber) {
    document.body.innerHTML = `
<h3>
Congratulations! You guessed the number.</h3>
<button> next </button>
`;
    playable = false;
  } else if (num > randomNumber) {
    messageElement.innerHTML += `<p>smaller!</p>`;
  } else {
    messageElement.innerHTML += `<p>Bigger!</p>`;
  }
}

recognition.addEventListener("result", speak);

recognition.addEventListener("end", () => {
  if (playable) recognition.start();
});

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    location.reload();
  }
});
