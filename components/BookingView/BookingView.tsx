"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { produce } from "immer";

import { SeatView } from "../SeatView/SeatView";
import { OccupiedSeat } from "../SeatView/types";

import { fakeMovieList } from "./movieData";
import { MovieModel, PlayingTimeNames } from "./types";
import { BookingStats } from "./BookingStats";

import { useLocalStorage } from "@/hooks/storage";
import { StorageKeyMovies } from "@/constants/storageKeys";

/**
 * 电影票预定页面，选择人员、电影、座位。
 */
export const BookingView = () => {
  const [movieList, setMovieList] = useLocalStorage<MovieModel[]>(
    StorageKeyMovies,
    fakeMovieList,
  );

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedMoviePlayingTime, setSelectedMoviePlayingTime] = useState<
    string | null
  >(null);
  const selectedMovie = movieList.find((m) => m.id === selectedMovieId) ?? null;
  const selectedMoviePlaying = selectedMoviePlayingTime
    ? (selectedMovie?.plays?.find((p) => p.time === selectedMoviePlayingTime) ??
      null)
    : null;
  const allSeats =
    selectedMoviePlaying?.seatsLayout.map((l) => l.seats).flat() || [];

  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const availablePrices =
    selectedMovie?.price && allSeats
      ? [...new Set(allSeats.map((s) => s.factor) ?? [])].map(
          (f) => f * selectedMovie.price,
        )
      : [];
  const notAvailableSeats =
    selectedMovie?.price && selectedPrice
      ? allSeats.filter((s) => s.factor * selectedMovie.price === selectedPrice)
      : [];

  const updateOccupiedSeats = (seats: OccupiedSeat[]) => {
    if (!selectedMovieId) return;
    if (!selectedMoviePlayingTime) return;

    const newMovieList = produce(movieList, (draft) => {
      const movie = draft.find((m) => m.id === selectedMovieId);

      if (!movie) return;
      const play = movie.plays?.find(
        (p) => p.time === selectedMoviePlayingTime,
      );

      if (!play) return;
      play.occupiedSeats = seats;
    });

    setMovieList(newMovieList);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <Select
          className="w-[300px]"
          label="选择一个电影"
          selectedKeys={selectedMovieId ? [selectedMovieId] : []}
          onSelectionChange={(value) => {
            const movie = value.currentKey
              ? (movieList.find((m) => m.id === value.currentKey) ?? null)
              : null;

            setSelectedMovieId(movie?.id ?? null);

            const playingNotExists =
              selectedMoviePlayingTime &&
              movie &&
              !movie.plays?.some((p) => p.time === selectedMoviePlayingTime);

            if (playingNotExists) {
              setSelectedMoviePlayingTime(null);
            }
          }}
        >
          {movieList.map((movie) => (
            <SelectItem key={movie.id}>{movie.name}</SelectItem>
          ))}
        </Select>

        {selectedMovieId && (
          <Select
            className="w-[300px]"
            label="选择放映场次"
            selectedKeys={
              selectedMoviePlayingTime ? [selectedMoviePlayingTime] : []
            }
            onSelectionChange={(value) => {
              const play = value.currentKey
                ? (selectedMovie?.plays?.find(
                    (p) => p.time === value.currentKey,
                  ) ?? null)
                : null;

              setSelectedMoviePlayingTime(play?.time ?? null);
            }}
          >
            {(selectedMovie?.plays || []).map((play) => (
              <SelectItem key={play.time}>
                {PlayingTimeNames[play.time]}
              </SelectItem>
            ))}
          </Select>
        )}

        {selectedMovie && selectedMoviePlaying && (
          <Select
            className="w-[300px]"
            label="选择票价"
            selectedKeys={selectedPrice ? [`${selectedPrice}`] : []}
            onSelectionChange={(value) => {
              setSelectedPrice(value.currentKey ? +value.currentKey : null);
            }}
          >
            {availablePrices.map((price) => (
              <SelectItem key={`${price}`} textValue={`$${price}`}>
                ${price}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>

      {/* 座位选择视图。 */}
      {selectedMovie && selectedMoviePlaying && (
        <SeatView
          layouts={selectedMoviePlaying.seatsLayout}
          notAvailableSeats={notAvailableSeats}
          occupiedSeats={selectedMoviePlaying.occupiedSeats}
          updateOccupiedSeats={updateOccupiedSeats}
        />
      )}

      {/* 剩余座位、用户预定的座位实时展示。 */}
      {selectedMovie && selectedMoviePlaying && (
        <BookingStats
          layouts={selectedMoviePlaying.seatsLayout}
          movie={selectedMovie}
          occupiedSeats={selectedMoviePlaying.occupiedSeats}
        />
      )}
    </div>
  );
};
