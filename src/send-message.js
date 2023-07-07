require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]

});
const roles = [
    {
        id: '1126130633421361172',
        label: 'member',
    },
    {
        id: '1126131242287517709',
        label: 'bot',
    },
    {
        id: '1126128992580292718',
        label: 'Admin',
    }
]
client.on('ready', async (e) => {
    try {
        const channel = await client.channels.cache.get('1126127205584482304');
        if (!channel) return;
        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary));
        });
        await channel.send({
            content: 'Claim or remove a role below',
            components: [row]
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
})
client.login(process.env.TOKEN);