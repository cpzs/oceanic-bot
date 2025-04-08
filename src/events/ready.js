const Event = require("../structures/Event");

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            once: true
        });
    }
}; 