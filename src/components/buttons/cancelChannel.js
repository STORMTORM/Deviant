const { EmbedBuilder, PermissionFlagsBits } = require("discord.js")


module.exports = {
    data:{
        name:`cancelChannel`
    },
    async execute(interaction, client){
        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)){
            return interaction.reply({
                content: 'You do not have permission to run this command',
                ephemeral: true
            })
        }
        interaction.message.delete()
        await interaction.reply({
            content:`Request was successfully cancelled`,
            ephemeral:true
        }) 
    }
}