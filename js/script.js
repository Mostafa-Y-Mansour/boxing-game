class Character {
  constructor(name, type = "player", hp = 100) {
    this.name = name;
    this.type = type;
    this.hp = hp;
  }

  hit(enemy) {
    if (enemy.hp <= 0) {
    } else {
      if (enemy.type === "player") {
        enemy.hp -= 10;
      } else {
        enemy.hp -= 20;
      }
    }
  }
}

let jack = new Character("jack"); // default type is "player" and hp is 100
let guru = new Character("guru", "enemy", 120);

let player = document.querySelector(".player");
let enemy = document.querySelector(".enemy");

health("player-hp", jack);
health("enemy-hp", guru);

player.addEventListener("click", () => {
  hurt(player, enemy);
  jack.hit(guru);
  health("enemy-hp", guru);
  winner("enemy-hp");
});
document.addEventListener("keypress", (e) => {
  if (e.key === "f") {
    hurt(player, enemy);
    jack.hit(guru);
    health("enemy-hp", guru);
    winner("enemy-hp");
  }
});
enemy.addEventListener("click", () => {
  guru.hit(jack);
  hurt(enemy, player);
  health("player-hp", jack);
  winner("player-hp");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "j") {
    guru.hit(jack);
    hurt(enemy, player);
    health("player-hp", jack);
    winner("player-hp");
  }
});

function health(element, char) {
  let bar = document.querySelector(`#${element} .bar`);
  let percent = document.querySelector(`#${element} .bar .hp-percent`);

  percent.innerHTML = `${char.hp}%` || "unknown";

  bar.style.width = `${char.hp}%`;
  if (char.hp <= 100) {
    bar.style.backgroundColor = `hsla(0, 90%, calc(${char.hp}% - 20%))`;
  } else {
    bar.style.backgroundColor = `hsla(0, 90%, calc(${char.hp}% - 40%))`;
  }
}

function hurt(char1, char2) {
  char1.style.zIndex = 1;
  char2.style.zIndex = 0;
  if (char1 === player) {
    char1.innerHTML = `<img src="./images/characters/player/player_punch.png" alt="">`;

    char2.innerHTML = `<img src="./images/characters/enemy/enemy_hurt.png" alt=""></img>`;

    setTimeout(() => {
      char1.innerHTML = `<img src="./images/characters/player/player_stand.png" alt="">`;

      char2.innerHTML = `<img src="./images/characters/enemy/enemy_stand.png" alt=""></img>`;
    }, 300);
  } else {
    char1.innerHTML = `<img src="./images/characters/enemy/enemy_punch.png" alt=""></img>`;

    char2.innerHTML = `<img src="./images/characters/player/player_hurt.png" alt="">`;

    setTimeout(() => {
      char1.innerHTML = `<img src="./images/characters/enemy/enemy_stand.png" alt=""></img>`;

      char2.innerHTML = `<img src="./images/characters/player/player_stand.png" alt="">`;
    }, 300);
  }
}

function winner(element) {
  let charName = document.querySelector(`#${element}`);
  let percent = document.querySelector(`#${element} .bar .hp-percent`);
  let gameOver = document.querySelector(".game-over");
  let winner = document.querySelector(".winner");
  let winnerName = "";
  setTimeout(() => {
    if (percent.innerText === "0%") {
      if (charName.id === "player-hp") {
        player.innerHTML = `<img src="./images/characters/player/player_dead.png" alt="">`;
        winnerName = "enemy";
      } else {
        enemy.innerHTML = `<img src="./images/characters/enemy/enemy_dead.png" alt="">`;
        winnerName = "player";
      }
      gameOver.style.display = "flex";

      winner.innerHTML = `<img class="stand" src="./images/characters/${winnerName}/${winnerName}_stand.png">`;

      if (winnerName === "enemy") {
        winner.style = `
          transform: translate(15%, -15%);
  -webkit-transform: translate(15%, -15%);
  -moz-transform: translate(15%, -15%);
  -ms-transform: translate(15%, -15%);
  -o-transform: translate(15%, -15%);`;
      }

      setInterval(() => {
        if (winner.firstElementChild.className === "punch") {
          winner.innerHTML = `<img class="stand" src="./images/characters/${winnerName}/${winnerName}_stand.png">`;
        } else {
          winner.innerHTML = `<img class="punch" src="./images/characters/${winnerName}/${winnerName}_punch.png">`;
        }
      }, 1000);
    }
  }, 350);
}
