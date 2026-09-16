import { CommandInteraction, EmbedBuilder, Colors } from '@jubbio/core';
import { BotClient } from '../client/BotClient';
import { bot_name } from '../../config.json'

export const command = {
    data: {
        name: 'botinfo',
        description: 'Bot hakkında detaylı istatistikleri ve bilgileri gösterir.',
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple || 0x5865F2)
            .setTitle("🚀" + bot_name || 'Ratina')
            .setDescription(bot_name + ', sunucunuzu daha interaktif, güvenli ve yönetilebilir kılmak için tasarlanmış yenilikçi bir platformdur. Topluluğunuza en iyi deneyimi sunmayı hedefliyoruz.')
            .setThumbnail(client.user?.displayAvatarURL() || '')
            .addFields(
                { name: '🎯 Amacımız', value: 'Kullanıcı dostu arayüz ve modern altyapımızla sunucu yönetimini karmaşıklıktan kurtarıp eğlenceli hale getirmek.', inline: false },
                { name: '✨ Özellikler', value: 'Gelişmiş moderasyon, sistem araçları, eğlence komutları ve çok daha fazlası. Sürekli güncellenen özelliklerle her zaman bir adım öndeyiz!', inline: false },
                { name: '🌟 Vizyonumuz', value: 'Jubbio ekosisteminde sınırları zorlayan, yaratıcı ve her topluluğun ihtiyacına özel çözümler üreten lider bot olmak.', inline: false }
            )
            .setFooter({ text: bot_name || 'Ratina Bot', iconURL: client.user?.displayAvatarURL() || '' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
