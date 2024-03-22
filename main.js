const {Client, IntentsBitField, Collection } = require('discord.js');
const client = new Client({intents: new IntentsBitField(3276799)});
const loadCommands = require('./loaders/loadCommands');
const loadEvents = require('./loaders/loadEvents');
const loadInteractions = require('./loaders/loadInteractions');
const {Player} = require('discord-player');
require('dotenv').config();

client.player = new Player(client, {
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

client.color = "#2f3136";
client.player.extractors.loadDefault()

client.commands = new Collection();
client.interaction = new Collection();



(async () => {
    loadCommands(client);
    loadEvents(client);
    loadInteractions(client);
    await client.login(process.env.TOKEN);
})();





