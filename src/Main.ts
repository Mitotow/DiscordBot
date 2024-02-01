import { 
    ActivityType, 
    Client, 
    IntentsBitField, } from 'discord.js';
import dotenv from 'dotenv';
import loadEvents from './utils/loadEvents';
import CommandsManager from './utils/CommandsManager';


// Create an instance of discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds,
    ],

    presence: {
        activities: [
            {
                name: 'Vachetto is the best <3',
                type: ActivityType.Custom,
            },
        ]
    }
});

// Load .env config file
dotenv.config();

// Load events
loadEvents(client);

// Login the client with a token located in the .env config file
client.login(process.env.TOKEN).then(() => {
    // Load commands
    CommandsManager.loadCommands(client);
});