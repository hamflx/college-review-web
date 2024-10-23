export interface SeatAreaLayout {
  rows: number;
  cols: number;
}

export interface SeatItemState {
  state: SeatState;
  row: number;
  col: number;
}

export interface OccupiedSeat {
  login: string;
  row: number;
  col: number;
}

export enum SeatState {
  Available,
  Selected,
  Occupied,
}
