module.exports = {
    name: 'reactionrole',
    description: '',
    async execute(message, config, Discord, client) {
        const channel = '794647489105362975' //Hacer que solo se pueda utilizar en este canal!!
        const memberRole = message.guild.roles.cache.find(role => role.id === '794905888082886668');
        const debateRole = message.guild.roles.cache.find(role => role.id === '797896125104783380');

        const tickEmoji = '✅';
        const debateEmoji = '💬';

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Consigue tus roles aqui!')
            .setDescription('Elegir un rol te dará acceso a distintos canales del servidor!\n\n' +
                `${tickEmoji} Para obtener el rol 'Miembro' como muestra de que aceptas las reglas del servidor!\n` +
                `${debateEmoji} Para obtener el rol 'Debates' como muestra de que aceptas las reglas de la categoria debate!\n`);
        let messageEmbed = await message.channel.send(embed);
        message.delete({ timeout: 3 * 1000 });
        messageEmbed.react(tickEmoji);
        messageEmbed.react(debateEmoji);

        client.on('messageReactionAdd', async(reaction, user) => {
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (!(reaction.message.channel.id === channel)) return;

            if (reaction.emoji.name === tickEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(memberRole);
            }
            if (reaction.emoji.name === debateEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(debateRole);
            }
        });
        client.on('messageReactionRemove', async(reaction, user) => {
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (!(reaction.message.channel.id === channel)) return;

            if (reaction.emoji.name === tickEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(memberRole);
            }
            if (reaction.emoji.name === debateEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(debateRole);
            }
        });
    }
}