import { SeatItem } from "./SeatItem";
import { SeatState } from "./types";

export const SeatLegend = () => {
  return (
    <div className="flex gap-3">
      <div className="space-x-1">
        <SeatItem state={SeatState.NotAvailable} />
        <span>不可用</span>
      </div>
      <div className="space-x-1">
        <SeatItem state={SeatState.Available} />
        <span>可用</span>
      </div>
      <div className="space-x-1">
        <SeatItem state={SeatState.Selected} />
        <span>我选择的</span>
      </div>
      <div className="space-x-1">
        <SeatItem state={SeatState.Occupied} />
        <span>已占用</span>
      </div>
    </div>
  );
};
