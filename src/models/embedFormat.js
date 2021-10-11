module.exports = function (config, Discord) {
    let embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setAuthor(config.botName,config.botLogo)
    .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);
    return embed;
}