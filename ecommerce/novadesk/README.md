# Rapport — NovaDesk

## 1. Concepteur

**Nom :** Mohamed Boudabbous  
**Numéro d’étudiant :** 300376202  
**Cours :** SEG3525 — Conception et analyse des interfaces usagers  

## 2. Objectif du commerce électronique

**Nom du site :** NovaDesk  
**Type de commerce :** Site e-commerce d’accessoires de bureau pour étudiants  

NovaDesk est un prototype de commerce électronique conçu pour aider les étudiants à créer un espace de travail plus organisé, confortable et efficace.

Le site vend des accessoires liés au bureau étudiant, comme des supports pour ordinateur portable, lampes de bureau, organisateurs, carnets, écouteurs, sacs, accessoires de rangement et outils de productivité.

**Public cible :**  
Le site vise principalement les étudiants universitaires, les étudiants en résidence, les personnes suivant des cours en ligne et les jeunes professionnels qui veulent améliorer leur espace de travail sans perdre trop de temps à comparer des produits sur plusieurs sites.

NovaDesk cherche donc à répondre à un besoin simple : aider l’utilisateur à trouver rapidement des produits utiles, disponibles et adaptés à son budget.

## 3. Inspirations

Pour concevoir NovaDesk, j’ai observé plusieurs sites e-commerce afin de comprendre comment ils organisent leurs produits, leurs filtres, leurs cartes produits et leur processus d’achat.

### Inspiration 1 — Amazon

**Lien :**  
https://www.amazon.ca

**Ce que j’ai observé :**

- Catalogue très large
- Filtres par catégorie, prix, note, livraison et marque
- Cartes produits avec image, prix, note et bouton d’action
- Panier toujours accessible
- Processus d’achat guidé

**Utilisation dans NovaDesk :**

J’ai utilisé cette inspiration pour concevoir une grille de produits claire, avec des cartes contenant les informations essentielles : image, nom, prix, description, note, tags, disponibilité et bouton d’ajout au panier.

J’ai aussi repris l’idée d’un panier visible et d’un processus d’achat divisé en étapes afin de réduire l’incertitude de l’utilisateur pendant le checkout.

### Inspiration 2 — IKEA

**Lien :**  
https://www.ikea.com/ca/en/

**Ce que j’ai observé :**

- Organisation claire des catégories
- Filtres par matériau, couleur, type de produit et prix
- Présentation visuelle simple et cohérente
- Produits liés à l’organisation de l’espace
- Importance de l’aménagement et du contexte d’usage

**Utilisation dans NovaDesk :**

IKEA m’a inspiré pour le choix des facettes liées au domaine de NovaDesk : catégorie, couleur, matériau, prix et objectif d’usage.

Comme NovaDesk vend des accessoires de bureau, il était important que les filtres correspondent à la manière dont un étudiant pense son espace de travail : organisation, confort, style, budget et utilité.

## 4. Réflexion et conception

## 4.1 Conception des processus interactifs et image du système

Le site NovaDesk inclut les trois processus interactifs demandés dans le Devoir 4 :

1. Un processus de suivi d’instructions pour acheter un produit
2. Un processus d’exploration divergent/convergent avec une recherche à facettes
3. Un processus de communication avec un sondage utilisateur

Ces trois processus sont visibles dans le prototype afin que l’utilisateur comprenne non seulement les produits proposés, mais aussi la structure de l’expérience : explorer, choisir, acheter, puis donner son avis.

### 4.1.1 Processus de suivi d’instructions — Checkout guidé

Le processus d’achat est divisé en plusieurs étapes :

1. Panier
2. Informations de contact
3. Paiement simulé
4. Confirmation

Pour aider l’utilisateur à comprendre où il se trouve, j’ai utilisé un checkout stepper qui affiche l’étape actuelle, les étapes déjà terminées et les étapes restantes.

**Éléments de feedback utilisés :**

- Titre de l’étape actuelle
- Boutons Back / Continue
- Validation des formulaires
- Résumé de commande visible
- Confirmation finale avec numéro de commande
- Message indiquant que le paiement est simulé

**Justification :**

Un processus d’achat en ligne peut créer de l’incertitude, surtout lorsque l’utilisateur entre des informations personnelles ou de paiement. Le stepper rend le parcours plus rassurant parce qu’il montre clairement ce qui a été fait et ce qu’il reste à faire.

### 4.1.2 Processus d’exploration — Recherche à facettes

NovaDesk utilise une recherche à facettes pour permettre à l’utilisateur d’explorer le catalogue puis de réduire progressivement les résultats.

Les facettes utilisées sont :

- Catégorie
- Objectif d’étude
- Couleur
- Matériau
- Prix maximum
- Option écologique

Ces filtres correspondent au réseau sémantique du domaine, car un utilisateur qui cherche un accessoire de bureau peut penser en termes de besoin, de style, de budget, de matériau ou de durabilité.

**Pourquoi ces facettes sont pertinentes :**

- La catégorie aide à trouver rapidement un type de produit.
- L’objectif d’étude relie le produit au besoin réel de l’utilisateur.
- La couleur et le matériau aident à choisir selon le style du bureau.
- Le prix maximum permet de respecter un budget étudiant.
- L’option écologique répond à une valeur importante pour certains utilisateurs.

**Lien avec le modèle divergent/convergent :**

Au début, l’utilisateur voit tous les produits : c’est la phase divergente.  
Ensuite, il sélectionne progressivement des filtres pour réduire les résultats : c’est la phase convergente.

Le site permet aussi de retirer un filtre ou de tout effacer, ce qui donne à l’utilisateur la possibilité de revenir vers une exploration plus large.

### 4.1.3 Processus de communication — Sondage UX

Le sondage apparaît après l’expérience d’achat afin de ne pas interrompre la navigation ou le checkout.

Le sondage demande :

- Une note de satisfaction
- Si l’expérience était utile
- Un commentaire optionnel

Le sondage est court pour éviter d’être intrusif. Le langage est positif et engageant afin d’encourager l’utilisateur à répondre.

**Justification :**

Le sondage est placé après la confirmation afin de respecter le parcours principal de l’utilisateur. Il ne bloque pas l’achat, ne coupe pas l’exploration et apparaît comme une invitation plutôt qu’une obligation.

### 4.1.4 Scénarimage — Parcours d’un étudiant qui achète un accessoire NovaDesk

Même si les personnages et scénarimages ne sont pas obligatoires pour ce devoir, j’ai utilisé un petit scénarimage pour clarifier le parcours utilisateur principal de NovaDesk.

### Personnage — Amir, étudiant universitaire

Amir est un étudiant universitaire qui suit plusieurs cours en ligne et travaille souvent dans sa chambre ou à la bibliothèque. Son bureau est désorganisé, ses câbles prennent beaucoup de place et son ordinateur portable est souvent trop bas, ce qui rend ses longues séances d’étude moins confortables.

**Objectif :**  
Trouver rapidement un accessoire utile pour améliorer son espace de travail.

**Besoin principal :**  
Comparer plusieurs produits sans perdre de temps, comprendre le prix, vérifier la disponibilité et compléter une commande simple.

**Solution proposée par NovaDesk :**  
Une interface e-commerce claire avec recherche à facettes, cartes produits informatives, panier visible, gestion du stock et checkout guidé.

### Étape 1 — Explorer le catalogue

Amir arrive sur la page d’accueil de NovaDesk. Il voit une proposition claire : construire un espace de travail plus propre pour mieux se concentrer. Il clique sur **Explore products** pour accéder au catalogue.

**But de conception :**

- Donner une entrée rapide vers les produits
- Utiliser un langage direct et orienté vers l’action
- Montrer clairement que le site est destiné aux étudiants

**Écran concerné :**

- Hero section
- Catalogue de produits

### Étape 2 — Réduire les résultats avec les facettes

Amir ne sait pas exactement quel produit acheter. Il utilise les filtres pour explorer les options. Il peut filtrer par catégorie, objectif d’étude, couleur, matériau, prix maximum et option écologique.

Par exemple, il peut sélectionner :

- Category: Laptop setup
- Study goal: Remote classes
- Material: Aluminum
- Maximum price: $100

Le nombre de produits affichés se met à jour automatiquement.

**But de conception :**

- Permettre une exploration divergente au début
- Aider l’utilisateur à converger vers un choix plus précis
- Rendre les filtres actifs visibles pour éviter la confusion

**Écran concerné :**

- Panneau de filtres
- Badges de filtres actifs
- Grille de produits

### Étape 3 — Choisir un produit

Amir compare les cartes produits. Chaque carte affiche l’image, la catégorie, la note, le nom, la description, les tags, le prix, le stock disponible, la quantité dans le panier et le stock restant.

Il choisit par exemple **Alto Laptop Stand** et clique sur **Add to cart**.

**But de conception :**

- Donner les informations essentielles sans surcharger la carte
- Montrer la disponibilité avant l’achat
- Prévenir les erreurs en limitant la quantité au stock disponible

**Écran concerné :**

- Carte produit
- Bouton Add to cart
- Indicateurs Stock / Cart / Left

### Étape 4 — Vérifier le panier

Amir ouvre le panier. Il peut vérifier les articles sélectionnés, modifier les quantités, retirer un produit ou continuer ses achats.

Le résumé affiche :

- Nombre d’articles
- Sous-total
- Taxes estimées
- Total

**But de conception :**

- Donner du contrôle à l’utilisateur
- Permettre de corriger facilement une décision
- Afficher clairement les coûts avant le checkout

**Écran concerné :**

- Panier
- Contrôles de quantité
- Résumé de commande

### Étape 5 — Suivre le checkout guidé

Amir commence le checkout. Le processus est divisé en étapes : panier, contact, paiement et confirmation. Le stepper montre l’étape actuelle et les étapes restantes.

Il entre ses informations de contact, puis des informations de paiement simulées. Le site affiche clairement que le paiement est un prototype et qu’aucun paiement réel ne sera effectué.

**But de conception :**

- Réduire l’incertitude pendant l’achat
- Montrer où l’utilisateur se trouve dans le processus
- Prévenir les erreurs avec des messages de validation

**Écran concerné :**

- Checkout stepper
- Formulaire de contact
- Formulaire de paiement simulé
- Messages d’erreur

### Étape 6 — Confirmation et sondage

Après la confirmation, Amir reçoit un numéro de commande simulé. Il peut ensuite répondre à un court sondage pour évaluer son expérience.

Le sondage demande une note, une réponse oui/non et un commentaire optionnel.

**But de conception :**

- Confirmer clairement la fin du processus
- Créer une communication positive avec l’utilisateur
- Obtenir une rétroaction sans interrompre l’achat

**Écran concerné :**

- Confirmation de commande
- Sondage UX

## 4.2 Communication verbale

## 4.2.1 Modèle rédacteur / lecteur

Le site parle à l’utilisateur avec une voix claire, professionnelle et positive.

**Rédacteur implicite :** NovaDesk, une boutique moderne qui conseille les étudiants.  
**Lecteur :** un étudiant qui veut améliorer son espace de travail sans perdre de temps.

Le ton est :

- Informatif pour expliquer les produits
- Direct pour guider les actions
- Positif pour encourager l’engagement

Le modèle rédacteur/lecteur est cohérent : NovaDesk se présente comme un assistant de boutique qui guide l’utilisateur, mais sans utiliser un ton trop familier ou trop agressif.

## 4.2.2 Objectif de communication 1 — Inciter à l’action

NovaDesk utilise des boutons et des phrases courtes pour encourager l’utilisateur à agir.

**Exemples :**

- Add to cart
- Explore products
- Checkout
- Share feedback
- Open NovaDesk

**Justification :**

Ces formulations sont courtes, visibles et orientées vers une action claire. Elles permettent à l’utilisateur de comprendre immédiatement ce qu’il peut faire.

## 4.2.3 Objectif de communication 2 — Informer

Les descriptions de produits, les filtres et les messages du checkout servent à informer l’utilisateur.

**Exemples :**

- Description du produit
- Prix
- Stock disponible
- Quantité dans le panier
- Stock restant
- Avertissement “Prototype only — No real payment will be processed.”

**Justification :**

Ces informations aident l’utilisateur à comprendre les caractéristiques du produit et les conséquences de ses actions.

## 4.2.4 Objectif de communication 3 — Établir une connexion

Le sondage utilise un langage positif pour encourager l’utilisateur à partager son avis.

**Exemples :**

- Share your NovaDesk experience.
- Thanks for your feedback.
- Your answer helps us improve the NovaDesk experience.

**Justification :**

Ces phrases créent une relation plus humaine entre le système et l’utilisateur. Elles montrent que l’avis de l’utilisateur est utile et valorisé.

## 5. Prototype haute-fidélité

NovaDesk a été développé comme un prototype haute-fidélité avec React et Vite.

Le prototype est interactif et permet à l’utilisateur de :

- Explorer un catalogue de produits
- Utiliser une recherche à facettes
- Ajouter des produits au panier
- Modifier les quantités
- Voir le stock disponible
- Suivre un checkout guidé
- Remplir un formulaire de paiement simulé
- Recevoir une confirmation
- Répondre à un sondage UX

## 5.1 Choix de conception visuelle

### Thème visuel

NovaDesk utilise une interface claire, moderne et professionnelle, avec une palette basée sur des tons neutres et des accents bleus.

Ce choix donne une impression de confiance, de propreté et d’organisation, ce qui correspond au thème du site : améliorer l’espace de travail étudiant.

### Typographie

La typographie met en valeur les titres, les prix, les boutons et les informations importantes comme le stock ou le total de commande.

Les textes secondaires sont plus discrets afin de ne pas surcharger l’interface.

### Mise en page

La mise en page est organisée en zones claires :

- Header
- Hero section
- Présentation des processus
- Panneau de filtres
- Grille de produits
- Panier
- Checkout
- Sondage
- Footer

Cette organisation aide l’utilisateur à comprendre rapidement où se trouvent les actions principales.

### Hiérarchie visuelle

Les éléments les plus importants sont mis en avant :

- Boutons principaux
- Prix
- Quantité dans le panier
- Étape actuelle du checkout
- Confirmation de commande

La hiérarchie visuelle aide l’utilisateur à distinguer les actions principales des informations secondaires.

### Principes de Gestalt

NovaDesk utilise plusieurs principes de Gestalt :

- **Proximité :** les informations liées sont regroupées dans les cartes produits.
- **Similarité :** les cartes produits utilisent la même structure.
- **Figure-fond :** les produits ressortent sur un fond clair.
- **Continuité :** le checkout guide naturellement l’utilisateur d’une étape à l’autre.
- **Région commune :** les filtres, produits et résumé de commande sont séparés visuellement.

## 5.2 Accessibilité

Le prototype inclut plusieurs éléments d’accessibilité :

- Boutons HTML réels pour les actions
- Textes alternatifs pour les images
- Labels pour les champs de formulaire
- Messages d’erreur proches des champs invalides
- États de focus visibles
- Structure responsive
- Contraste renforcé pour les boutons importants

Ces choix améliorent l’utilisation du site avec le clavier, les lecteurs d’écran et les petits écrans.

## 5.3 Liens du projet

Cette section regroupe les liens importants permettant d’évaluer le prototype, le portfolio et le code source.

### Portfolio

**Portfolio français :**  
https://mohamedboudabbous.github.io/portfolio-seg3525/

**Portfolio anglais :**  
https://mohamedboudabbous.github.io/portfolio-seg3525/en/index.html

Le portfolio contient une carte pour NovaDesk dans la section des prototypes du cours SEG3525. Cette carte donne accès à l’étude de cas et au prototype interactif.

### Étude de cas NovaDesk

**Étude de cas française :**  
https://mohamedboudabbous.github.io/portfolio-seg3525/ecommerce.html

**Étude de cas anglaise :**  
https://mohamedboudabbous.github.io/portfolio-seg3525/en/ecommerce.html

Ces pages présentent l’objectif du projet, les processus interactifs, les choix de conception, l’accessibilité et l’évaluation heuristique.

### Prototype interactif

**Prototype NovaDesk :**  
https://mohamedboudabbous.github.io/portfolio-seg3525/ecommerce/novadesk-site/index.html

Le prototype permet de tester directement :

- la recherche à facettes ;
- le panier ;
- la gestion du stock ;
- le checkout guidé ;
- le sondage UX.

## 6. Code

Le code du projet est disponible dans le dépôt GitHub suivant :

**GitHub :**  
https://github.com/MohamedBoudabbous/portfolio-seg3525

Le prototype NovaDesk est organisé en deux parties :

- `ecommerce/novadesk` : code source React/Vite du prototype e-commerce
- `ecommerce/novadesk-site` : version compilée du prototype, intégrée au portfolio et accessible publiquement avec GitHub Pages

Cette organisation permet de conserver le code source React séparé de la version finale publiée dans le portfolio.

## 7. Technologies utilisées

Le prototype utilise les technologies suivantes :

- React
- Vite
- JavaScript
- HTML
- CSS
- Bootstrap pour le portfolio
- GitHub pour le versionnement
- GitHub Pages pour l’hébergement public

## 8. Fonctionnalités principales

NovaDesk contient les fonctionnalités suivantes :

- Catalogue de 20 produits
- Recherche à facettes fonctionnelle
- Filtres actifs supprimables
- Panier interactif
- Gestion des quantités
- Affichage du stock disponible
- Affichage de la quantité dans le panier
- Affichage du stock restant
- Blocage lorsque le stock maximal est atteint
- Résumé de commande
- Checkout guidé
- Validation des formulaires
- Paiement simulé
- Confirmation de commande
- Sondage de satisfaction
- Intégration au portfolio

## 9. Évaluation heuristique

Cette section présente une auto-évaluation du prototype NovaDesk selon les dix heuristiques d’utilisabilité de Nielsen.

## 9.1 Visibilité de l’état du système

**Élément conforme :**  
Le site affiche le nombre de produits trouvés, les filtres actifs, le compteur du panier, les quantités commandées et les étapes du checkout.

**Pourquoi c’est conforme :**  
L’utilisateur sait toujours ce qui se passe dans le système : combien de produits sont affichés, combien d’articles sont dans le panier et à quelle étape du checkout il se trouve.

**Capture d’écran à ajouter :**  
Catalogue avec compteur de résultats ou checkout stepper.

## 9.2 Correspondance entre le système et le monde réel

**Élément conforme :**  
Le site utilise un vocabulaire familier du commerce électronique : cart, checkout, price, stock, payment, confirmation.

**Pourquoi c’est conforme :**  
Ces termes correspondent au langage attendu par les utilisateurs lorsqu’ils naviguent sur un site e-commerce.

**Capture d’écran à ajouter :**  
Carte produit ou panier.

## 9.3 Contrôle et liberté de l’utilisateur

**Élément conforme :**  
L’utilisateur peut retirer un produit, modifier une quantité, vider le panier, revenir en arrière ou retourner au catalogue.

**Pourquoi c’est conforme :**  
L’utilisateur garde le contrôle sur son parcours et peut corriger ses décisions sans être bloqué.

**Capture d’écran à ajouter :**  
Panier avec boutons de quantité et bouton Remove.

## 9.4 Cohérence et standards

**Élément conforme :**  
Les cartes produits, boutons, formulaires et badges utilisent des styles cohérents dans tout le site.

**Pourquoi c’est conforme :**  
L’utilisateur peut prédire le comportement de l’interface parce que les mêmes types d’éléments se ressemblent et fonctionnent de manière similaire.

**Capture d’écran à ajouter :**  
Grille de produits ou checkout.

## 9.5 Prévention des erreurs

**Élément conforme :**  
Le site empêche l’utilisateur d’ajouter plus d’articles que le stock disponible.

**Pourquoi c’est conforme :**  
Le bouton devient désactivé lorsque la quantité maximale est atteinte, ce qui empêche une erreur avant qu’elle se produise.

**Capture d’écran à ajouter :**  
Carte produit avec “Max in cart”.

## 9.6 Reconnaissance plutôt que rappel

**Élément conforme :**  
Les filtres actifs, les tags produits, les prix, le stock et les étapes du checkout restent visibles.

**Pourquoi c’est conforme :**  
L’utilisateur n’a pas besoin de mémoriser ses choix précédents, car les informations importantes restent affichées.

**Capture d’écran à ajouter :**  
Filtres actifs ou checkout stepper.

## 9.7 Flexibilité et efficacité d’utilisation

**Élément conforme :**  
Les filtres peuvent être combinés dans n’importe quel ordre et supprimés individuellement.

**Pourquoi c’est conforme :**  
Un utilisateur peut explorer librement le catalogue, affiner les résultats rapidement ou réinitialiser sa recherche.

**Capture d’écran à ajouter :**  
Panneau de filtres et badges actifs.

## 9.8 Design esthétique et minimaliste

**Élément conforme :**  
Les cartes produits affichent seulement les informations importantes : image, catégorie, note, nom, description, tags, stock, prix et bouton d’action.

**Pourquoi c’est conforme :**  
L’interface évite les informations inutiles et garde une structure claire pour réduire la charge cognitive.

**Capture d’écran à ajouter :**  
Carte produit NovaDesk.

## 9.9 Aide à reconnaître, diagnostiquer et corriger les erreurs

**Élément conforme :**  
Les formulaires affichent des messages d’erreur spécifiques près des champs invalides.

**Pourquoi c’est conforme :**  
L’utilisateur comprend rapidement quel champ doit être corrigé et pourquoi.

**Capture d’écran à ajouter :**  
Formulaire de paiement avec erreur d’expiration ou formulaire de contact.

## 9.10 Aide et documentation

**Élément conforme :**  
Le site contient des textes d’aide, des descriptions de filtres, un message indiquant que le paiement est simulé et un footer explicatif.

**Pourquoi c’est conforme :**  
L’utilisateur reçoit suffisamment d’informations pour comprendre le fonctionnement du prototype sans documentation externe.



## 10. Reconnaissance de l’usage de l’IA générative

Dans ce projet, j’ai utilisé des outils d’intelligence artificielle générative comme aide pendant le travail.

L’IA a été utilisée pour :

- Structurer certaines idées du rapport
- Aider au débogage du code React
- Vérifier que les exigences du devoir étaient couvertes

Cependant, les choix finaux de conception, l’intégration au portfolio, la sélection du thème, l’organisation du prototype et les décisions finales ont été faits par moi.

## 11. Conclusion

NovaDesk est un prototype e-commerce interactif conçu pour répondre aux exigences du Devoir 4 de SEG3525.

Le projet démontre :

- Une recherche à facettes fonctionnelle
- Un processus d’achat guidé
- Un sondage de communication utilisateur
- Une communication verbale réfléchie
- Des choix visuels cohérents
- Une auto-évaluation selon les heuristiques de Nielsen
- Une intégration au portfolio personnel