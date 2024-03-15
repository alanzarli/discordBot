const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('loop the queue or a song')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addStringOption(opt => opt.setName('option').setDescription('thing to loop').setRequired(true).addChoices({name: 'track', value: 'track'}, {name: 'queue', value: 'queue'})),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('there is no music playing.');
        if(queue.tracks.data.length < 2) return interaction.reply('the queue must have more than 2 songs');
        if(!queue.history.nextTrack) return interaction.reply('there is no music after the current song')

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp('You are not in the same voice channel than the bot :(')

        const option = interaction.options.getString('option');
        if (option !== 'track' && option !== 'queue') return await interaction.reply(`you have to indicated \`queue\`or \`track\``);

        switch (option) {
            case "track":
                if(queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                    await interaction.reply(`the loop has been started successfully`);
                }
                else {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply(`the loop has been stopped successfully`);
                }
            break;

            case "queue":
                if(queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    await interaction.reply(`the loop has been started successfully`);
                }
                else {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply(`the loop has been stopped successfully`);
                }
            break;

        }
    }
}