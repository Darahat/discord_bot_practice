require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]

});
client.on('ready', (e) => {
    console.log(`${e.user.tag}  is online`);
})
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // console.log(interaction.commandName);

    if (interaction.commandName === 'hey') {
        interaction.reply('Hello, world!');
    }
})
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hello') {
        message.reply('hi');
    }
})
client.login(process.env.TOKEN);