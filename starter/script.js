'use strict';

//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, activePlayer, player;

const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  player = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//rolling dice funtionality

btnRoll.addEventListener('click', function () {
  if (player) {
    // 1.generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check rolled 1: if true switch to the next player

    if (dice !== 1) {
      //Add dice to currentscore
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;

      //current0EL.textContent = currentscore;
    } else {
      //switch to the nxt player
      /*
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentscore = 0;
            player0EL.classList.toggle('player--active');
            player1EL.classList.toggle('player--active');
            */
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (player) {
    // 1) add currentscore to active player's score
    scores[activePlayer] += currentscore;
    //scores[1] = scores[1] + currentscore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if players scores is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      player = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the second player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
