const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pause or resume the song')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('There is no music playing.');

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp('You are not in the same voice channel than the bot :(.')

        if(queue.node.isPaused()){
            queue.node.resume();
            await interaction.reply("song's resumed");
        }
        else {
            queue.node.pause();
            await interaction.reply("song's paused");
        }
    }
}