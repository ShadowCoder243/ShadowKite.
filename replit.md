# ShadowKite — instructions du projet

## Stack

- Angular 21 standalone avec TypeScript
- SCSS local, sans bibliothèque UI externe
- Données de démonstration locales dans `app.ts`

## Lancer le projet

```bash
NG_CLI_ANALYTICS=false npm start -- --host 0.0.0.0 --port 5000
```

Le workflow `Start application` sert l’aperçu Replit sur le port 5000.

## Structure actuelle

- `app.html` contient le shell de navigation et les vues frontend.
- `app.ts` contient l’état local, les types d’écran et les interactions de démonstration.
- `app-modern.scss` contient le système visuel responsive du dashboard et des éditeurs.
- `app.routes.ts` est conservé pour brancher les vraies routes Angular lors de l’ajout du backend.

## Périmètre frontend

Le projet ne contient pas encore de backend, d’authentification ou de persistance. Les écrans sont conçus pour être reliés ensuite aux ressources `Profile`, `CV`, `Project`, `Portfolio` et `Preferences` définies dans le cahier de projet.