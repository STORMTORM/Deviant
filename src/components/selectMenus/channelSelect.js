module.exports = {
    data: {
        name:'channelSelect'
    },
    async execute(interaction, message, client){
        await interaction.reply({
            content: `selected: ${interaction.values[0]}`
        }) 
    }
}