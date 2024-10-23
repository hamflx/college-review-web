import { SeatAreaLayout, OccupiedSeat } from "../SeatView/types";

export interface MovieModel {
  id: string;
  name: string;
  price: number;

  /**
   * 电影放映场次。
   */
  plays?: MoviePlaying[];
}

export enum PlayingTime {
  Moring = "morning",
  Afternoon = "afternoon",
  Evening = "evening",
}

export const PlayingTimeNames: Record<PlayingTime, string> = {
  [PlayingTime.Moring]: "上午",
  [PlayingTime.Afternoon]: "下午",
  [PlayingTime.Evening]: "晚上",
};

export interface MoviePlaying {
  /**
   * 放映时间。
   */
  time: PlayingTime;

  /**
   * 座位布局。
   */
  seatsLayout: SeatAreaLayout[];

  /**
   * 用户购买的作为列表。
   */
  occupiedSeats: OccupiedSeat[];
}

export interface CinemaState {
  /**
   * 这个电影院能放映的电影。
   */
  availableMovies: MovieModel[];
}
