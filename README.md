# ShadowKite — CV & Portfolio

Frontend Angular de ShadowKite, une plateforme open source qui aide chacun à créer un profil professionnel, un CV et un portfolio public partageable.

## Ce qui est inclus

Cette version est volontairement **frontend uniquement**. Elle propose un espace multipage prêt à être relié à une API :

- tableau de bord avec progression, activités, tâches et projets ;
- profil éditable avec aperçu en direct ;
- créateur de CV guidé : informations, expériences, formation et compétences ;
- portfolio avec cartes de projets et état vide ;
- aperçu de la page publique et copie du lien unique ;
- modules complémentaires d’organisation : tâches, projets, calendrier, notes et contacts ;
- navigation responsive pour téléphone, tablette et ordinateur ;
- états de brouillon, notifications locales et interactions de démonstration.

Les données affichées sont locales et de démonstration. Les boutons d’action sont déjà séparés par module pour faciliter leur remplacement par des appels API, sans inventer de backend dans ce dépôt.

## Démarrer

```bash
npm install
npm start
```

L’application est disponible sur `http://localhost:4200/`. Dans Replit, le workflow utilise le port 5000 :

```bash
NG_CLI_ANALYTICS=false npm start -- --host 0.0.0.0 --port 5000
```

## Compiler et tester

```bash
npm run build
npm test
```

## Préparer le backend

Les prochains contrats API peuvent suivre les objets décrits dans le cahier de projet : `User`, `Profile`, `CV`, `Project`, `Portfolio` et `Preferences`. Le frontend devra ensuite remplacer les signaux de démonstration par des services Angular typés, avec gestion des états de chargement, erreur, brouillon et publication.

Le cahier fonctionnel de référence couvre le parcours public, l’espace utilisateur, l’éditeur, la page publique et l’administration minimale.