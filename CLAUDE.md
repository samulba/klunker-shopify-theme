# CLAUDE.md — Klunker Shopify Theme

Leitfaden für die Arbeit an diesem Repository. Bitte vor jeder Änderung lesen,
damit Stil und Struktur konsistent bleiben.

## Projekt

Shopify-Theme (Online Store 2.0) für die Modemarke **Klunker**.
Die gesamte Theme-Struktur liegt im **Repo-Root** (nicht in Unterordnern):
`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.

Standardsprache ist Deutsch (`locales/de.default.json`), Englisch als Zusatz
(`locales/en.json`). Beschriftungen im Theme-Editor sind bewusst auf Deutsch.

---

## Designrichtung — „Quiet Luxury“ / High Fashion

Das gestalterische Leitmotiv ist **reduziert, monochrom und teuer wirkend**.
Weniger ist mehr. Jede neue Section, jedes Snippet folgt diesen Regeln.

### Farben (streng monochrom, kein Bunt)

| Token            | Hex       | Verwendung                         |
| ---------------- | --------- | ---------------------------------- |
| Reinweiß         | `#FFFFFF` | Haupt-Hintergrund                  |
| Off-White        | `#F7F5F1` | Flächen, ruhige Sektionen          |
| Tiefschwarz      | `#0A0A0A` | Text, Linien, Buttons              |
| Greige/Champagner| `#C9BFB3` | dezenter Akzent, sehr sparsam      |

Die Werte sind in `config/settings_schema.json` als globale Einstellungen
hinterlegt und werden in `layout/theme.liquid` als CSS-Custom-Properties
(`--color-*`) ausgegeben. Niemals zusätzliche Farben einführen.

### Typografie

- **Headlines:** elegante Serif — **Cormorant Garamond** (per Google Fonts in
  `layout/theme.liquid` geladen). Alternative laut Briefing: Playfair Display.
- **Fließtext / UI:** schlanke Sans — **Inter**. Alternative: Jost.
- Große, ruhige Headlines. **Viel `letter-spacing`** bei Überschriften und
  Navigation (siehe `--nav-tracking`, einstellbar im Editor).
- Navigation und Buttons in **Großbuchstaben** mit weitem Buchstabenabstand.

### Layout

- **Sehr viel Weißraum**, großzügige vertikale Abstände (`--space-*`-Skala).
- **Dünne Hairline-Trennlinien** (`.hairline`, `--color-hairline`).
- **Keine Schatten, keine Verläufe.**
- **Keine runden Ecken** — maximal `2px` (`--radius`).
- Reduziert, editorial, „teuer“.

### Buttons

- Schlicht: **Outline** (dünne schwarze Linie) oder **Fläche** (Tiefschwarz).
- **Uppercase**, weiter Buchstabenabstand.
- Klassen: `.btn`, `.btn--solid`, `.btn--ghost`. Auf Bildern automatisch invertiert
  (`.hero--on-image`).

---

## Architektur & Konventionen

- **Design-System:** `assets/base.css`. Alle Tokens als CSS-Custom-Properties
  in `:root`; in `theme.liquid` aus den Theme-Einstellungen überschrieben.
- **Jede Section hat einen `{% schema %}`-Block**, damit Texte, Bilder, Farben
  (Farbschema-Select) und Buttons im Theme-Editor anpassbar sind. Das ist Pflicht.
- **Farbschemata** pro Section über die Klassen `.scheme-white`,
  `.scheme-offwhite`, `.scheme-black` (Setting `color_scheme`).
- **Wiederverwendung** über Snippets: `product-card`, `price`, `social-icons`.
- Liquid: defensive Defaults (`| default:`), `!= blank`-Prüfungen, sinnvolle
  Platzhalter (`placeholder_svg_tag`), wenn noch keine Inhalte verknüpft sind.
- Texte nach Möglichkeit über Section-Settings oder Locales (`| t`) — keine
  hartkodierten UI-Strings, die später nicht editierbar sind.

### Dateiübersicht

```
assets/      base.css (Design-System), global.js (Mobile-Nav)
config/      settings_schema.json (globale Einstellungen), settings_data.json
layout/      theme.liquid (Grundgerüst, Fonts, Tokens, Header)
locales/     de.default.json (Standard), en.json
sections/    header, hero, product-grid, footer   ← Startseite
             main-product, main-collection, main-cart, main-page,
             main-404, main-search                 ← Standard-Templates
snippets/    product-card, price, social-icons
templates/   index.json (Hero + Produkt-Grid + Footer),
             product/collection/cart/page/404/search.json
```

### Startseite

`templates/index.json` enthält laut Vorgabe genau drei Sections in dieser
Reihenfolge: **Hero → Produkt-Grid → Footer**. Der **Header** wird global in
`theme.liquid` eingebunden. Soll der **Footer** auf allen Seiten erscheinen,
kann er ebenfalls global per `{% section 'footer' %}` in `theme.liquid` oder als
Section-Group eingebunden werden (aktuell bewusst nur auf der Startseite).

---

## Do / Don't

- ✅ Monochrom bleiben, Weißraum großzügig, Hairlines statt Boxen.
- ✅ Neue Sections immer mit `{% schema %}`, `color_scheme`-Select und Defaults.
- ✅ Tokens aus `base.css` nutzen (keine Magic-Numbers, keine Inline-Hex-Farben).
- ❌ Keine Schatten, Verläufe, runden Ecken > 2px, keine bunten Akzente.
- ❌ Keine schweren JS-Frameworks — das Theme bleibt leichtgewichtig.

## Noch offen (Grundgerüst)

Bewusst noch nicht enthalten und bei Bedarf zu ergänzen: `templates/blog`,
`article`, `list-collections`, `gift_card`, `password` (+ `layout/password.liquid`)
sowie die `templates/customers/*`-Seiten.
