/**
 * Keyword-based mood → genre key (maps to GENRE_MAP / TMDb ids).
 * Order matters: first matching branch wins.
 * @param {string} text
 * @returns {string} genre key for `getGenreId` in `genres.js`
 */
export function detectMoodToGenre(text) {
  const raw = (text || '').toLowerCase().trim();
  if (!raw) return 'drama';

  // COMEDY
  if (
    raw.includes('funny') ||
    raw.includes('laugh') ||
    raw.includes('lol') ||
    raw.includes('lmao') ||
    raw.includes('fun') ||
    raw.includes('silly') ||
    raw.includes('goofy') ||
    raw.includes('light') ||
    raw.includes('cheerful')
  ) {
    return 'comedy';
  }

  // ACTION
  if (
    raw.includes('action') ||
    raw.includes('fight') ||
    raw.includes('battle') ||
    raw.includes('war') ||
    raw.includes('explosive') ||
    raw.includes('fast') ||
    raw.includes('intense') ||
    raw.includes('adrenaline') ||
    raw.includes('hype') ||
    raw.includes('thrill ride')
  ) {
    return 'action';
  }

  // THRILLER
  if (
    raw.includes('thrill') ||
    raw.includes('suspense') ||
    raw.includes('edge') ||
    raw.includes('tense') ||
    raw.includes('nervous') ||
    raw.includes('gripping') ||
    raw.includes('dark twist') ||
    raw.includes('unexpected')
  ) {
    return 'thriller';
  }

  // MYSTERY
  if (
    raw.includes('mystery') ||
    raw.includes('detective') ||
    raw.includes('clue') ||
    raw.includes('investigation') ||
    raw.includes('who did it') ||
    raw.includes('solve') ||
    raw.includes('case')
  ) {
    return 'mystery';
  }

  // HORROR
  if (
    raw.includes('scary') ||
    raw.includes('horror') ||
    raw.includes('fear') ||
    raw.includes('creepy') ||
    raw.includes('ghost') ||
    raw.includes('haunted') ||
    raw.includes('terrifying') ||
    raw.includes('jump scare')
  ) {
    return 'horror';
  }

  // ROMANCE
  if (
    raw.includes('love') ||
    raw.includes('romantic') ||
    raw.includes('relationship') ||
    raw.includes('crush') ||
    raw.includes('date') ||
    raw.includes('heart')
  ) {
    return 'romance';
  }

  // DRAMA
  if (
    raw.includes('sad') ||
    raw.includes('lonely') ||
    raw.includes('emotional') ||
    raw.includes('cry') ||
    raw.includes('tear') ||
    raw.includes('deep') ||
    raw.includes('serious')
  ) {
    return 'drama';
  }

  // FEEL-GOOD / COMFORT
  if (
    raw.includes('relax') ||
    raw.includes('chill') ||
    raw.includes('comfort') ||
    raw.includes('feel good') ||
    raw.includes('warm') ||
    raw.includes('cozy') ||
    raw.includes('peaceful')
  ) {
    return 'feel-good';
  }

  // FANTASY
  if (
    raw.includes('magic') ||
    raw.includes('fantasy') ||
    raw.includes('dragon') ||
    raw.includes('kingdom') ||
    raw.includes('myth') ||
    raw.includes('supernatural world')
  ) {
    return 'fantasy';
  }

  // SCI-FI
  if (
    raw.includes('space') ||
    raw.includes('future') ||
    raw.includes('technology') ||
    raw.includes('ai') ||
    raw.includes('robot') ||
    raw.includes('alien') ||
    raw.includes('sci-fi')
  ) {
    return 'sci-fi';
  }

  // ADVENTURE
  if (
    raw.includes('adventure') ||
    raw.includes('journey') ||
    raw.includes('explore') ||
    raw.includes('quest') ||
    raw.includes('travel') ||
    raw.includes('treasure')
  ) {
    return 'adventure';
  }

  // CRIME
  if (
    raw.includes('crime') ||
    raw.includes('gang') ||
    raw.includes('mafia') ||
    raw.includes('heist') ||
    raw.includes('robbery') ||
    raw.includes('underworld')
  ) {
    return 'crime';
  }

  // DOCUMENTARY
  if (
    raw.includes('learn') ||
    raw.includes('real') ||
    raw.includes('true story') ||
    raw.includes('documentary') ||
    raw.includes('facts') ||
    raw.includes('history')
  ) {
    return 'documentary';
  }

  // BIOPIC
  if (
    raw.includes('biography') ||
    raw.includes('biopic') ||
    raw.includes('real person') ||
    raw.includes('life story')
  ) {
    return 'biography';
  }

  // ANIMATION
  if (
    raw.includes('animated') ||
    raw.includes('cartoon') ||
    raw.includes('anime') ||
    raw.includes('pixar') ||
    raw.includes('kids')
  ) {
    return 'animation';
  }

  // FAMILY
  if (
    raw.includes('family') ||
    raw.includes('kids') ||
    raw.includes('wholesome') ||
    raw.includes('all ages')
  ) {
    return 'family';
  }

  // ROM-COM
  if (
    raw.includes('romcom') ||
    raw.includes('rom-com') ||
    (raw.includes('love') && raw.includes('funny'))
  ) {
    return 'romantic comedy';
  }

  // DARK
  if (
    raw.includes('dark') ||
    raw.includes('disturbing') ||
    raw.includes('twisted') ||
    raw.includes('gritty')
  ) {
    return 'dark';
  }

  // PSYCHOLOGICAL
  if (
    raw.includes('mind') ||
    raw.includes('psychological') ||
    raw.includes('brain') ||
    raw.includes('complex') ||
    raw.includes('thought')
  ) {
    return 'psychological';
  }

  // SUPERHERO
  if (
    raw.includes('superhero') ||
    raw.includes('marvel') ||
    raw.includes('dc') ||
    raw.includes('powers') ||
    raw.includes('hero') ||
    raw.includes('villain')
  ) {
    return 'superhero';
  }

  // SLICE OF LIFE
  if (
    raw.includes('daily life') ||
    raw.includes('realistic') ||
    raw.includes('slow') ||
    raw.includes('life') ||
    raw.includes('ordinary')
  ) {
    return 'slice-of-life';
  }

  // SPORTS
  if (
    raw.includes('sports') ||
    raw.includes('football') ||
    raw.includes('cricket') ||
    raw.includes('match') ||
    raw.includes('team') ||
    raw.includes('tournament')
  ) {
    return 'sports';
  }

  // MUSICAL
  if (
    raw.includes('music') ||
    raw.includes('songs') ||
    raw.includes('dance') ||
    raw.includes('musical')
  ) {
    return 'musical';
  }

  // WAR
  if (
    raw.includes('army') ||
    raw.includes('war') ||
    raw.includes('soldier') ||
    raw.includes('battlefield')
  ) {
    return 'war';
  }

  // HISTORICAL
  if (
    raw.includes('history') ||
    raw.includes('period') ||
    raw.includes('ancient') ||
    raw.includes('past') ||
    raw.includes('king')
  ) {
    return 'historical';
  }

  // WESTERN
  if (
    raw.includes('cowboy') ||
    raw.includes('wild west') ||
    raw.includes('gunslinger')
  ) {
    return 'western';
  }

  // NOIR
  if (
    raw.includes('noir') ||
    raw.includes('detective dark') ||
    raw.includes('black and white crime')
  ) {
    return 'noir';
  }

  // SATIRE
  if (
    raw.includes('satire') ||
    raw.includes('parody') ||
    raw.includes('mock')
  ) {
    return 'satire';
  }

  // TEEN
  if (
    raw.includes('teen') ||
    raw.includes('high school') ||
    raw.includes('college') ||
    raw.includes('youth')
  ) {
    return 'teen';
  }

  // SURVIVAL
  if (
    raw.includes('survive') ||
    raw.includes('survival') ||
    raw.includes('alone') ||
    raw.includes('island') ||
    raw.includes('disaster')
  ) {
    return 'survival';
  }

  // DISASTER
  if (
    raw.includes('earthquake') ||
    raw.includes('tsunami') ||
    raw.includes('apocalypse') ||
    raw.includes('end of world')
  ) {
    return 'disaster';
  }

  // ZOMBIE
  if (
    raw.includes('zombie') ||
    raw.includes('undead') ||
    raw.includes('infection')
  ) {
    return 'zombie';
  }

  return 'drama';
}
