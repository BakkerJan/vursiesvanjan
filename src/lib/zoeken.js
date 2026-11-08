/**
 * Krulletjes naar rechte tekens en alles klein, zodat "m'n" ook "m’n"
 * vindt. Wordt zowel bij het bouwen als in de browser gebruikt.
 */
export function normaliseer(tekst) {
  return String(tekst)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase();
}
