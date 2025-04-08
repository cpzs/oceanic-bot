const Bot = require("./src/Bot");
const bot = new Bot();

process.on("unhandledRejection", (error) => {
    console.error("Erreur non gérée:", error);
});

process.on("uncaughtException", (error) => {
    console.error("Exception non capturée:", error);
});

bot.start(); 