module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName)
            if(!commands) return;
        
            try {
                await command.execute(interaction, client)
            } catch (error) {
                console.error(error) 
                await interaction.reply({
                    content:`Something went wront...`,
                    ephemeral:true
                })  
            }
        }else if(interaction.isButton()){
            const { buttons } = client
            const { customId } = interaction;
            const button = buttons.get(customId)
            if(!button) return new Error('No button')

            try{
                await button.execute(interaction, client)
            } catch(err){
                console.log(err)
            }
        } else if(interaction.isSelectMenu()){
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId)
            if(!menu) return new Error('No menu')

            try {
                await menu.execute(interaction, client)
            } catch (err) {
                console.log(err)
            }
        }
    }
}