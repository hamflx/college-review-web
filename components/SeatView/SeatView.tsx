import { useContext } from "react";

import { LogonUserContext } from "../user/logonUser";

import { SeatArea } from "./SeatArea";
import { SeatLegend } from "./SeatLegend";
import {
  OccupiedSeat,
  SeatAreaLayout,
  SeatItemState,
  SeatPosition,
  SeatState,
} from "./types";

export interface SeatViewProps {
  layouts: SeatAreaLayout[];
  occupiedSeats: OccupiedSeat[];
  notAvailableSeats: SeatPosition[];
  updateOccupiedSeats: (seats: OccupiedSeat[]) => void;
}

export const SeatView = ({
  layouts,
  occupiedSeats,
  updateOccupiedSeats,
  notAvailableSeats,
}: SeatViewProps) => {
  const profile = useContext(LogonUserContext);
  const selectedSeats: SeatItemState[] = occupiedSeats.map((s) => {
    return {
      col: s.col,
      row: s.row,
      state:
        s.login === profile.login ? SeatState.Selected : SeatState.Occupied,
    };
  });

  const notAvailableSeatsState: SeatItemState[] = notAvailableSeats.map(
    ({ row, col }) => ({
      row,
      col,
      state: SeatState.NotAvailable,
    }),
  );

  const onSeatClick = (seat: SeatItemState) => {
    if (
      seat.state === SeatState.Occupied ||
      seat.state === SeatState.NotAvailable
    )
      return;

    let copy = [...occupiedSeats];

    switch (seat.state) {
      case SeatState.Available:
        copy.push({ col: seat.col, row: seat.row, login: profile.login });
        break;
      case SeatState.Selected:
        copy.splice(
          copy.findIndex((s) => s.row === seat.row && s.col === seat.col) >>> 0,
          1,
        );
        break;
      default:
        const _: never = seat.state;
    }

    updateOccupiedSeats(copy);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 这个是荧幕。 */}
      <div className="perspective-[600px]">
        <div className="bg-white w-[280px] h-[60px] rotate-x-[-30deg] shadow-[0_0_15px_0] dark:shadow-white" />
      </div>

      {/* 作为类型图例。 */}
      <SeatLegend />

      {/* 选座位区域。 */}
      <div className="flex gap-3 items-start">
        {layouts.map((layout, index) => {
          const columnOffset = layouts
            .slice(0, index)
            .reduce((cols, item) => cols + item.cols, 0);

          return (
            <SeatArea
              key={index}
              columnOffset={columnOffset}
              layout={layout}
              selected={[...selectedSeats, ...notAvailableSeatsState]}
              onClick={onSeatClick}
            />
          );
        })}
      </div>
    </div>
  );
};
