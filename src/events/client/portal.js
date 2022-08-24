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
            let messageAttachment = message.attachments
            
            const messageEmbed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL()})
            .setFooter({ iconURL: message.guild.iconURL(), text: message.guild.name })
            .setTimestamp()

            message.delete()

            if(messageContent) messageEmbed.setDescription(`> ${messageContent}`)

            if(messageAttachment){
                messageAttachment.forEach((attachment) => {
                    if(attachment.contentType === 'image/png' || attachment.contentType === 'image/gif' || attachment.contentType === 'image/jpeg'){
                        console.log(attachment.url)
                        console.log(attachment.contentType)
                        messageEmbed.setImage(attachment.url)
                    }else{
                        messageAttachment = null;
                    }
                })
            }else{
                if(!messageContent) return
            }

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