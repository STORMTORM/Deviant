const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuOptionBuilder } = require("discord.js");
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('portal')
        .setDescription('Make any channel global just like a portal!')
        .addChannelOption(option => option.setName("channel").setDescription('Mention a channel to make it global')),
    
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        })

        const editProfileButton = new ButtonBuilder()
            .setCustomId('portalProfile')
            .setLabel(`Edit Profile`)
            .setStyle(ButtonStyle.Primary)

        const removeButton = new ButtonBuilder()
            .setCustomId('removeChannel')
            .setLabel(`Remove Channel`)
            .setStyle(ButtonStyle.Danger)

        const confirmButton = new ButtonBuilder()
            .setCustomId('confirmChannel')
            .setLabel(`Confirm`)
            .setDisabled(false)
            .setStyle(ButtonStyle.Success)
        
        const cancelButton = new ButtonBuilder()
            .setCustomId('cancelChannel')
            .setLabel(`Cancel`)
            .setDisabled(false)
            .setStyle(ButtonStyle.Danger)
        
        const selectedChannel = interaction.options.getChannel('channel')
        if(selectedChannel){
            console.log(selectedChannel.type)
            if(selectedChannel.type != "0"){
                const notATextChannel = new EmbedBuilder()
                .setColor('#8b0000')
                .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL()})
                .setDescription("**The selected channel is not a text channel.**")

                return await interaction.editReply({
                    embeds: [notATextChannel]
                })
            }
            else{
                console.log(db.get(`${interaction.guild.id}.channelId`))
                const channel = await db.get(`portal_${interaction.guild.id}.channelId`)
                if(channel === selectedChannel.id){
                    const alreadyExists = new EmbedBuilder()
                    .setColor('#000000')
                    .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                    .addFields({ name:`Channel ID`, value:`${selectedChannel.id}` })
                    .setDescription(`**<#${selectedChannel.id}> is already a global channel**`)

                    return await interaction.editReply({
                        embeds: [alreadyExists],
                    })
                } else {
                    const Confirm = new EmbedBuilder()
                    .setColor('#000000')
                    .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL() })
                    .addFields({ name:`Channel ID`, value:`${selectedChannel.id}` })
                    .setDescription(`**You selected <#${selectedChannel.id}>\nThis channel will now become a global chat.**`)

                    return await interaction.editReply({
                        embeds: [Confirm],
                        components: [new ActionRowBuilder().addComponents(confirmButton).addComponents(cancelButton)]
                    })
                } 
            }
        }else{
            let portalEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL()})
            .setDescription('> **Deviant Portal will make the selected channel global which means people from different servers can talk together in a single channel.\n> To make a channel global use \`/portal #channel\` **')
            
            const alreadyChannel = await db.get(`portal_${interaction.guild.id}.channelId`)
            let components = new ActionRowBuilder().addComponents(editProfileButton)

            if(alreadyChannel){
                portalEmbed
                    .setDescription(`> **Deviant Portal will make the selected channel global which means people from different servers can talk together in a single channel.**`)
                    .setFields({ name:`Current Global Channel`, value:`<#${alreadyChannel}>` })

                components.addComponents(removeButton)
            }

            await interaction.editReply({
                embeds: [portalEmbed],
                components: [components]
            })
        }
    }
}