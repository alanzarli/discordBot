const { readdirSync} = require('fs');

module.exports = client => {

    const dirsEvents = readdirSync("./events/");

    let count = 0;
    for (const dirs of dirsEvents) {
        const filesDirs = readdirSync(`./events/${dirs}/`).filter(f => f.endsWith(".js"));
        for (const files of filesDirs) {
            const event = require(`../events/${dirs}/${files}`);
            if(dirs === 'music') client.player.events.on(event.name, (...args) => event.run(client, ...args));
            else client.on(event.name, (...args) => event.run(client, ...args));
            count++;
        }
    }


}