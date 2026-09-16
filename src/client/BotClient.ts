// Ana istemci sınıfı

import { Client, ClientOptions, GatewayIntentBits, Collection } from '@jubbio/core'; // API
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';

export class BotClient extends Client {
    public commands: Collection<string, any>;
    public config: any;

    constructor(options?: Partial<ClientOptions>) {
        super({
            intents: [
                // Gerekli intent'ler
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            ...options
        });

        this.commands = new Collection();
    }

    public async initialize() {
        console.log('[CLIENT] Başlatılıyor...');

        // Handler'ları (Yükleyicileri) başlat
        await loadEvents(this);
        await loadCommands(this);

        // API'ye giriş yap
        const token = process.env.BOT_TOKEN;
        if (!token) {
            console.error('[ERROR] .env Dosyasındaki BOT_TOKEN boş olamaz!');
            process.exit(1);
        }

        await this.login(token);
    }
}
