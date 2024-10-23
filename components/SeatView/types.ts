export interface SeatAreaLayout {
  cols: number;
  seats: SeatItemInfo[];
}

export interface SeatItemInfo extends SeatPosition {
  /**
   * 票价系数，比如中间区域的票价贵一些。
   */
  factor: number;
}

export interface SeatPosition {
  row: number;
  col: number;
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
  NotAvailable,
  Available,
  Selected,
  Occupied,
}
