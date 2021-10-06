module.exports = {
    name: 'colors',
    description: `See all the colors I have.`,
    async execute(message, args, config, Discord) {
        if(args[1]!=undefined) return message.channel.send(`Use \`${config.prefix}config colors\` to run this command correctly`);
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS Colors:`)
            .addFields(
                {name: `WHITE`, value: `#FFFFFF`},
                {name: `AQUA`, value: `#1ABC9C`},
                {name: `PINK`, value: `#E91E63`},
                {name: `GREEN`, value: `#2ECC71`},
                {name: `GOLD`, value: `#F1C40F`},
                {name: `BLUE`, value: `#3498DB`},
                {name: `ORANGE`, value: `#E67E22`},
                {name: `PURPLE`, value: `#9B59B6`},
                {name: `RED`, value: `#E74C3C`},
                {name: `YELLOW`, value: `#FFFF00`},
            )
        message.channel.send(embed);

    }
}