import {Three} from "./three";
import * as three from "./three";

type Piece = "x" | "o";

type Board = Three<Three<Piece>>;

const board_example: Board =
  {
    first:  {first: "x", second: "o", third: "x"},
    second: {first: "x", second: "o", third: "x"},
    third:  {first: "x", second: "o", third: "x"},
  };

const check_piece =
  (board: Board, piece: Piece): boolean =>
  check_rows(board, piece); // || check_columns(board, piece) || check_diagonals;

const check_rows =
  (board: Board, piece: Piece): boolean =>
  three.any(
    (a: boolean): boolean => a,
    three.map(
      row_current => check_row(board, piece, row_current),
      three.indexes
    )
  );

const check_row =
  (board: Board, piece: Piece, row: three.Index) =>
  three.all(piece_current => piece_current === piece, board[row]);
