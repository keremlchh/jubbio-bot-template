import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { BotClient } from '../client/BotClient';

export async function loadCommands(client: BotClient) {
    const commandsPath = path.join(__dirname, '../commands');

    // commands diye bir klasör var mı diye kontrol ediyoruz
    if (!fs.existsSync(commandsPath)) {
        console.warn(`[WARNING] ${commandsPath} | Komut klasörü bulunamadı.`);
        return;
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    let loadedCount = 0;
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default || commandModule.command;

        if (command && 'data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            loadedCount++;
        } else {
            console.warn(`[WARNING] ${filePath} komutunda "data" veya "execute" bulunamadı.`);
        }
    }

    console.log(`[HANDLER] ${loadedCount} kadar komut yüklendi.`);
}
