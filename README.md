# Klunker — Shopify Theme

Shopify-Theme (Online Store 2.0) für **Klunker**, eine Marke für handgefertigten
**Feinschmuck** mit **Maßanfertigung auf Anfrage**. Designrichtung:
**Quiet Luxury** — streng monochrom (Weiß / Off-White / Schwarz / Champagner-
Akzent), elegante Serif-Headlines, schlanke Sans, viel Weißraum, dünne Hairlines
und ruhige Scroll-Animationen.

## Struktur

```
assets/      base.css, global.js, klunker-*.png (6 Schmuck-Motive)
config/      settings_schema.json, settings_data.json
layout/      theme.liquid
locales/     de.default.json, en.json
sections/    announcement-bar, header, hero, marquee, collection-list,
             product-grid, image-with-text, bespoke, statement, newsletter,
             footer, main-*
snippets/    responsive-image, product-card, price, social-icons
templates/   index.json, product/collection/cart/page/404/search.json
```

Die Startseite (`templates/index.json`) ist eine durchgestaltete Editorial-
Strecke: **Hero → Lauftext → Kategorien → Neuheiten → Bild-mit-Text →
Maßanfertigung → Statement → Newsletter → Footer**. Alle Texte, Bilder und
Farben sind im Theme-Editor anpassbar.

## Lokale Entwicklung

Mit der [Shopify CLI](https://shopify.dev/docs/themes/tools/cli):

```bash
shopify theme dev      # Live-Vorschau mit einem Dev-Store
shopify theme check    # Theme auf Fehler prüfen
shopify theme push     # In einen Store hochladen
```

Gestalterische Leitlinien, Bild- und Section-Übersicht: siehe [CLAUDE.md](./CLAUDE.md).
