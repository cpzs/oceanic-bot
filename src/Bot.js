const { Client } = require("oceanic.js");
const config = require("../config");
const Command = require("./structures/Command");
const Event = require("./structures/Event");

class Bot extends Client {
    constructor() {
        super({
            auth: `Bot ${config.token}`,
            gateway: {
                intents: config.intents
            }
        });

        this.config = config;
        this.commands = new Map();
        this.aliases = new Map();
    }

    async start() {
        try {
            await Event.loadEvents(this);
            await Command.loadCommands(this);
            await this.connect();
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Bot; 