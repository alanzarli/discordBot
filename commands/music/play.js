const { SlashCommandBuilder } = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play some music')
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption(opt => opt.setName('song').setDescription('Song to play').setRequired(true)),

    async run(interaction){
        await interaction.deferReply({ephemeral: true});
        const song = interaction.options.getString('song');

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp('You are not in the same voice channel than the bot :(.')

        try {
        
            const { track } = await interaction.client.player.play(voiceChannelMemeber, song, {
                requestedBy: interaction.user,
                nodeOptions: {
                    metadata: interaction,
                    volume: 70,
                    leaveOnStop: true,
                    leaveOnEmpty: true,
                    leaveOnEnd: false,
                    selfDeaf: true
                }
            });
        await interaction.followUp(`\`${track.title}\`during \`${track.duration}\` is added to the queue`);
        
        } catch (error) {
            return await interaction.followUp(`unavailaible song: \`${song}\` :(`)
        }
    }
}