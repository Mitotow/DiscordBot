import { Client } from "discord.js";
import { Dirent, readdir } from "fs";
import path from "path";

const evpath = path.join(__dirname, '../events');

/**
 * Load all events located in /src/events dir into the client
 * 
 * @param client - Main bot client object
 */
export default (client: Client): void => {
    readdir(evpath, { withFileTypes: true, encoding: 'utf-8' }, (err: NodeJS.ErrnoException | null, files: Dirent[]) => {
        if(err) {
            console.error(`Error when reading events dir :`, err);
            return;
        }

        files.filter(f => f.name.endsWith('.ts')).forEach(file => {
            // Execute function exported by each event file
            const ev = require(path.join(evpath, file.name));
            ev.default(client);
        });
    });
}