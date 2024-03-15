
module.exports = {

    name: 'playerStart',
    async run(client, queue, track){
        await queue.metadata.channel.send(`The music \`${track.title}\` during \`${track.duration}\` requested by \`${track.requestedBy.username}\`is playing !`);
    }
}