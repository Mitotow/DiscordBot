import Command from "src/interfaces/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

const CommandPing: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Reply Pong !'),
    execute: async (_: Client, interaction: CommandInteraction) => {
        if(interaction.isRepliable()) await interaction.reply({ content: 'Pong !', ephemeral: true, });
    }
}

export default CommandPing;