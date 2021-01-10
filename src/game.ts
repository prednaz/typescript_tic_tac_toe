import {Three} from "./three";
import * as three from "./three";
import * as R from "ramda";

export type Piece = "x" | "o";
export type Board = Three<Three<Piece | null>>;
export type State = {board: Board, turn: Piece, message: string};
export type Coordinate = [three.Index, three.Index];
export type Event = Coordinate;

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

const check_piece =
  (piece: Piece, board: Board): boolean =>
  check_rows(piece, board); // || check_columns(board, piece) || check_diagonals;

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
