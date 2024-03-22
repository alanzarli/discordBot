const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const Pagination = require('../../classes/Pagination');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('return to the queue')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('There is no music playing.');
        if (!queue.history.nextTrack) return await interaction.reply('There is no music after this.');

        const embeds = [];

        for (let i = 0; i < queue.tracks.data.length; i++) {
            const embed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle(`Music n°${i+1}`)
                .setTimestamp()
                .setFooter({text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL()});

            embeds.push(embed);

        }

        const pagination = new Pagination(embeds, (embed, index) => embed.setThumbnail(queue.tracks.data[index].thumbnail).setDescription(`Track : ${queue.tracks.data[index].title}\n\nDuration : ${queue.tracks.data[index].duration}\n\nAuthor : ${queue.tracks.data[index].author}\n\nViews : ${queue.tracks.data[index].views}\n\n by : ${interaction.client.users.cache.get(queue.tracks.data[index].requestedBy.id)}\n\nPlaylist: \`${queue.tracks.data[index].playlist ? 'yes' : 'no'}\``))

        await pagination.reply(interaction);


    }
}