import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { BotClient } from '../client/BotClient';

export async function loadEvents(client: BotClient) {
    const eventsPath = path.join(__dirname, '../events');

    // Klasör var mı kontrol ediyoruz
    if (!fs.existsSync(eventsPath)) {
        console.warn(`[WARNING] ${eventsPath} | Events klasörü bulunamadi`);
        return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    let loadedCount = 0;
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventModule = await import(pathToFileURL(filePath).href);
        const event = eventModule.default || eventModule.event;

        if (event && 'name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args: any[]) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args: any[]) => event.execute(...args, client));
            }
            loadedCount++;
        } else {
            console.warn(`[WARNING] ${filePath} event dosyasinda "name" veya "execute" bulunamadi.`);
        }
    }

    console.log(`[HANDLER] Loaded ${loadedCount} events.`);
}
