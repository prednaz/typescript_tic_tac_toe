export type Index = "first" | "second" | "third";
export type Three<T> = {[key in Index]: T};

export const map =
  <T1, T2>(f: (t1: T1) => T2, three: Three<T1>): Three<T2> =>
  ({
    first: f(three.first),
    second: f(three.second),
    third: f(three.third),
  });

export const any =
  <T>(f: (t: T) => boolean, three: Three<T>): boolean =>
  f(three.first) || f(three.second) || f(three.third);

export const all =
<T>(f: (t: T) => boolean, three: Three<T>): boolean =>
f(three.first) && f(three.second) && f(three.third);

export const transpose =
  <T>(board: Three<Three<T>>): Three<Three<T>> =>
  map(
    row_current =>
      map(
        column_curent => board[column_curent][row_current],
        indexes
      ),
    indexes
  );
export const indexes: Three<Index> =
{
  first: "first",
  second: "second",
  third: "third",
};
