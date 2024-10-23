import { SeatAreaLayout } from "../SeatView/types";

import { MovieModel, PlayingTime } from "./types";

export const fakeMovieList: MovieModel[] = [
  {
    name: "Endgame",
    id: "1",
    price: 10,
    plays: [
      {
        time: PlayingTime.Moring,
        seatsLayout: buildLayout([6, 2], [7, 4], [6, 2]),
        occupiedSeats: [],
      },
      {
        time: PlayingTime.Evening,
        seatsLayout: buildLayout([8, 2], [8, 4], [8, 2]),
        occupiedSeats: [],
      },
    ],
  },
  {
    name: "Joker",
    id: "2",
    price: 12,
    plays: [
      {
        time: PlayingTime.Moring,
        seatsLayout: buildLayout([6, 2], [6, 4], [6, 2]),
        occupiedSeats: [],
      },
      {
        time: PlayingTime.Afternoon,
        seatsLayout: buildLayout([6, 2], [6, 4], [6, 2]),
        occupiedSeats: [],
      },
    ],
  },
  { name: "Toy Story", id: "3", price: 8 },
];

function buildLayout(...layouts: Array<[number, number]>): SeatAreaLayout[] {
  return layouts.map(([rows, cols]) => ({
    rows,
    cols,
  }));
}
