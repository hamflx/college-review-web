import { OccupiedSeat, SeatAreaLayout } from "../SeatView/types";

import { MovieModel } from "./types";

export interface BookingStatsProps {
  movie: MovieModel;
  layouts: SeatAreaLayout[];
  occupiedSeats: OccupiedSeat[];
}

export const BookingStats = ({
  movie,
  layouts,
  occupiedSeats,
}: BookingStatsProps) => {
  const allSeats = layouts.map((l) => l.seats).flat();
  const totalSeats = layouts.reduce(
    (count, layout) => count + layout.seats.length,
    0,
  );
  const remainSeats = totalSeats - occupiedSeats.length;
  const seatsByUser = occupiedSeats.reduce(
    (map, seat) => {
      const factor =
        allSeats.find((s) => s.col === seat.col && s.row === seat.row)
          ?.factor ?? 1;

      map[seat.login] = map[seat.login] || { seats: [], price: 0 };
      map[seat.login].seats.push(seat);
      map[seat.login].price += movie.price * factor;

      return map;
    },
    {} as Record<string, { seats: OccupiedSeat[]; price: 0 }>,
  );
  const userSeatListView = Object.entries(seatsByUser).map(
    ([login, { seats, price }]) => {
      return (
        <div key={login}>
          <span>{login}</span>
          <span> 花费 </span>
          <span>${price}</span>
          <span> 预定了 </span>
          <span>{seats.length}</span>
          <span> 个座位</span>
        </div>
      );
    },
  );

  return (
    <div>
      <div>剩余座位：{remainSeats}</div>
      {userSeatListView}
    </div>
  );
};
