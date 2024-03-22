const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('setvolume')
        .setDescription("set song's volume")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addNumberOption(opt => opt.setName('volume').setDescription('required volume').setRequired(true).setMaxValue(200).setMinValue(0)),

    async run(interaction){

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply('There is no music playing.');

        const voiceChannelMemeber = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMemeber) return await interaction.followUp('You are not in a voice channel :(.');
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMemeber.id) return await interaction.followUp('You are not in the same voice channel than the bot :(.')

        const volume = interaction.options.getNumber('volume');
        if (queue.node.volume === volume) return await interaction.reply(`the volume is already at \`${queue.node.volume}%\`.`);

        queue.node.setVolume(volume);
        await interaction.reply(`the volume is now at \`${queue.node.volume}\`%.`);

    }
}