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

### Bewegung — spürbar, aber kultiviert (`global.js`, `--ease`)
Bewusst lebendig (nicht „brav"), `prefers-reduced-motion` wird überall respektiert,
Effekte greifen nur bei vorhandenem JS (`html.js`):
- **Scroll-Fortschritt:** dünne Gold-Linie oben (`.scroll-progress`, `[data-progress]`).
- **Hero-Headline:** Wörter steigen aus einer Maske ein (`.hero__title--animated`,
  in `hero.liquid` per `split` in `.word`-Spans zerlegt).
- **Parallax:** Hero- und Editorial-Bilder bewegen sich beim Scrollen langsamer
  (JS setzt `transform` auf `.hero__media img`, `.editorial__media img`; Bilder sind
  dafür leicht überskaliert — deshalb dort **kein** zusätzlicher Hover-Zoom).
- **Zähler:** `[data-count]` zählt beim Reinscrollen hoch (Sektion `stats`).
- **Magnetische Buttons:** `.btn--solid` und der schwebende CTA folgen leicht dem
  Cursor (nur bei `hover: hover`).
- Außerdem: **Scroll-Reveal** (`.reveal`), **Lauftext** (`marquee`), **zweites
  Produktbild** beim Hover, animierte Unterstreichungen, schrumpfender Sticky-Header.

### Buttons
- `.btn` (Outline) / `.btn--solid` (Fläche) / `.btn--ghost` (Textlink mit Linie).
- Uppercase, weiter Buchstabenabstand; Füllung schiebt sich beim Hover herein.

---

## Bilder

Mitgelieferte Schmuck-Motive in `assets/` (vom Kunden bereitgestellt). Aktuelle
Primär-Platzierungen:

| Datei                   | Motiv                              | Einsatz                         |
| ----------------------- | ---------------------------------- | ------------------------------- |
| `klunker-ring-dark.png` | Diamantring auf Schiefer (dunkel)  | **Hero**                        |
| `klunker-sk1…sk4.png`   | Skizze · Stein · Werkbank · Unikat | **Scrollytelling** (Kapitel)    |
| `klunker-bespoke.png`   | Ring im Etui + Skizze (Marmor)     | **Maßanfertigung** (bespoke)    |
| `klunker-solitaire.png` | Solitär-Verlobungsring (weiß)      | Kategorie „Ringe", Produktkarte |
| `klunker-signet.png`    | Siegelring + Gliederarmband        | Kategorie „Siegelringe", Produkt (Unisex!) |
| `klunker-portrait.png`  | Model mit Halskette                | Kategorie „Ketten"              |
| `klunker-earring.png`   | Diamant-Ohrhänger                  | Produktkarte                    |
| `klunker-ring.png`      | Solitär auf Seide                  | Produktkarte                    |
| `klunker-bangles.png`   | Armreife auf Stein                 | „Bild mit Text" (Material)      |
| `klunker-craft / -diamonds / -atelier / -hero` | weitere Motive  | Reserve / Editor-Auswahl        |

**Wichtig:** Shopify liefert nur Dateien aus `assets/` aus. Bildsektionen nutzen
ein `image_picker`-Feld (Merchant-Upload) **mit Asset-Fallback** über das Snippet
`responsive-image` (Scrollytelling-Kapitel fallen auf `klunker-sk{n}.png` zurück).
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
                           product-grid · image-with-text · scrollytelling ·
                           bespoke · stats · statement · newsletter · footer
Standard-Templates:        main-product · main-collection · main-cart ·
                           main-page · main-404 · main-search
```

### Startseite (`templates/index.json`)
Reihenfolge: Hero → Lauftext → **Custom-Statement** → Kategorien → Produkt-Grid →
Bild-mit-Text → **Scrollytelling** → **Maßanfertigung** → **Zahlen/Stats** →
Statement → Newsletter → Footer.

Die **Scrollytelling-Sektion** (`scrollytelling`, schwarz, gepinnt) erzählt
„Vom Entwurf zum Unikat" in Kapiteln (sk1–sk4: Skizze → Stein → Werkbank →
fertiges Stück). Beim Scrollen blenden Bild und Text kapitelweise um; `global.js`
berechnet den Fortschritt aus der Live-Position der Section (`updateScrolly`).
Ohne JS/`prefers-reduced-motion`: erstes Kapitel statisch, keine Pinnung. Header &
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
