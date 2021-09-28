module.exports = {
    name: 'welcome',
    description: '',
    async execute(config, client, Discord) {
        client.on('guildMemberAdd', member => {
            const channel = member.guild.channels.cache.find(ch => ch.name === config.CanalBienvenida);

            let embed = new Discord.MessageEmbed()
                .setAuthor(config.nombrebot,config.logobot)
                .setColor(config.color)
                .setTitle(`Bienvenido al servidor ${member.user.username}!`)
                .setDescription(`<@!${member.user.id}>, Recuerda mirar los canales <#${config.idInformacion}> y <#${config.idReglas}>`)
                channel.send(embed);
        })
    }

}