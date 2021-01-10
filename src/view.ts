import * as tic from "./game";
import * as three from "./three";
import * as R from "ramda";

const indexes: ReadonlyArray<three.Index> = ["first", "second", "third"];
const coordinates: ReadonlyArray<tic.Coordinate> =
  R.liftN
  (
    2,
    R.pair
  )
  (
    indexes,
    indexes
  );
const fields: ReadonlyArray<[tic.Coordinate, Element]> =
  R.zip(
    coordinates,
    Array.from(document.querySelectorAll(".field"))
  );

const message_box: Element | null = document.querySelector("#message");
if (message_box === null) {
  throw new Error("Where is #message?")
}
const view =
  (state: tic.State): void =>
    {
      message_box.textContent = state.message;
      R.forEach(
        ([coordinate, field]: [tic.Coordinate, Element]): void =>
          {
            if (field.firstChild === null) {
              throw new Error("All fields must contain a paragraph.")
            }
            const piece = state.board[coordinate[0]][coordinate[1]];
            field.firstChild.textContent =
              piece === null
                ? ""
                : piece.toUpperCase();
          },
        fields
      );
    };

let state: tic.State = tic.state_initial;
view(state);
R.forEach(
  ([coordinate, field]: [tic.Coordinate, Element]): void =>
    {
      field.addEventListener(
        "click",
        () => {
          state = tic.update(state, coordinate);
          view(state);
        }
      );
    },
  fields
);
