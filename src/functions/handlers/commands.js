const fs = require('fs')

module.exports = (client) => {
    client.commands = async() => {
        const commands = fs.readdirSync('./src/commands')
        for(const folder of commands){
            const files = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"))
            
            const { commands, commandArray } = client
            for (const file of files){
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command, command.data.toJSON())
                console.log(`${command.data.name} has initialized`)
            }
        }
    }
}