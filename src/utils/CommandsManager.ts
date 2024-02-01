import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import Command from '../interfaces/Command';
import { Logger, ILogObj } from 'tslog';

export default class CommandsManager {
    private static commands: Map<string, Command> = new Map();
    private static cmdpath = path.join(__dirname, '../commands');
    private static logger: Logger<ILogObj> = new Logger();

    /**
     * Load the commands located in /src/commands dir
     * 
     * @param client - Discord client
     */
    public static loadCommands = async (client: Client) => {
        if (client.application?.id == null) return;
    
        const folders = readdirSync(this.cmdpath);
    
        // Use map to create an array of promises for each folder
        const folderPromises = folders.map(async (folder) => {
            const files = readdirSync(path.join(this.cmdpath, folder)).filter(f => f.endsWith('.ts')); // Get files of folder
    
            // Use map to create an array of promises for each file
            const filePromises = files.map(async (file) => {
                const filepath = path.join(this.cmdpath, folder, file);
                this.logger.debug('[COMMANDS] File', filepath, 'found');
                const command: Command = require(filepath).default;
                this.commands.set(command.data.name, command);
            });
    
            // Wait for all file promises to resolve
            await Promise.all(filePromises);
        });
    
        // Wait for all folder promises to resolve
        await Promise.all(folderPromises);
    
        const token = process.env.TOKEN;
        const rest = new REST().setToken(token ? token : '');
    
        try {
            this.logger.debug('[COMMANDS] Loading', this.commands.size, 'commands');
            await rest.put(
                Routes.applicationCommands(client.application.id),
                { body: Array.from(this.commands.values()).map(c => c.data.toJSON()) },
            );
            this.logger.debug('[COMMANDS]', this.commands.size, 'command' + (this.commands.size>1?'s ':' ') + 'loaded');
        } catch (error) {
            this.logger.error(error);
        }
    }
    

    /**
     * Get all loaded commands of the bot
     * 
     * @returns A list of commands
     */
    public static getCommands = (): Map<string, Command> => this.commands;
}