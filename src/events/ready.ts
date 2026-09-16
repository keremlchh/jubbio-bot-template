import { BotClient } from '../client/BotClient';
import { GatewayOpcodes, ActivityType, PresenceStatus } from '@jubbio/core';

export const event = {
    name: 'ready',
    once: true,
    async execute(client: BotClient) {
        console.log(`[READY] ✅ Bot başarıyla giriş yaptı: ${client.user?.username}`);

        // API henüz client.user.setActivity desteklemediği için Gateway üzerinden doğrudan yolluyoruz
        (client as any).send({
            op: GatewayOpcodes.PresenceUpdate,
            d: {
                since: null,
                activities: [{
                    name: 'Jubbio ile Denemeler',
                    type: ActivityType.Playing
                }],
                status: PresenceStatus.Online,
                afk: false
            }
        });

        // Slash komutlarını kaydet
        const commands = client.commands.map(cmd => cmd.data);

        try {
            console.log(`[REST] ${commands.length} adet (/) komutu yükleniyor...`);

            // For global commands
            await client.rest.bulkOverwriteGlobalCommands(commands);

            console.log(`[REST] (/) Komutları başarıyla kaydedildi!`);
        } catch (error) {
            console.error('[REST ERROR] Komutlar kaydedilirken hata oluştu:');
            console.error(error);
        }
    }
};
