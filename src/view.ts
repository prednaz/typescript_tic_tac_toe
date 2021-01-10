import * as three from "./three.js";
import * as R from "ramda";
import * as map_value_indexed from "./map_value_indexed.js"
import * as tic from "./tic.js";

const indexes: ReadonlyArray<three.Index> = ["first", "second", "third"];
const coordinates: ReadonlyArray<tic.Event> =
  R.liftN
  (
    2,
    R.constructN(2, tic.Event)
  )
  (
    indexes,
    indexes
  );
const field_list = Array.from(document.querySelectorAll(".field"));
const field_map =
  map_value_indexed.fromList(
    R.zip(
      coordinates,
      field_list
    )
  );
let state = tic.state_initial;
map_value_indexed.forEachIndexed(
  ([coordinate, field]): void =>
    {
      field.addEventListener(
        "click",
        () => {
          state = tic.udpate(state, coordinate);
          R.forEach(
            ([coordinate, piece]: [tic.Event, Piece]): void => {field.innerHTML = map_value_indexed.lookup(coordinate, )}
            , R.unnest(R.mapObjIndexed(
            (row: three.Three<tic.Piece>, row_index: three.Index): ReadonlyArray<readonly [tic.Event, Piece] =>
              R.mapObjIndexed(
                (piece: Piece, column_index: three.Index): readonly [tic.Event, Piece] => [new Event(column_index, row_index), piece],
                row
              ),
            state.board
          )))
        }
      );
    },
  field_map
);