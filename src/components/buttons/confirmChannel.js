const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    data:{
        name:`confirmChannel`
    },
    async execute(interaction, client){
        const selectedChannelId = interaction.message.embeds[0].data.fields[0].value
        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)){
            return interaction.reply({
                content: 'You do not have permission to run this command',
                ephemeral: true
            })
        }
        try {
            const channel = await db.get(`portal_${interaction.guild.id}.channelId`)
            if(channel === selectedChannelId){
                const alreadyExists = new EmbedBuilder()
                    .setColor('#000000')
                    .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                    .addFields({ name:`Channel ID`, value:`${selectedChannelId}` })
                    .setDescription(`**<#${selectedChannelId}> is already connected to global chat**`)

                    return await interaction.editReply({
                        embeds: [alreadyExists],
                    })
            } else {            
                await db.set(`portal_${interaction.guild.id}`, { channelId: selectedChannelId })

                const welcomeServer = new EmbedBuilder()
                    .setColor('#000000')
                    .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                    .setDescription(`**${interaction.guild.name} just joined global chat**`)

                client.guilds.cache.forEach(async guild => {
                    if(db.has(`portal_${guild.id}.channelId`)){
                        const channels = await db.get(`portal_${guild.id}.channelId`)
                        const checkIfChannel = client.channels.cache.get(channels)
                        if(checkIfChannel === undefined) return;
    
                        client.channels.cache.get(channels).send({
                            embeds: [welcomeServer]
                        })
                    }
                })
                const successEmbed = new EmbedBuilder()
                    .setColor('#006400')
                    .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                    .setDescription(`**<#${selectedChannelId}> has been connected to global chat.**`)
                interaction.reply({
                    embeds: [successEmbed]
                })
            }
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#8b0000')
                .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                .setDescription(`**An error occured while connecting that channel to global chat.**`)
            interaction.reply({
                embeds: [errorEmbed]
            })
            throw error
        }
        
    }
}