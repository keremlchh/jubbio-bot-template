import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'serverinfo',
        description: 'Bulunduğunuz mekanın (sunucunun) bilgilerini gösterir.',
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        const guild = interaction.guild;

        if (!guild) {
            return interaction.reply({ content: 'Bu komut sadece sunucularda kullanılabilir.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple || 0x5865F2)
            .setTitle('🏰 Sunucu Bilgileri')
            .setThumbnail(guild.iconURL() || '')
            .addFields(
                { name: 'Sunucu Adı', value: guild.name || 'Bilinmiyor', inline: true },
                { name: 'Sunucu ID', value: guild.id || 'Bilinmiyor', inline: true },
                { name: 'Üye Sayısı', value: `${guild.memberCount || 0}`, inline: true }
            )
            .setFooter({ text: 'Ratina Bot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
