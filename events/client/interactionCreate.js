const { Events, InteractionType, PermissionsBitField } = require('discord.js');

module.exports = {

    name: Events.InteractionCreate,
    async run(client, interaction){

        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                const command = client.commands.get(interaction.commandName);
                if(command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) return await interaction.reply(`Need permission \`${new PermissionsBitField(command.data.default_member_permissions)}\` for this command.`)
                await command.run(interaction);
            break;

            default:
                const name = interaction.customId.split('_')[0];
                const args = interaction.customId.split('_').slice(1);
                const file = client.interaction.find(i => i.name === name && i.type === interaction.componentType);
                if(!file) return;
                if (file.permission && !interaction.member.permissions.has(new PermissionsBitField(file.permission))) return await interaction.reply(`Need permissions \`${new PermissionsBitField(file.permission).toArray()}\` for this.`);
                await file.run(interaction, ...args);
            break;
        }


    }
};