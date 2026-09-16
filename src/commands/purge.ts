import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'purge',
        description: 'Mevcut kanalda belirtilen sayıda mesajı siler.',
        options: [
            {
                name: 'sayı',
                description: 'Silinecek mesaj sayısı (1-100 arası)',
                type: 4, // Integer (sayı) değeri
                required: true
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        if (!interaction.guildId || !interaction.channelId) {
            return interaction.reply({ content: 'Bu komut sadece mekan kanallarında kullanılabilir.', ephemeral: true });
        }

        const count = interaction.options.getInteger('sayı');

        if (!count || count < 1 || count > 100) {
            return interaction.reply({ content: 'Lütfen 1 ile 100 arasında geçerli bir sayı belirtin.', ephemeral: true });
        }

        try {
            // Mesajları çekiyoruz
            const messages = await client.rest.getMessages(interaction.guildId, interaction.channelId, {
                limit: count
            });

            if (!messages || messages.length === 0) {
                return interaction.reply({ content: 'Silinecek mesaj bulunamadı.', ephemeral: true });
            }

            // Mesaj ID'lerini alıyoruz
            const messageIds = messages.map((msg: any) => msg.id);

            // Mesajları siliyoruz
            await client.rest.bulkDeleteMessages(interaction.guildId, interaction.channelId, messageIds);

            const embed = new EmbedBuilder()
                .setColor(Colors.Green || 0x00FF00)
                .setTitle('🧹 Mesajlar Temizlendi')
                .setDescription(`${messageIds.length} adet mesaj başarıyla silindi.`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

            // setTimeout(() => interaction.deleteReply().catch(() => {}), 5000);
            // API destekliyor mu emin degilim sonra test etmeyi düsünüyorum | 5 saniye sonra onay mesajını silmek için
        } catch (error) {
            console.error('Purge hatası:', error);
            await interaction.reply({ content: 'Mesajları silerken bir hata oluştu. Yetkilendirmeleri kontrol edin.', ephemeral: true });
        }
    }
};
