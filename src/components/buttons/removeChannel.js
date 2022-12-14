const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    data:{
        name:`removeChannel`
    },
    async execute(interaction, client){
        const channel = interaction.message.embeds[0].data.fields[0].value
        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)){
            return interaction.reply({
                content: 'You do not have permission to run this command',
                ephemeral: true
            })
        }
        const successEmbed = new EmbedBuilder()
            .setColor('#006400')
            .setAuthor({ name: 'Deviant Portal', iconURL: client.user.avatarURL()})
            .setDescription(`**${channel} has been successfully disconnected from global chat**`)
        
        try{
            interaction.message.delete()
            await db.delete(`portal_${interaction.guild.id}`)
            interaction.reply({
                embeds: [successEmbed]
            })
        } catch(err){
            throw err
        }
    }
}