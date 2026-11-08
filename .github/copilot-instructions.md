# Instructies voor GitHub Copilot

Dit is de website **vursiesvanjan.nl**: liedjes in het Urker dialect,
geschreven, vertaald of hertaald door Jan Bakker. Statische site, gebouwd
met Astro, gepubliceerd via GitHub Pages.

## Belangrijkste regel

Een vursien is **één markdown-bestand** in `src/pages/vursies/`. Dat bestand
wordt automatisch een pagina op `/vursies/<bestandsnaam>/` en verschijnt
automatisch in het overzicht en op de voorpagina. Er hoeft nergens anders
iets aangepast of geregistreerd te worden.

## Bestandsnaam

Kleine letters, woorden met streepjes, geen apostrofs of accenten, altijd `.md`.
Voorbeeld: `Niet van 't karkien` wordt `niet-van-t-karkien.md`.

## Frontmatter

Elk liedbestand begint met deze velden. `layout` en `titel` zijn verplicht,
de rest mag leeg blijven — lege velden verdwijnen automatisch van de pagina.

```yaml
---
layout: ../../layouts/Liedje.astro
titel: "Niet van 't karkien"   # altijd tussen dubbele quotes
herkomst: eigen-werk           # eigen-werk | vertaling | hertaling
origineel:                     # originele titel, alleen bij vertaling/hertaling
schrijver:                     # oorspronkelijke schrijver/componist
melodie: "Eigen melodie"       # of bijv. "Melodie van Johnny Cash"
youtube: "ngdtyRYNIZs"         # alleen de video-id, niet de hele URL
pdf: "niet-van-t-karkien.pdf"  # bestandsnaam in public/pdf/
datum: 2026-11-07              # datum van toevoegen, voor "laatst toegevoegd"
---
```

De YouTube-id is het deel na `v=` in de URL:
`https://www.youtube.com/watch?v=ngdtyRYNIZs` → `ngdtyRYNIZs`.

## Inhoud van het bestand

Na de frontmatter: eerst een korte toelichting in gewone alinea's, daarna
een kop `## Tekst` met de liedtekst eronder.

- De kop `## Tekst` is functioneel, geen opsmuk: de stylesheet geeft alles
  **na** die kop `white-space: pre-line` (zie `.liedtekst h2 ~ p` in
  `global.css`). Daardoor blijven de regelafbrekingen van de liedtekst staan
  zoals getypt, terwijl de toelichting erboven als gewone lopende tekst
  doorloopt. Laat die kop dus staan en zet de liedtekst er altijd onder.
- Een **witregel** maakt een nieuw couplet.
- Cursief, bijvoorbeeld voor `*Refrein:*`, met sterretjes.
- Verzin nooit zelf liedteksten of toelichtingen. Zet `NOG IN TE VULLEN`
  als de tekst er nog niet is.

## Pdf's

Akkoordenbladen gaan in `public/pdf/`, met dezelfde naam als het
liedbestand. In de frontmatter staat alleen de bestandsnaam, niet het pad.

## Verder

- Alles in het Nederlands: veldnamen, klassenamen, teksten, commentaar.
- Opmaak hoort in `src/styles/global.css`; gebruik de kleurvariabelen
  bovenaan dat bestand, geen harde kleurcodes in componenten.
- Een liedje heet een **vursien** (enkelvoud), meervoud **vursies**.
  Gebruik die woorden in navigatie, koppen en knoppen; in uitleggende
  tekst voor bezoekers van buiten Urk mag "liedje" staan.
- `_template.md` is het voorbeeldbestand. Bestanden die met `_` beginnen
  worden door Astro genegeerd en worden dus geen pagina.
- Houd de site simpel: geen extra frameworks, geen trackers, geen cookies.
