/** TMDb genre ids — every key returned by `detectMoodToGenre` must resolve here. */
export const GENRE_MAP = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  horror: 27,
  mystery: 9648,
  romance: 10749,
  'sci-fi': 878,
  thriller: 53,
  'feel-good': 35,
  biography: 18,
  'romantic comedy': 10749,
  dark: 53,
  psychological: 53,
  superhero: 28,
  'slice-of-life': 18,
  sports: 18,
  musical: 10402,
  war: 10752,
  historical: 36,
  western: 37,
  noir: 80,
  satire: 35,
  teen: 18,
  survival: 12,
  disaster: 53,
  zombie: 27,
};

export function getGenreId(genreKey) {
  return GENRE_MAP[genreKey] ?? GENRE_MAP.drama;
}
