const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('there is no music playing.');
        if(queue.tracks.data.length < 2) return interaction.reply('the queue must have more than 2 songs');

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp('You are not in the same voice channel than the bot :(.')

        queue.tracks.shuffle();
        await interaction.reply("queue's been shuffled succesfully :)")
    }
}