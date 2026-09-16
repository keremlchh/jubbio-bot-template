// Discord.js'den farksız olarak bir interaksiyon (/ komut) dinleyicimiz

import { BotClient } from '../client/BotClient';

export const event = {
    name: 'interactionCreate',
    async execute(interaction: any, client: BotClient) {
        // Sadece slash (chat input) komutlarını işle
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[ERROR] Komut bulunamadı: ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`[ERROR] Komut çalıştırılırken hata oluştu: ${interaction.commandName}`);
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
            }
        }
    }
};
