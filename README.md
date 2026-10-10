# Sudoku Solver

A small Sudoku web application for playing predefined puzzles or solving a puzzle you enter. It uses readable JavaScript and recursive backtracking, with no dependencies or backend.

## Technologies

HTML5, CSS3, and vanilla JavaScript.

## Features

- Play Mode with five puzzles (roughly easy, medium, and hard) and fixed clues.
- Solve Mode with an editable empty board.
- Live conflict highlighting, keyboard navigation, and a Check button.
- Reset restores the original Play puzzle or clears Solve Mode.
- New Puzzle cycles through the five Play puzzles; changing modes starts a fresh board.
- A personalized greeting saved in localStorage.
- A responsive grid for desktop and mobile screens.

All five included puzzles were checked to have exactly one solution. Difficulty labels are approximate.

## How backtracking works

The solver finds the first empty cell and tries numbers 1 through 9. It checks the row, column, and 3x3 box before placing a number. Then it recursively solves the next empty cell. If that choice leads to a dead end, it clears the cell and tries another number. A full board means success; exhausting every choice means no solution exists.

The app rejects conflicting clues before solving and searches a copy of the board, preserving your entries if it fails. Check reports rule conflicts and completion; a conflict-free partial board is not a guarantee that it can be completed. User-entered puzzles may have multiple solutions; Solve returns the first one found.

## Run

Keep all four files in the same folder and open `index.html` in a web browser. No installation, build command, internet connection, or server is needed. Name storage depends on browser settings; use the same browser and file location for later visits.

## Try it

In Play Mode, fill a blank cell, try a duplicate, and use Check, Reset, and New Puzzle. In Solve Mode, enter a puzzle and click Solve. Try arrow keys, Backspace, and Delete. Save your name and refresh to check the greeting.
