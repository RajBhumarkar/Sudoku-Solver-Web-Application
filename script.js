const puzzles = [
    [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ],
    [
        [0,0,3,0,2,0,6,0,0],
        [9,0,0,3,0,5,0,0,1],
        [0,0,1,8,0,6,4,0,0],
        [0,0,8,1,0,2,9,0,0],
        [7,0,0,0,0,0,0,0,8],
        [0,0,6,7,0,8,2,0,0],
        [0,0,2,6,0,9,5,0,0],
        [8,0,0,2,0,3,0,0,9],
        [0,0,5,0,1,0,3,0,0]
    ],
    [
        [2,0,0,0,8,0,3,0,0],
        [0,6,0,0,7,0,0,8,4],
        [0,3,0,5,0,0,2,0,9],
        [0,0,0,1,0,5,4,0,8],
        [0,0,0,0,0,0,0,0,0],
        [4,0,2,7,0,6,0,0,0],
        [3,0,1,0,0,7,0,4,0],
        [7,2,0,0,4,0,0,6,0],
        [0,0,4,0,1,0,0,0,3]
    ],
    [
        [0,0,0,0,0,0,9,0,7],
        [0,0,0,4,2,0,1,8,0],
        [0,0,0,7,0,5,0,2,6],
        [1,0,0,9,0,4,0,0,0],
        [0,5,0,0,0,0,0,4,0],
        [0,0,0,5,0,7,0,0,9],
        [9,2,0,1,0,8,0,0,0],
        [0,3,4,0,5,9,0,0,0],
        [5,0,7,0,0,0,0,0,0]
    ],
    [
        [0,3,0,0,0,0,0,8,0],
        [0,0,9,0,0,0,5,0,0],
        [0,0,7,5,0,9,2,0,0],
        [7,0,0,1,0,5,0,0,8],
        [0,2,0,0,9,0,0,3,0],
        [9,0,0,4,0,2,0,0,1],
        [0,0,4,2,0,7,1,0,0],
        [0,0,2,0,0,0,8,0,0],
        [0,7,0,0,0,0,0,9,0]
    ]
];
const difficulties = ["Easy", "Easy", "Medium", "Medium", "Hard"];

let mode = "play";
let puzzleIndex = 0;
let board = [];
let startingBoard = [];
let cells = [];

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const nameForm = document.getElementById("name-form");
const greeting = document.getElementById("greeting");

function createEmptyBoard() {
    const emptyBoard = [];
    for (let row = 0; row < 9; row++) {
        emptyBoard[row] = [];
        for (let col = 0; col < 9; col++) {
            emptyBoard[row][col] = 0;
        }
    }
    return emptyBoard;
}

function copyBoard(board) {
    const copy = [];
    for (let row = 0; row < 9; row++) {
        copy[row] = board[row].slice();
    }
    return copy;
}

function isValidMove(board, row, col, num) {
    // Ignore the current cell so this also checks existing entries.
    for (let i = 0; i < 9; i++) {
        if (i !== col && board[row][i] === num) {
            return false;
        }
        if (i !== row && board[i][col] === num) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if ((r !== row || c !== col) && board[r][c] === num) {
                return false;
            }
        }
    }
    return true;
}

function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

// The starting board must be checked for conflicts before calling this.
function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (emptyCell === null) {
        return true;
    }

    const row = emptyCell[0];
    const col = emptyCell[1];
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            // Undo this choice when the remaining cells cannot be solved.
            board[row][col] = 0;
        }
    }
    return false;
}

function createGrid() {
    for (let row = 0; row < 9; row++) {
        cells[row] = [];
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.inputMode = "numeric";
            cell.maxLength = 1;
            cell.autocomplete = "off";
            cell.className = "cell";
            cell.setAttribute("aria-label", "Row " + (row + 1) + ", column " + (col + 1));
            cell.addEventListener("input", function () {
                handleInput(row, col);
            });
            cell.addEventListener("keydown", function (event) {
                handleKeyDown(event, row, col);
            });
            cell.addEventListener("focus", function () {
                cell.select();
            });
            grid.appendChild(cell);
            cells[row][col] = cell;
        }
    }
}

function renderBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = cells[row][col];
            cell.value = "";
            if (board[row][col] !== 0) {
                cell.value = board[row][col];
            }
            cell.readOnly = mode === "play" && startingBoard[row][col] !== 0;
            cell.classList.toggle("clue", cell.readOnly);
        }
    }
    highlightConflicts();
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function highlightConflicts() {
    let hasConflict = false;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col];
            const conflict = num !== 0 && !isValidMove(board, row, col, num);
            cells[row][col].classList.toggle("conflict", conflict);
            cells[row][col].setAttribute("aria-invalid", String(conflict));
            if (conflict) {
                hasConflict = true;
            }
        }
    }
    return hasConflict;
}

function handleInput(row, col) {
    const cell = cells[row][col];
    if (cell.readOnly) {
        cell.value = board[row][col];
        return;
    }

    const value = cell.value;
    if (value !== "" && !/^[1-9]$/.test(value)) {
        cell.value = "";
        if (board[row][col] !== 0) {
            cell.value = board[row][col];
        }
        showMessage("Please enter a single number from 1 to 9.", "error");
        return;
    }

    board[row][col] = Number(value);
    if (highlightConflicts()) {
        showMessage("Conflicting numbers are marked in red.", "error");
    } else if (findEmptyCell(board) === null) {
        showMessage("Congratulations! You completed the Sudoku correctly.", "success");
    } else {
        showMessage("", "");
    }
}

function handleKeyDown(event, row, col) {
    let nextRow = row;
    let nextCol = col;
    if (event.key === "ArrowUp") {
        nextRow--;
    } else if (event.key === "ArrowDown") {
        nextRow++;
    } else if (event.key === "ArrowLeft") {
        nextCol--;
    } else if (event.key === "ArrowRight") {
        nextCol++;
    } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (!cells[row][col].readOnly) {
            cells[row][col].value = "";
            handleInput(row, col);
        }
        return;
    } else {
        return;
    }

    event.preventDefault();
    if (nextRow >= 0 && nextRow < 9 && nextCol >= 0 && nextCol < 9) {
        cells[nextRow][nextCol].focus();
    }
}

function loadBoard() {
    if (mode === "play") {
        startingBoard = copyBoard(puzzles[puzzleIndex]);
        document.getElementById("mode-description").textContent =
            "Puzzle " + (puzzleIndex + 1) + " of 5 · " + difficulties[puzzleIndex] + " · Shaded numbers are fixed.";
    } else {
        startingBoard = createEmptyBoard();
        document.getElementById("mode-description").textContent = "Enter your puzzle, then click Solve.";
    }
    board = copyBoard(startingBoard);
    renderBoard();
    showMessage("", "");
}

function setMode(nextMode) {
    if (mode === nextMode) {
        return;
    }
    mode = nextMode;
    document.getElementById("play-mode").setAttribute("aria-pressed", String(mode === "play"));
    document.getElementById("solve-mode").setAttribute("aria-pressed", String(mode === "solve"));
    document.getElementById("new-puzzle").hidden = mode === "solve";
    loadBoard();
}

function checkBoard() {
    if (highlightConflicts()) {
        showMessage("There are conflicting numbers. Check the red cells.", "error");
    } else if (findEmptyCell(board) !== null) {
        showMessage("No conflicts so far. There are still empty cells to fill.", "");
    } else {
        showMessage("Congratulations! You completed the Sudoku correctly.", "success");
    }
}

function solveBoard() {
    if (highlightConflicts()) {
        showMessage("The starting board has conflicting numbers. Fix the red cells first.", "error");
        return;
    }

    // Work on a copy so an unsuccessful search cannot change the displayed puzzle.
    const solution = copyBoard(board);
    if (solveSudoku(solution)) {
        board = solution;
        renderBoard();
        showMessage("Solution found!", "success");
    } else {
        showMessage("No solution found", "error");
    }
}

function loadGreeting() {
    try {
        const savedName = localStorage.getItem("sudokuName");
        if (savedName) {
            greeting.textContent = "Welcome, " + savedName + "!";
            nameForm.hidden = true;
        }
    } catch (error) {
        greeting.textContent = "Welcome! You can enter your name below.";
    }
}

nameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name-input").value.trim();
    if (name === "") {
        showMessage("Please enter your name.", "error");
        return;
    }
    greeting.textContent = "Welcome, " + name + "!";
    nameForm.hidden = true;
    showMessage("", "");
    try {
        localStorage.setItem("sudokuName", name);
    } catch (error) {
        showMessage("Your browser cannot save the name. The greeting will last for this visit.", "");
    }
});

document.getElementById("play-mode").addEventListener("click", function () {
    setMode("play");
});
document.getElementById("solve-mode").addEventListener("click", function () {
    setMode("solve");
});
document.getElementById("new-puzzle").addEventListener("click", function () {
    puzzleIndex = (puzzleIndex + 1) % puzzles.length;
    loadBoard();
});
document.getElementById("reset").addEventListener("click", function () {
    board = copyBoard(startingBoard);
    renderBoard();
    showMessage("Board reset.", "");
});
document.getElementById("check").addEventListener("click", checkBoard);
document.getElementById("solve").addEventListener("click", solveBoard);

createGrid();
loadBoard();
loadGreeting();
