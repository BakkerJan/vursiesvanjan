import { normaliseer } from './zoeken.js';

// Leest alle vursies in src/pages/vursies/*.md en levert een nette lijst.
// Bestanden die met _ beginnen (zoals _template.md) worden overgeslagen.

const modules = import.meta.glob('../pages/vursies/*.md', { eager: true });
const ruweTekst = import.meta.glob('../pages/vursies/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/** De hele toelichting en liedtekst, klaar om in te zoeken. */
function zoekbareTekst(ruw) {
  if (typeof ruw !== 'string') return '';
  return normaliseer(
    ruw
      .replace(/^---[\s\S]*?\n---\n/, '')   // frontmatter eraf
      .replace(/<!--[\s\S]*?-->/g, ' ')      // verborgen notities eraf
      .replace(/^##\s+.*$/gm, ' ')            // kopjes als "## Tekst" eraf
      .replace(/[*_`#]/g, '')                 // opmaaktekens eraf
      .replace(/\s+/g, ' ')                   // alles op één regel
      .trim()
  );
}

function bestandsnaam(pad) {
  return pad.split('/').pop() ?? '';
}

export const liedjes = Object.entries(modules)
  .filter(([pad]) => !bestandsnaam(pad).startsWith('_'))
  .map(([pad, mod]) => {
    const fm = mod.frontmatter ?? {};
    const ruw = ruweTekst[pad];
    return {
      titel: fm.titel ?? bestandsnaam(pad).replace(/\.md$/, ''),
      url: mod.url ?? `/vursies/${bestandsnaam(pad).replace(/\.md$/, '')}/`,
      herkomst: fm.herkomst ?? '',
      origineel: fm.origineel ?? '',
      schrijver: fm.schrijver ?? '',
      melodie: fm.melodie ?? '',
      youtube: fm.youtube ?? '',
      pdf: fm.pdf ?? '',
      // Een vursien heeft pas tekst als de kop "## Tekst" er staat; bij een
      // nieuwe opname zonder tekst ontbreekt die nog.
      heeftTekst: typeof ruw === 'string' && /^##\s+Tekst\s*$/m.test(ruw),
      heeftVideo: Boolean(fm.youtube),
      heeftPdf: Boolean(fm.pdf),
      datum: fm.datum ? new Date(fm.datum).getTime() : 0,
      zoektekst: zoekbareTekst(ruw),
    };
  });

/** Sorteersleutel: leestekens en lidwoorden vooraan tellen niet mee, zodat
 *  "’t Briefien" bij de B staat en niet bovenaan bij de apostrof. */
function sorteersleutel(titel) {
  return titel
    .replace(/^(’t|'t|de|het|een)\s+/i, '')
    .replace(/^[^\p{L}]+/u, '')
    .toLowerCase();
}

export const opTitel = [...liedjes].sort((a, b) =>
  sorteersleutel(a.titel).localeCompare(sorteersleutel(b.titel), 'nl', {
    sensitivity: 'base',
  })
);

export const opDatum = [...liedjes].sort((a, b) => b.datum - a.datum);
