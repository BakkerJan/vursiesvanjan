# Een vursien toevoegen

## In drie stappen

**1. Maak het bestand.**
Kopieer `src/pages/vursies/_template.md` naar een nieuw bestand in dezelfde
map. De bestandsnaam wordt het webadres, dus: kleine letters, streepjes in
plaats van spaties, geen apostrofs.

```
src/pages/vursies/niet-van-t-karkien.md   →   vursiesvanjan.nl/vursies/niet-van-t-karkien/
```

**2. Vul het in.**
Titel, herkomst en de liedtekst.

De opbouw van het bestand is altijd dezelfde, en die volgorde doet ertoe:

```
---            de frontmatter: titel, herkomst, youtube, pdf
---

               de toelichting: een paar zinnen over het liedje.
               Mag ook helemaal weg.

## Tekst       vanaf hier de liedtekst
```

Alles **boven** `## Tekst` loopt als gewone tekst door, zoals in een boek.
Alles **onder** die kop houdt de regelafbrekingen die jij typt. Daarom moet
de liedtekst er altijd onder staan, en de toelichting erboven. De YouTube-id is het stukje na `v=` in de
link naar je video. Heb je nog geen opname of pdf? Laat dat veld dan gewoon
leeg — die onderdelen verschijnen dan simpelweg niet op de pagina. Je kunt
ze later bijwerken.

Heb je een akkoordenblad? Zet de pdf in `public/pdf/` en vul de bestandsnaam
in bij `pdf:`.

**3. Zet het online.**

```bash
git add . && git commit -m "Liedje toegevoegd: Niet van 't karkien" && git push
```

Daarna bouwt GitHub de site automatisch. Na een minuutje staat hij op
vursiesvanjan.nl. Je hoeft niets te publiceren of te uploaden.

## De site lokaal bekijken

```bash
npm run dev
```

Open daarna http://localhost:4321. Je ziet elke wijziging direct terwijl je
typt. Stoppen met `Ctrl+C`.

## Over de liedtekst

Regels blijven staan zoals je ze typt — je hoeft niks te doen om een
regelafbreking te krijgen. Een witregel maakt een nieuw couplet. Wil je een
regel cursief, zoals `*Refrein:*`, zet er dan sterretjes om.

## Waar staat wat

| Wat | Waar |
| --- | --- |
| De vursies | `src/pages/vursies/*.md` |
| Voorbeeldbestand | `src/pages/vursies/_template.md` |
| Pdf's met akkoorden | `public/pdf/` |
| Tekst van de over-pagina | `src/pages/over-jan-bakker.astro` |
| Voorpagina | `src/pages/index.astro` |
| Kleuren en opmaak | `src/styles/global.css` |
| Opmaak liedjespagina | `src/layouts/Liedje.astro` |

## Copilot

In `.github/copilot-instructions.md` staan de afspraken van dit project.
Copilot in VS Code leest dat bestand automatisch en vult een nieuw
liedbestand daardoor grotendeels zelf aan.
