import { BotClient } from '../client/BotClient';

const PREFIX = process.env.PREFIX || '!';

export const event = {
    name: 'messageCreate',
    async execute(message: any, client: BotClient) {
        // Botların bunu tetiklemesini engelliyoruz.
        if (message.author.bot) return;

        // Prefix komutlarda mesajın prefix ile başlaması lazım, kontrol ediyoruz.
        if (!message.content.startsWith(PREFIX)) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            // Olası hataları yakalayıp raise atıyoruz.
            console.error(`[ERROR] Komut çalıştırılırken bir hata oluştu: ${commandName}`);
            console.error(error);
            await message.reply('Bu komutu çalıştırırken bir hata meydana geldi!');
        }
    }
};
