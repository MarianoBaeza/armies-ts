export enum Civilization {
  Chinese = "Chinese",
  English = "English",
  Byzantine = "Byzantine",
}

export const INITIAL_COUNTS: Record<
  Civilization,
  { pikemen: number; archers: number; knights: number }
> = {
  [Civilization.Chinese]: { pikemen: 2, archers: 25, knights: 2 },
  [Civilization.English]: { pikemen: 10, archers: 10, knights: 10 },
  [Civilization.Byzantine]: { pikemen: 5, archers: 8, knights: 15 },
};
