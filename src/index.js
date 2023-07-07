require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]

});

let status = [
    {
        name: "Fuck nubas pussy",
        type: ActivityType.Watching,
        url: 'https://www.youtube.com/watch?v=OqxHy8sCtvA&ab_channel=UnderCtrl',

    },
    {
        name: "Eating nubas boobs",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=OqxHy8sCtvA&ab_channel=UnderCtrl',
    },
    {
        name: "Giving anal fuck to nubas mother and sister. ",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=OqxHy8sCtvA&ab_channel=UnderCtrl',
    },
]

client.on('ready', (e) => {
    console.log(`${e.user.tag}  is online`);
    // status/presence/activyty status
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000);
    // client.user.setActivity(status)
})
client.on('interactionCreate', async (interaction) => {


    //buttons functionality starts

    try {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });
        const role = interaction.guild.roles.cache.get(interaction.customId);


        if (!role) {

            interaction.editReply({
                content: "I couldn't find that role",
            });
            return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The Role ${role} has been removed`);
            return;
        }
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added`);
    } catch (error) {
        console.log(error)
    }

    //buttons functionality ends





    //    slash command
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'hey') {
        interaction.reply('Hello, world!');
    }
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number')?.value;
        const num2 = interaction.options.get('second-number')?.value;
        var sum = num1 + num2;
        interaction.reply(`The sum is ${sum}`);

    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("Embed Title")
            .setDescription('This is embed description')
            .setColor('Random')
            .setURL('https://bau.edu.bd')
            .setAuthor({
                name: 'Didarul Alam rahat',
                iconURL: 'https://www.bau.edu.bd/public/frontend/images/logo_bau.png',
                url: 'https://bau.edu.bd'
            })
            .addFields([{
                name: "Field Title One",
                value: 'Some random Value one',
                inline: true,
            },
            {
                name: "Field Title Two",
                value: 'Some random Value Two',
                inline: true,
            }
            ]).setImage('https://www.bau.edu.bd/public/frontend/images/logo_bau.png').setFooter({ text: 'Some footer text here', iconURL: 'https://www.bau.edu.bd/public/frontend/images/logo_bau.png' });
        interaction.reply({
            embeds: [
                embed
            ]
        });

    }
})
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hello') {
        message.reply('hi');
    }
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("Embed Title")
            .setDescription('This is embed description')
            .setColor('Random')
            .setURL('https://bau.edu.bd')
            .setAuthor({
                name: 'Didarul Alam rahat',
                iconURL: 'https://www.bau.edu.bd/public/frontend/images/logo_bau.png',
                url: 'https://bau.edu.bd'
            })
            .addFields([{
                name: "Field Title One",
                value: 'Some random Value one',
                inline: true,
            },
            {
                name: "Field Title Two",
                value: 'Some random Value Two',
                inline: true,
            }
            ]).setImage('https://www.bau.edu.bd/public/frontend/images/logo_bau.png').setFooter({ text: 'Some footer text here', iconURL: 'https://www.bau.edu.bd/public/frontend/images/logo_bau.png' });
        message.reply({
            embeds: [
                embed
            ]
        });
    }
})
client.login(process.env.TOKEN);