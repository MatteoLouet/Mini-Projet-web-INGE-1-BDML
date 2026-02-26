#  Calculateur de Protéines - Mini-projet Développement Web

**Auteur :** Mattéo LOUET - INGÉ 1 BDML 2

##  Description

Application web interactive permettant de calculer les apports en protéines 

##  Fonctionnalités

### Calcul des Protéines
- **Saisie personnalisée** : Définissez une plage de poids (min/max)
- **Nombre de lignes ajustable** : Choisissez combien de paliers de poids afficher
- **4 objectifs sportifs disponibles** :

### Affichage et Export
- **Tableau dynamique** : Génération automatique selon vos paramètres
- **Filtrage par objectif** : Affichez tous les objectifs ou un seul spécifique
- **Export CSV** : Téléchargez votre tableau au format CSV pour l'utiliser dans Excel ou autres

### Sécurité des Données
- **Validation en temps réel** : Le poids max doit être supérieur au poids min
- **Messages d'erreur clairs** : Alertes pour guider l'utilisateur
- **Affichage conditionnel** : Le tableau n'apparaît que si tous les champs sont valides

## Installation et Lancement

### Prérequis
- **Node.js** (version 14 ou supérieure) 
- **npm** (installé automatiquement avec Node.js)

### Étapes d'installation

1. **télécharger le projet**
```bash
   cd mon-projet-proteines
```

2. **Installer les dépendances**
```bash
   npm install
```

3. **Structure des fichiers**
   Assurez-vous d'avoir la structure du Github:


4. **Lancer l'application**
```bash
   npm run dev
```

5. **Ouvrir dans le navigateur**
   - Si ce n'est pas le cas, ouvrez manuellement l'URL générée 

##  Utilisation

1. **Saisissez votre plage de poids** (par exemple : min 56 kg, max 79 kg)
2. **Choisissez le nombre de lignes** (par exemple : 10 lignes)
3. **Sélectionnez votre objectif** (ou laissez "Tous les objectifs")
4. **Consultez le tableau généré** avec les apports en protéines recommandés
5. **Exportez en CSV** si vous souhaitez sauvegarder les données




---

💪 **Développé avec passion pour les gainz !** 💪
