const Event = require("../structures/Event");

module.exports = class MessageCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            once: false
        });
    }

    async run(message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(this.client.config.prefix)) return;

        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        
        const command = this.client.commands.get(commandName) || 
                        this.client.commands.get(this.client.aliases.get(commandName));
        
        if (!command) return;
        
        if (command.conf.guildOnly && !message.guild) {
            return message.channel.createMessage("La commande ne peut pas être utilisé dans les DMs");
        }
        
        try {
            await command.run(message, args);
        } catch (error) {
            console.error(error);
            message.channel.createMessage("Erreur avec la commande : " + command.help.name);
        }
    }
}; 