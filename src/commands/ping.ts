import { CommandInteraction } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'ping',
        description: 'Botun anlık gecikme süresini (ping) gösterir.',
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        const sentTime = Date.now();
        await interaction.reply({ content: '🏓 Ölçülüyor...' });
        const latency = Date.now() - sentTime;

        await interaction.editReply({ content: `🏓 **Pong!**\n\n📡 Gecikme süresi: **${latency}ms**` });
    }
};
