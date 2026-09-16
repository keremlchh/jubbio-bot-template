import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'mute',
        description: 'Belirtilen kullanıcıyı belirli bir süre susturur (timeout).',
        options: [
            {
                name: 'kullanıcı',
                description: 'Susturulacak kullanıcı',
                type: 6, // User
                required: true
            },
            {
                name: 'süre',
                description: 'Susturma süresi (dakika cinsinden)',
                type: 4, // Integer
                required: true
            },
            {
                name: 'sebep',
                description: 'Susturma sebebi',
                type: 3, // String
                required: false
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        if (!interaction.guildId) {
            return interaction.reply({ content: 'Bu komut sadece sunucularda kullanılabilir.', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanıcı');
        const durationMinutes = interaction.options.getInteger('süre');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

        if (!targetUser) {
            return interaction.reply({ content: 'Lütfen geçerli bir kullanıcı belirtin.', ephemeral: true });
        }

        if (!durationMinutes || durationMinutes <= 0) {
            return interaction.reply({ content: 'Lütfen 0\'dan büyük geçerli bir süre belirtin.', ephemeral: true });
        }

        // Dakikayı saniyeye çeviriyoruz çünkü Jubbio API'si saniye cinsinden alıyor
        const durationSeconds = durationMinutes * 60;

        try {
            await client.rest.timeoutMember(interaction.guildId, targetUser.id, durationSeconds, reason);

            const embed = new EmbedBuilder()
                .setColor(Colors.Yellow || 0xFFFF00)
                .setTitle('🔇 Kullanıcı Susturuldu')
                .setDescription(`${targetUser.username} adlı kullanıcı başarıyla ${durationMinutes} dakika susturuldu.`)
                .addFields({ name: 'Sebep', value: reason })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Mute hatası:', error);
            await interaction.reply({ content: 'Kullanıcıyı sustururken bir hata oluştu. Yetkilendirmeleri kontrol edin.', ephemeral: true });
        }
    }
};
