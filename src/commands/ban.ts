import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'ban',
        description: 'Belirtilen kullanıcıyı mekandan (sunucudan) yasaklar.',
        options: [
            {
                name: 'kullanıcı',
                description: 'Yasaklanacak kullanıcı',
                type: 6, // Kullanıcı
                required: true
            },
            {
                name: 'sebep',
                description: 'Yasaklama sebebi',
                type: 3, // String değer
                required: false
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        if (!interaction.guildId) {
            return interaction.reply({ content: 'Bu komut sadece sunucularda kullanılabilir.', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanıcı');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

        if (!targetUser) {
            return interaction.reply({ content: 'Lütfen geçerli bir kullanıcı belirtin.', ephemeral: true });
        }

        try {
            await client.rest.banMember(interaction.guildId, targetUser.id, {
                deleteMessageDays: 0,
                reason: reason
            });

            const embed = new EmbedBuilder()
                .setColor(Colors.Red || 0xFF0000)
                .setTitle('🔨 Kullanıcı Yasaklandı')
                .setDescription(`${targetUser.username} başarıyla mekandan yasaklandı.`)
                .addFields({ name: 'Sebep', value: reason })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Ban hatası:', error);
            await interaction.reply({ content: 'Kullanıcıyı yasaklarken bir hata oluştu. Yetkilendirmeleri kontrol edin.', ephemeral: true });
        }
    }
};
