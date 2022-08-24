module.exports = {
    data:{
        name:`portalProfile`
    },
    async execute(interaction, client){
        await interaction.reply({
            content: `https://google.com`
        })
    }
}