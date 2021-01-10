import {Three} from "./three";
import * as three from "./three";
import * as R from "ramda";

export type Piece = "x" | "o";
export type Board = Three<Three<Piece | null>>;
export type State =
  {
    board: Board,
    turn: Piece,
    message: string,
  };
export type Coordinate = [three.Index, three.Index];
export type Event = Coordinate;

// Update the game state on events triggered by the player
// returning the resulting new game state.
// So far, the only supported events are clicks on the board
// encoded via a tuple `[row, column]`.
export const update =
  (state: State, event: Event): State =>
    {
      const result: State = R.clone(state);

      result.board[event[0]][event[1]] = result.turn;
      result.turn =
        result.turn === "x" ? "o" : "x";
      result.message =
        "x: " + check_piece("x", result.board) + ", " +
        "o: " + check_piece("o", result.board);
      return result;
    };

export const state_initial: State =
  {
    turn: "x",
    message: "Enjoy the game.",
    board:
      {
        first:  {first: null, second: null, third: null},
        second: {first: null, second: null, third: null},
        third:  {first: null, second: null, third: null},
      },
  };

const board_example: Board =
  {
    first:  {first: "x", second: "o", third: "x"},
    second: {first: "x", second: "o", third: "x"},
    third:  {first: "x", second: "o", third: "x"},
  };

// Check if the piece passed as the first argument has won.
// Incomplete.
const check_piece =
  (piece: Piece, board: Board): boolean =>
  check_rows(piece, board) || check_columns(piece, board); // || check_diagonals(piece, board);

const check_rows =
  (piece: Piece, board: Board): boolean =>
  three.any(
    (a: boolean): boolean => a,
    three.map(check_row(piece), board)
  );

const check_row =
  (piece: Piece) =>
  (row: Three<Piece | null>) =>
  three.all(piece_current => piece_current === piece, row);

const check_columns =
  (piece: Piece, board: Board): boolean =>
  check_rows(piece, three.transpose(board));
