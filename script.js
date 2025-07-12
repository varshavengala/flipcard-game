const emojis = ['🍎', '🍌', '🍇', '🍓', '🍍'];
let cards = [...emojis, ...emojis]; // 10 cards (5 pairs)
let flipped = [], matched = 0;
let moves = 0, timer = 0, timerInterval;
let gameStarted = false;

const board = document.getElementById('gameBoard');
const timerEl = document.getElementById('timer');
const movesEl = document.getElementById('moves');
const starsEl = document.getElementById('stars');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  const inner = document.createElement('div');
  inner.classList.add('card-inner');

  inner.innerHTML = `
    <div class="card-front">${emoji}</div>
    <div class="card-back">?</div>
  `;
  card.appendChild(inner);

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flipped.length === 2) return;

    if (!gameStarted) {
      gameStarted = true;
      timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = timer;
      }, 1000);
    }

    card.classList.add('flipped');
    flipped.push({ card, emoji });

    if (flipped.length === 2) {
      moves++;
      movesEl.textContent = moves;
      updateStars();

      const [first, second] = flipped;
      if (first.emoji === second.emoji) {
        matched += 2;
        flipped = [];

        if (matched === cards.length) {
          clearInterval(timerInterval);
          setTimeout(() => alert(`🎉 You won in ${moves} moves and ${timer}s!`), 300);
        }
      } else {
        setTimeout(() => {
          first.card.classList.remove('flipped');
          second.card.classList.remove('flipped');
          flipped = [];
        }, 800);
      }
    }
  });

  return card;
}

function updateStars() {
  if (moves <= 10) {
    starsEl.textContent = '★★★';
  } else if (moves <= 15) {
    starsEl.textContent = '★★☆';
  } else {
    starsEl.textContent = '★☆☆';
  }
}

function resetGame() {
  board.innerHTML = '';
  cards = shuffle([...emojis, ...emojis]);
  matched = 0;
  moves = 0;
  timer = 0;
  flipped = [];
  gameStarted = false;
  clearInterval(timerInterval);
  timerEl.textContent = '0';
  movesEl.textContent = '0';
  starsEl.textContent = '★★★';

  cards.forEach(emoji => {
    const card = createCard(emoji);
    board.appendChild(card);
  });
}

resetGame();
