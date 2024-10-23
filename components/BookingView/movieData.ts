import { SeatAreaLayout, SeatItemInfo } from "../SeatView/types";

import { MovieModel, PlayingTime } from "./types";

export const fakeMovieList: MovieModel[] = [
  {
    name: "Endgame",
    id: "1",
    price: 10,
    plays: [
      {
        time: PlayingTime.Moring,
        seatsLayout: fixColumnOffset([
          buildLayout(6, 2),
          buildLayout(7, 4, { startRow: 0, endRow: 2, factor: 1.5 }),
          buildLayout(6, 2),
        ]),
        occupiedSeats: [],
      },
      {
        time: PlayingTime.Evening,
        seatsLayout: fixColumnOffset([
          buildLayout(8, 2),
          buildLayout(8, 4, { startRow: 0, endRow: 2, factor: 1.5 }),
          buildLayout(8, 2),
        ]),
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
        seatsLayout: fixColumnOffset([
          buildLayout(6, 2),
          buildLayout(6, 4, { startRow: 0, endRow: 2, factor: 1.5 }),
          buildLayout(6, 2),
        ]),
        occupiedSeats: [],
      },
      {
        time: PlayingTime.Afternoon,
        seatsLayout: fixColumnOffset([
          buildLayout(6, 2),
          buildLayout(6, 4, { startRow: 0, endRow: 2, factor: 1.5 }),
          buildLayout(6, 2),
        ]),
        occupiedSeats: [],
      },
    ],
  },
  { name: "Toy Story", id: "3", price: 8 },
];

/**
 * 指定一个区域的价格系数，暂时简单点做，不检查列。
 */
interface AreaPriceFactor {
  startRow: number;
  endRow: number;
  factor: number;
}

/**
 * 每个 layout 内的列索引都从 0 开始索引，这不便于我们索引座位位置，因此将其统一编码。
 */
function fixColumnOffset(layouts: SeatAreaLayout[]): SeatAreaLayout[] {
  return layouts.map((layout, index) => {
    const columnOffset = layouts
      .slice(0, index)
      .reduce((columnCount, item) => columnCount + item.cols, 0);

    return {
      ...layout,
      seats: layout.seats.map((s) => {
        return { ...s, col: s.col + columnOffset };
      }),
    };
  });
}

function buildLayout(
  rows: number,
  cols: number,
  areaFactor?: AreaPriceFactor,
): SeatAreaLayout {
  return {
    cols,
    seats: Array.from({ length: rows * cols }).map((_, index) => {
      const rowIndex = Math.floor(index / cols);
      const colIndex = index % cols;
      const factor =
        areaFactor &&
        rowIndex >= areaFactor.startRow &&
        rowIndex < areaFactor.endRow
          ? areaFactor.factor
          : 1;

      return { factor, col: colIndex, row: rowIndex } satisfies SeatItemInfo;
    }),
  };
}
