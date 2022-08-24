const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the API and Client Latency.'),
    
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        })

        const pingEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setAuthor({ name: 'Deviants Ping', iconURL: client.user.avatarURL()})
            .setDescription(`**API Latency - ${client.ws.ping}ms\nClient Ping - ${message.createdTimestamp - interaction.createdTimestamp}ms**`)

        await interaction.editReply({
            embeds: [pingEmbed]
        })
    }
}