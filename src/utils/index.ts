export type partOf<T> = {
  [P in keyof T]?: partOf<T[P]>;
};
