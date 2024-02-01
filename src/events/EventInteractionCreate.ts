import { Client, Interaction } from "discord.js";
import CommandsManager from "../utils/CommandsManager";
import { Logger, ILogObj } from 'tslog';

export default (client: Client) => {
    const logger: Logger<ILogObj> = new Logger();
    client.on('interactionCreate', async (interaction: Interaction) => {
        if(!interaction.isCommand()) return; // Interaction is not a command
        const command = CommandsManager.getCommands().get(interaction.commandName); // Get the related command
        if(command != null) {
            // Command found, execute the command
            command.execute(client, interaction);
            logger.info(`[INTERACTION] ${interaction.user.displayName} interacted by using ${interaction.commandName} command`);
        }
    });
}