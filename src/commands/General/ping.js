const Command = require("../../structures/Command");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Voir la latence du bot",
            category: "General",
            usage: "ping",
            enabled: true,
            guildOnly: false,
            aliases: ["latency"],
            permLevel: "Utilisateur"
        });
    }

    async run(message, args) {
        const start = Date.now();
        await message.channel.createMessage({
            messageReference: {
                messageID: message.id,
                channelID: message.channel.id,
                guildID: message.guild?.id
            },
            embeds: [{
                color: 0x242429,
                fields: [
                    {
                        name: "Latence du bot",
                        value: `\`${Date.now() - start}ms\``,
                        inline: true
                    },
                    {
                        name: "Latence de l'API",
                        value: `\`${this.client.shards.get(0)?.latency || "N/A"}ms\``,
                        inline: true
                    }
                ]
            }]
        });
    }
}; 