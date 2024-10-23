import { SeatState } from "./types";

export interface SeatItemProps {
  state: SeatState;
  onClick?: () => void;
}

export const SeatItem = ({ state, onClick }: SeatItemProps) => {
  switch (state) {
    case SeatState.NotAvailable:
      return (
        <span
          className="inline-block w-3 h-3 rounded-[12px_12px_0_0] cursor-pointer bg-seat-na"
          onClick={onClick}
        />
      );
    case SeatState.Available:
      return (
        <span
          className="inline-block w-3 h-3 rounded-[12px_12px_0_0] cursor-pointer bg-seat-available"
          onClick={onClick}
        />
      );
    case SeatState.Selected:
      return (
        <span
          className="inline-block w-3 h-3 rounded-[12px_12px_0_0] cursor-pointer bg-seat-selected"
          onClick={onClick}
        />
      );
    case SeatState.Occupied:
      return (
        <span
          className="inline-block w-3 h-3 rounded-[12px_12px_0_0] cursor-pointer bg-seat-occupied"
          onClick={onClick}
        />
      );
    default:
      const _: never = state;
  }
};
