const { EmbedBuilder } = require("discord.js")


module.exports = {
    data:{
        name:`cancelChannel`
    },
    async execute(interaction, client){
        interaction.message.delete()
        await interaction.reply({
            content:`Request was successfully cancelled`,
            ephemeral:true
        }) 
    }
}