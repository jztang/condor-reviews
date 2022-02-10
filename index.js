const inputForm = document.querySelector(".input-form");
const resetBtn = document.querySelector(".reset-btn");
const genContainer = document.querySelector(".generated-container");
const copyText = document.querySelector(".generated-text");
const copyBtn = document.querySelector(".copy-btn");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const racer1 = document.querySelector("#racer1").value;
  const racer2 = document.querySelector("#racer2").value;
  const raceNum = parseInt(document.querySelector("input[name='race-num']:checked").value);
  const raceWinner = parseInt(document.querySelector("input[name='race-winner']:checked").value);
  const origResult = document.querySelector("#orig-result").value;
  const overturn = document.querySelector("#overturn").checked;
  copyText.innerText = review(racer1, racer2, raceNum, raceWinner, origResult, overturn);
  genContainer.style.display = "block";
});

resetBtn.addEventListener("click", () => {
  genContainer.style.display = "none";
});

copyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(copyText.innerText);
});

function review(racer1, racer2, raceNum, raceWinner, origResult, overturn) {
  racer1 = racer1.replaceAll("_", "\\_");
  racer2 = racer2.replaceAll("_", "\\_");

  let raceNumWord;
  if (raceNum === 1) {
    raceNumWord = "first";
  } else if (raceNum === 2) {
    raceNumWord = "second";
  } else {
    raceNumWord = "third";
  }

  let racer1Wins = parseInt(origResult.charAt(0));
  let racer2Wins = parseInt(origResult.charAt(2));
  let racer1WinsAdj = racer1Wins;
  let racer2WinsAdj = racer2Wins;
  let keyword1;
  let keyword2;
  let winnerName;
  if (overturn) {
    keyword1 = "OVERTURNED";
    keyword2 = "NEW RESULT";
    if (raceWinner === 1) {
      racer1WinsAdj--;
      racer2WinsAdj++;
      winnerName = racer2;
    } else {
      racer1WinsAdj++;
      racer2WinsAdj--;
      winnerName = racer1;
    }
  } else {
    keyword1 = "upheld";
    keyword2 = "CONFIRMED";
    if (raceWinner === 1) {
      winnerName = racer1;
    } else {
      winnerName = racer2;
    }
  }

  return `Upon review of race ${raceNum} of ${racer1} vs. ${racer2}, the previous result (${racer1} ${racer1Wins}-${racer2Wins} ${racer2}) is being ${keyword1}, with ${winnerName} winning the ${raceNumWord} race.\n\n${keyword2}: ${racer1} [${racer1WinsAdj}-${racer2WinsAdj}] ${racer2}`;
}
