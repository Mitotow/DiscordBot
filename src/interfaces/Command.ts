import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface Command {
    data: SlashCommandBuilder,
    /**
     * 
     * @param client Bot's client that will reply to the interaction
     * @param interaction Interaction related to the command
     */
    execute(client: Client, interaction: CommandInteraction): void,
}