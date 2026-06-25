# CLAUDE.md — Klunker Shopify Theme

Leitfaden für die Arbeit an diesem Repository. Bitte vor jeder Änderung lesen,
damit Stil und Struktur konsistent bleiben.

## Projekt

Shopify-Theme (Online Store 2.0) für **Klunker** — eine **Schmuckmarke** mit
dem Kern-USP **Custom-Schmuck auf Anfrage**: jedes Stück wird nach Kundenentwurf
gefertigt. **Für alle und alles** — nicht nur Frauenschmuck, sondern Ringe,
Siegelringe, Ketten, Ohrschmuck, Eheringe, Unikate … Diese Botschaft trägt die
Startseite: ein großes Custom-Statement (`custom-list`), die Prozess-Sektion
(`bespoke`), die Ansprache in „du"-Form und ein dauerhaft sichtbarer
„Custom anfragen"-Button (schwebend, global in `theme.liquid`).
Tonalität: modern, inklusiv, ohne Schubladen.

Die gesamte Theme-Struktur liegt im **Repo-Root**: `assets/`, `config/`,
`layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.

Standardsprache ist Deutsch (`locales/de.default.json`), Englisch als Zusatz
(`locales/en.json`). Editor-Beschriftungen sind bewusst auf Deutsch.

---

## Designrichtung — „Quiet Luxury" / High Fashion (Schmuck)

Reduziert, monochrom und teuer wirkend — aber **nicht leer**: dichte, kuratierte
Editorial-Strecke mit ruhiger Bewegung. Die warme Champagner-/Greige-Palette
harmoniert mit der Goldschmuck-Fotografie.

### Farben (streng monochrom, kein Bunt)

| Token             | Hex       | Verwendung                       |
| ----------------- | --------- | -------------------------------- |
| Reinweiß          | `#FFFFFF` | Haupt-Hintergrund                |
| Off-White         | `#F7F5F1` | Flächen, ruhige Sektionen        |
| Tiefschwarz       | `#0A0A0A` | Text, Linien, dunkle Bänder      |
| Greige/Champagner | `#C9BFB3` | dezenter Akzent (Nummern, Dots)  |

Werte liegen global in `config/settings_schema.json` und werden in
`layout/theme.liquid` als CSS-Custom-Properties (`--color-*`) ausgegeben.

### Typografie
- **Headlines:** Cormorant Garamond (Serif, per Google Fonts geladen). Groß,
  ruhig, mit negativem Tracking bei XXL-Größen.
- **Text / UI:** Inter (Sans). Navigation & Buttons in Großbuchstaben mit weitem
  `letter-spacing`.

### Layout & Details
- Viel — aber **kuratierter** — Weißraum, großzügige Abstände (`--space-*`).
- Dünne **Hairline-Linien**, **keine Schatten**, **max. 2px Radius**.
- Subtile Scrims (sanfte Verläufe) **nur zur Lesbarkeit über Bildern**
  (Hero, Kacheln) — sonst keine dekorativen Verläufe.

### Bewegung (ruhig, langsam, `--ease`)
- **Scroll-Reveal:** Elemente mit Klasse `.reveal` blenden beim Scrollen ein
  (IntersectionObserver in `global.js`). Nur aktiv bei vorhandenem JS (`html.js`),
  `prefers-reduced-motion` wird respektiert.
- **Hero:** langsamer Ken-Burns-Zoom + Scroll-Hinweis.
- **Lauftext** (`marquee`), **Hover-Zoom** auf Bildern, **zweites Produktbild**
  beim Hover, animierte Unterstreichungen, schrumpfender Sticky-Header.

### Buttons
- `.btn` (Outline) / `.btn--solid` (Fläche) / `.btn--ghost` (Textlink mit Linie).
- Uppercase, weiter Buchstabenabstand; Füllung schiebt sich beim Hover herein.

---

## Bilder

Sechs mitgelieferte Schmuck-Motive in `assets/` (vom Kunden bereitgestellt):

| Datei                    | Motiv                         | Einsatz                          |
| ------------------------ | ----------------------------- | -------------------------------- |
| `klunker-hero.png`       | Halskette auf Stein (quer)    | Hero, 4. Produktkarte            |
| `klunker-portrait.png`   | Model mit Halskette           | Kategorie „Halsketten"           |
| `klunker-ring.png`       | Solitär-Ring                  | Kategorie „Ringe", Produktkarte  |
| `klunker-earring.png`    | Diamant-Ohrhänger (weiß)      | Kategorie „Ohrringe", Produktk.  |
| `klunker-bangles.png`    | Armreife auf Stein            | „Bild mit Text" (Material)       |
| `klunker-atelier.png`    | Schmucketui am Fenster        | „Maßanfertigung" (bespoke)       |

**Wichtig:** Shopify liefert nur Dateien aus `assets/` aus. Bildsektionen nutzen
ein `image_picker`-Feld (Merchant-Upload) **mit Asset-Fallback** über das Snippet
`responsive-image`. Ohne eigenes Bild erscheint das passende mitgelieferte Motiv.
Die PNGs sind groß (~1–2 MB) — bei echten Produkten ggf. optimieren/als WebP.

---

## Architektur & Konventionen

- **Design-System:** `assets/base.css` (alle Tokens, Komponenten, Motion).
- **Jede Section hat einen `{% schema %}`-Block** → Texte, Bilder, Farben
  (`color_scheme`-Select) im Theme-Editor anpassbar. Pflicht.
- **Farbschemata** pro Section: `.scheme-white`, `.scheme-offwhite`, `.scheme-black`.
- **Snippets:** `responsive-image` (Bild + Asset-Fallback), `product-card`
  (Produkt / kuratierte Karte / Platzhalter), `price`, `social-icons`.
- Defensive Liquid-Defaults (`| default:`, `!= blank`), sinnvolle Platzhalter.

### Dateiübersicht (Sections)

```
Global (in theme.liquid):  announcement-bar, header, schwebender Custom-CTA
Startseite (index.json):   hero · marquee · custom-list · collection-list ·
                           product-grid · image-with-text · bespoke ·
                           statement · newsletter · footer
Standard-Templates:        main-product · main-collection · main-cart ·
                           main-page · main-404 · main-search
```

### Startseite (`templates/index.json`)
Reihenfolge: Hero → Lauftext → **Custom-Statement** → Kategorien → Produkt-Grid →
Bild-mit-Text → **Maßanfertigung** → Statement → Newsletter → Footer. Header &
Ankündigungsleiste sind global in `theme.liquid`, ebenso der schwebende
„Custom anfragen"-Button (steuerbar unter Theme-Einstellungen → „Custom-Anfrage").
Der Footer wird (wie ursprünglich vorgegeben) als Section in `index.json` gepflegt.

Das **Custom-Statement** (`custom-list`, schwarz) ist der WOW-/Botschafts-Moment:
große Cormorant-Typo mit kursivem Akzentwort und einer Hover-Liste der
fertigbaren Stücke — bewusst breit (Siegelringe, Eheringe, Unisex, Unikate).

---

## Do / Don't
- ✅ Monochrom bleiben; Dichte durch Inhalt & Rhythmus, nicht durch Farbe.
- ✅ Neue Sections mit `{% schema %}`, `color_scheme`, `.reveal` + Defaults.
- ✅ Bilder über `responsive-image` mit Asset-Fallback einbinden.
- ✅ Maßanfertigung/Bespoke als Verkaufsargument sichtbar halten.
- ❌ Keine Schatten, dekorativen Verläufe, runden Ecken > 2px, bunten Akzente.
- ❌ Keine schweren JS-Frameworks — Theme bleibt leichtgewichtig (Vanilla JS).

## Noch offen (Grundgerüst)
Bei Bedarf ergänzen: `templates/blog`, `article`, `list-collections`,
`gift_card`, `password` (+ `layout/password.liquid`), `templates/customers/*`,
sowie eine dedizierte „Maßanfertigung"-Seite mit Anfrageformular.
