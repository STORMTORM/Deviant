require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs')

const client = new Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection();
client.commandArray = [];

const functions = fs.readdirSync(`./src/functions`);
for(const folder of functions){
    const files = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"))
    for(const file of files) require(`./functions/${folder}/${file}`)(client);
}

client.eventHandler();
client.commandHandler();
client.login(token)