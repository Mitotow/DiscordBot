import { Client } from "discord.js";
import { ILogObj, Logger } from "tslog";

/**
 * Function to handle the 'Ready' event and bind it to the Discord client.
 * 
 * @param client - The Discord client that will respond to the 'Ready' event.
 */
export default (client:Client): void => {
    const logger: Logger<ILogObj> = new Logger();
    client.once('ready', () => {
        if (!client.user || !client.application) return;
        logger.info(`Connected as '${client.user.username}'.`);
    });
}