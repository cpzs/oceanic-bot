# 🚀 Bot Discord avec Oceanic.js
## 📋 Prérequis

- Node.js v21.14.0 ou supérieur
- npm ou yarn

## 🛠 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/cpzs/oceanic-bot.git
cd oceanic-bot
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez votre bot :
- Remplissez les informations nécessaires dans `config.js`

## ⚙ Configuration

Le fichier `config.js` contient les paramètres essentiels de votre bot :

```javascript
module.exports = {
    token: "...",
    prefix: "&",
    owners: ["..."],
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
        "MESSAGE_CONTENT"
    ]
};
```

## 📁 Structure du Projet

```
src/
├── commands/           # Commandes du bot
│   ├── General/       # Commandes générales
│   └── ...           # Autres catégories
├── events/            # Événements Discord
├── structures/        # Structures de base
│   ├── Command.js    # Classe de base pour les commandes
│   └── Event.js      # Classe de base pour les événements
└── index.js          # Point d'entrée du bot
```

## 🎯 Fonctionnalités

- Système de commandes modulaire
- Gestion des événements
- Système d'alias pour les commandes
- Vérification des permissions
- Support des commandes en DM et serveur
- Gestion des erreurs

## 🚀 Démarrage

Pour lancer le bot :

```bash
node index.js ou node .
```

## 📝 Création de Commandes

Pour créer une nouvelle commande, créez un fichier dans le dossier approprié :

```javascript
const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "nomcommande",
            description: "Description de la commande",
            category: "Catégorie",
            usage: "Utilisation de la commande",
            enabled: true,
            guildOnly: false,
            aliases: ["alias1", "alias2"],
            permLevel: "Utilisateur"
        });
    }

    async run(message, args) {
        // Logique de la commande
    }
};
```

## 📝 Création d'Événements

Pour créer un nouvel événement :

```javascript
const Event = require("../structures/Event");

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "nomEvenement",
            once: false
        });
    }

    async run(...args) {
        // Logique de l'événement
    }
};
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
