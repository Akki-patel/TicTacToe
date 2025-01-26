let turn = "";
let board = ["", "", "", "", "", "", "", "", ""];
let win_pos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];
let over = false;

document.getElementById("reset").addEventListener("click", reset);

function select(obj) {
  if (obj.id === "X") {
    turn = "X";
  } else {
    turn = "0";
  }
  document.querySelector("h2").innerHTML = `Player ${turn} move`;
}


function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
//   turn = "X";
  over = false;

  for (let i = 0; i < 9; i++) {
    document.getElementById((i + 1).toString()).innerHTML = "";
  }
  setTimeout(() => {
    location.reload();
  }, 0);
}

function move(obj) {
  let id = parseInt(obj.id) - 1; // Convert to zero-based index
  if (board[id] === "" && !over) {
    board[id] = turn;
    obj.innerHTML = turn;

    if (win()) {
      document.querySelector("h2").innerHTML = `Player ${turn} wins!`;
      over = true;
      return;
    }

    let draw = true;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        draw = false;
        break;
      }
    }

    if (draw) {
      document.querySelector("h2").innerHTML = "It's a draw!";
      over = true;
      return;
    }

    turn = turn === "X" ? "O" : "X";
    document.querySelector("h2").innerHTML = `Player ${turn} move`;

  }
}

function win() {
  for (let i = 0; i < win_pos.length; i++) {
    const [a, b, c] = win_pos[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}
