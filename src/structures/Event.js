const { readdirSync } = require("fs");
const { join } = require("path");

class Event {
    constructor(client, {
        name = null,
        once = false
    }) {
        this.client = client;
        this.name = name;
        this.once = once;
    }

    async run(...args) {
        throw new Error(`La méthode run() doit être dans ${this.name}`);
    }

    static async loadEvents(client) {
        try {
            const eventFiles = readdirSync(join(__dirname, "..", "events")).filter(file => file.endsWith(".js"));
            
            for (const file of eventFiles) {
                const EventClass = require(join(__dirname, "..", "events", file));
                const event = new EventClass(client);
                
                if (!event.name) {
                    console.warn(`Événement invalide dans ${file}: propriété name qu'il manque`);
                    continue;
                }
                
                if (event.once) {
                    client.once(event.name, (...args) => event.run(...args));
                } else {
                    client.on(event.name, (...args) => event.run(...args));
                }
                
                console.log(`Event : ${event.name}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Event;