import fs from 'fs'
function loadCommands(DiscordBot) {
    
    let count = 0;
    const CommandFiles = fs.readdirSync('./src/commands/')
        .filter(file => file.endsWith('.js'));
    for (const file of CommandFiles) {
        const command = require(`../commands/${file}`);
        DiscordBot.commands.set(command.name, command);
        count ++;
    }
    return count;
}
export default loadCommands