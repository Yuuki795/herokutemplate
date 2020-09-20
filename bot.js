const Discord = require('discord.js');
const botconfig = require("./util/botconfig.json");
const bot = new Discord.Client({ disableEveryone: true });
const { CommandHandler } = require("djs-commands")

const CH = new CommandHandler({
    folder: __dirname + "/commands/",
    prefix: [botconfig.prefix]
});


bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag} on ${bot.guilds.cache.size} servers`)
})

bot.on("message", (message) => {
    // if(message.channel.type === "dm") return;
    if (message.author.type === "bot") return;

    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);

    if (!cmd) return;

    try {
        cmd.run(bot, message, args)
    } catch (e) {
        console.log(e)
    }
});


bot.login(botconfig.token);
