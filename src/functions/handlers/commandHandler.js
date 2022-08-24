const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId } = process.env
const fs = require('fs')

module.exports = (client) => {
    client.commandHandler = async() => {
        const commandsFolder = fs.readdirSync('./src/commands')
        for(const folder of commandsFolder){
            const files = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"))
            
            const { commands, commandArray } = client
            for (const file of files){
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())
                console.log(`${command.data.name} has initialized`)
            }
        }

        const rest = new REST({ version:"9" }).setToken(process.env.token)

        try {
            console.log("Started refreshing application (/) commands.")

            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            })
            
            console.log("Successfully reloaded application (/) commands.")
        } catch (error) {
            console.error(error)
        }
    }
}