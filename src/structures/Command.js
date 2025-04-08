const { readdirSync } = require("fs");
const { join } = require("path");

class Command {
    constructor(client, {
        name = null,
        description = "Aucune description fournie",
        category = "Divers",
        usage = "Aucune utilisation fournie",
        enabled = true,
        guildOnly = false,
        aliases = [],
        permLevel = "Utilisateur"
    }) {
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, permLevel };
        this.help = { name, description, category, usage };
    }

    async run(message, args) {
        throw new Error(`La méthode run() doit être dans ${this.help.name}`);
    }

    static async loadCommands(client) {
        try {
            const commandFolders = readdirSync(join(__dirname, "..", "commands"));
            
            for (const folder of commandFolders) {
                const commandFiles = readdirSync(join(__dirname, "..", "commands", folder)).filter(file => file.endsWith(".js"));
                
                for (const file of commandFiles) {
                    const CommandClass = require(join(__dirname, "..", "commands", folder, file));
                    const command = new CommandClass(client);
                    
                    if (!command.help || !command.help.name) {
                        console.warn(`Commande invalide dans ${file} structure help.name qu'il manque`);
                        continue;
                    }
                    
                    client.commands.set(command.help.name, command);
                    
                    if (command.conf.aliases && command.conf.aliases.length > 0) {
                        command.conf.aliases.forEach(alias => {
                            client.aliases.set(alias, command.help.name);
                        });
                    }
                    
                    console.log(`Commande : ${command.help.name}`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Command; 