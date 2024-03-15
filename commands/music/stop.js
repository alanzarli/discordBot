const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop the song')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('There is no music playing.');

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp('You are not in the same voice channel than the bot :(.')

        queue.node.stop();
        queue.delete();
        await interaction.reply(`music stopped`);
    }
}