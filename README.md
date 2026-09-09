# GENBI

Écrans publics autonomes pour GENBI / OCP : accueil, connexion et inscription. HTML, CSS et JavaScript natifs ; aucune dépendance à installer. Le dashboard existant est hors de ce module.

## Lancer

Node.js 20 ou supérieur :

```sh
npm start
```

Ouvrir `http://127.0.0.1:4173`. Le port peut être défini avec la variable `PORT`.

Les routes `#/`, `#/connexion`, `#/inscription` et `#/a-propos` fonctionnent sur tout hébergement statique, y compris dans un sous-répertoire, sans réécriture côté serveur. Le dossier `dist/` contient les sources publiques directement exécutables ; il est volontairement suivi dans Git. Il n'y a pas d'étape de compilation.

## Démonstration

Les formulaires sont explicitement en mode démonstration. « Remplir avec un exemple » ajoute des données fictives ; l'envoi affiche une confirmation de simulation. Aucun compte, session, cookie ou stockage de mot de passe n'est créé. Les données des graphiques sont fictives.

## Raccorder l'authentification existante

Modifier `dist/config.js` : passer `mode` à `live`, définir `dashboardUrl` (par exemple `/dashboard`) et remplacer `authAdapter = null` par un objet exposant `signIn({ email, password })` et `signUp({ name, email, password })`.

Chaque méthode appelle le service existant et retourne `{ authenticated: true }` uniquement lorsqu'une session est réellement ouverte. Une inscription nécessitant une vérification retourne `{ authenticated: false, message: 'Vérifiez votre messagerie.' }`. Lever une erreur destinée à l'utilisateur pour un échec. Sans service raccordé, le mode réel échoue explicitement.

La redirection est permise uniquement après une réponse réelle authentifiée et vers une URL configurée sur le même domaine. Pour un dashboard sur un autre domaine, définir une liste de destinations autorisées et adapter `dashboardDestination` après revue du parcours SSO. La protection du dashboard, les sessions, les cookies HttpOnly, la protection CSRF et les autorisations restent gérés par le backend existant. Aucune information secrète dans la configuration publique.

## Vérifier

```sh
npm test
npm run check
```

Tests : validation, distinction simulation/authentification réelle, contrat d'intégration et restrictions de redirection. Le contrôle vérifie les assets et la syntaxe des modules.

## Visuels

Voir `ASSETS.md` pour les sources et substitutions. Les photos et le logo sont servis localement. Manrope et DM Sans sont chargées via Google Fonts, avec Arial comme repli. Elles sont des choix de composition, pas des polices officiellement attribuées à OCP.

## Hébergement

Servir `dist/` avec un hébergement statique. `vercel.json` désigne ce dossier pour un éventuel déploiement Vercel. Aucune API d'authentification n'est incluse. Le module est compatible avec l'intégration ultérieure dans une autre stack.
