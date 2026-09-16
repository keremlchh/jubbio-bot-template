import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';
import { bot_name } from '../../config.json';

export const command = {
    data: {
        name: 'userinfo',
        description: 'Bir kullanıcının bilgilerini gösterir.',
        options: [
            {
                name: 'kullanıcı',
                description: 'Bilgilerini görmek istediğiniz kullanıcı',
                type: 6, // User
                required: false
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        const targetUser = interaction.options.getUser('kullanıcı') || interaction.user;

        if (!targetUser) {
            return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple || 0x5865F2)
            .setTitle('👤 Kullanıcı Bilgileri')
            .setThumbnail(targetUser.displayAvatarURL() || '')
            .addFields(
                { name: 'Kullanıcı Adı', value: targetUser.username || 'Bilinmiyor', inline: true },
                { name: 'ID', value: targetUser.id || 'Bilinmiyor', inline: true },
                { name: 'Bot Mu?', value: targetUser.bot ? 'Evet 🤖' : 'Hayır 🧑', inline: true }
            )
            .setFooter({ text: bot_name || 'Ratina Bot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
