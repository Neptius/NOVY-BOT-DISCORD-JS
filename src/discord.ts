import Discord from 'discord.js';

export default class NovyBot {
    private client = new Discord.Client();
    private token: string

    constructor(token: string) {
        this.token = token
    }

    start() {
        this.client.login(this.token);
        this.logged();
        this.message();
    }

    private logged() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }

    private message() {
        this.client.on('message', async msg => {
            if (!msg.guild) return;

            if (msg.content === 'ping') {
                // msg.channel.send('Pong!');
                msg.reply('Pong!');
            }


            if (msg.content === '/leave') {
                if (msg.member.voiceChannel) {
                    msg.member.voiceChannel.leave();
                } else {
                    msg.reply('You need to join a voice channel first!');
                }
            }

            if (msg.content === '/join') {
                // Only try to join the sender's voice channel if they are in one themselves
                if (msg.member.voiceChannel) {
                    const connection = await msg.member.voiceChannel.join()
                    this.playSong(connection)
                } else {
                    msg.reply('You need to join a voice channel first!');
                }
            }
        });
    }

    private playSong(connection: any) { // Connection is an instance of VoiceConnection
        const dispatcher = connection.playFile('./assets/mp3/this-is-what-you-are.mp3');

        dispatcher.setVolume(0.5);

        dispatcher.on('end', () => {
            console.log('leave');
            // The song has finished
        });

        dispatcher.on('error', (error: any) => {
            // Catch any errors that may arise
            console.log(error);
        });
    }
}