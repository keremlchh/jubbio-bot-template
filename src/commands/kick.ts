import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'kick',
        description: 'Belirtilen kullanıcıyı mekandan atar.',
        options: [
            {
                name: 'kullanıcı',
                description: 'Atılacak kullanıcı',
                type: 6, // User
                required: true
            },
            {
                name: 'sebep',
                description: 'Atılma sebebi',
                type: 3, // String
                required: false
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        if (!interaction.guildId) {
            return interaction.reply({ content: 'Bu komut sadece mekanlarda kullanılabilir.', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanıcı');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

        if (!targetUser) {
            return interaction.reply({ content: 'Lütfen geçerli bir kullanıcı belirtin.', ephemeral: true });
        }

        try {
            await client.rest.kickMember(interaction.guildId, targetUser.id, reason);

            const embed = new EmbedBuilder()
                .setColor(Colors.Orange || 0xFFA500)
                .setTitle('👢 Kullanıcı Atıldı')
                .setDescription(`${targetUser.username} başarıyla mekandan atıldı.`)
                .addFields({ name: 'Sebep', value: reason })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Kick hatası:', error);
            await interaction.reply({ content: 'Kullanıcıyı atarken bir hata oluştu. Yetkilendirmeleri kontrol edin.', ephemeral: true });
        }
    }
};
