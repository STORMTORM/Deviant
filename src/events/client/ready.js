const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is online.`)

        setInterval(() => {
            const statuses = [
                `${client.guilds.cache.size.toLocaleString()} SERVERS WITH ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} USERS`,
            ]
            const status = (statuses[Math.floor(Math.random() * statuses.length)])
            client.user.setPresence({
                activities: [{ name: status, type: ActivityType.Watching }]
            })
        }, 5000);
    }
}