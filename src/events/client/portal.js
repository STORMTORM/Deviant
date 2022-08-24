const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB()

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const portalChannel = await db.get(`portal_${message.guild.id}.channelId`)

        if(message.channel.id === portalChannel){
            if(message.author.bot) return
            const messageContent = message.content
            const messageEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL()})
            .setDescription(`> ${messageContent}`)
            .setFooter({ iconURL: message.guild.iconURL(), text: message.guild.name })
            .setTimestamp()

            message.delete()
            client.guilds.cache.forEach(async guild => {
                if(db.has(`portal_${guild.id}.channelId`)){
                    const channels = await db.get(`portal_${guild.id}.channelId`)
                    const checkIfChannel = client.channels.cache.get(channels)
                    if(checkIfChannel === undefined) return;

                    client.channels.cache.get(channels).send({
                        embeds: [messageEmbed]
                    })
                }
            })
        }
    }
}