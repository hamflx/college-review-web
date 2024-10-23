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
  const { cols, rows } = layout;

  return (
    <div
      className={`grid gap-1`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows })
        .map((_, rowIndex) => {
          return Array.from({ length: cols }).map((_, index) => {
            const colIndex = index + columnOffset;
            const seatKey = rowIndex * cols + colIndex;
            const selectedSeat = selected.find(
              (s) => s.col === colIndex && s.row === rowIndex,
            );
            const state = selectedSeat?.state ?? SeatState.Available;

            return (
              <SeatItem
                key={seatKey}
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
          });
        })
        .flat()}
    </div>
  );
};
