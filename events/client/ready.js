const { Events, ActivityType } = require('discord.js');

module.exports = {

    name: Events.ClientReady,
    async run(client){


        client.application.commands.set(client.commands.map(command => command.data));
        
        client.user.setActivity('crevette', {type: ActivityType.Watching})
        console.log(`${client.user.username} is online`);

    }
}