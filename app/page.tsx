import { BookingSider } from "@/components/BookingSider/BookingSider";
import { BookingView } from "@/components/BookingView/BookingView";
import { title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <h1 className={title({ size: "sm" })}>购票</h1>
      <BookingSider />
      <BookingView />
    </section>
  );
}
