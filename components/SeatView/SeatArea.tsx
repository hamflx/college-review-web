import { SeatItem } from "./SeatItem";
import { SeatAreaLayout, SeatItemState, SeatState } from "./types";

export interface SeatAreaProps {
  layout: SeatAreaLayout;
  selected: SeatItemState[];
  /**
   * 列的起始偏移。
   */
  columnOffset: number;
  onClick?: (seat: SeatItemState) => void;
}

export const SeatArea = ({
  layout,
  selected,
  columnOffset,
  onClick,
}: SeatAreaProps) => {
  const { cols, seats } = layout;

  return (
    <div
      className={`grid gap-1`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {seats.map((_, seatIndex) => {
        const colIndexInThisLayout = seatIndex % cols;
        const rowIndex = Math.floor(seatIndex / cols);
        const colIndex = colIndexInThisLayout + columnOffset;
        const selectedSeat = selected.find(
          (s) => s.col === colIndex && s.row === rowIndex,
        );
        const state = selectedSeat?.state ?? SeatState.Available;

        return (
          <SeatItem
            key={seatIndex}
            state={state}
            onClick={
              onClick
                ? () =>
                    onClick({
                      col: colIndex,
                      row: rowIndex,
                      state,
                    })
                : undefined
            }
          />
        );
      })}
    </div>
  );
};
