# Klunker — Shopify Theme

Shopify-Theme (Online Store 2.0) für die Modemarke **Klunker**.
Designrichtung: **Quiet Luxury / High Fashion** — streng monochrom, viel
Weißraum, elegante Serif-Headlines, schlanke Sans, dünne Hairline-Linien.

## Struktur

Die komplette Theme-Struktur liegt im Repo-Root:

```
assets/      base.css, global.js
config/      settings_schema.json, settings_data.json
layout/      theme.liquid
locales/     de.default.json, en.json
sections/    header, hero, product-grid, footer, main-*
snippets/    product-card, price, social-icons
templates/   index.json, product.json, collection.json,
             cart.json, page.json, 404.json, search.json
```

Die Startseite (`templates/index.json`) besteht aus drei Sections:
**Hero**, **Produkt-Grid** und **Footer** — alle im Theme-Editor anpassbar.

## Lokale Entwicklung

Mit der [Shopify CLI](https://shopify.dev/docs/themes/tools/cli):

```bash
shopify theme dev      # Live-Vorschau mit einem Dev-Store
shopify theme check    # Theme auf Fehler prüfen
shopify theme push     # In einen Store hochladen
```

Gestalterische Leitlinien und Konventionen: siehe [CLAUDE.md](./CLAUDE.md).
