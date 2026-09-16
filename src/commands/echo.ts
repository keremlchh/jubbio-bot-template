import { CommandInteraction } from '@jubbio/core';
import { BotClient } from '../client/BotClient';

export const command = {
    data: {
        name: 'echo',
        description: 'Bota istediğiniz bir mesajı yazdırır.',
        options: [
            {
                name: 'mesaj',
                description: 'Yazdırılacak mesaj',
                type: 3, // String olması gerekiyor
                required: true
            }
        ]
    },
    async execute(interaction: CommandInteraction, client: BotClient) {
        const message = interaction.options.getString('mesaj') || 'Mesaj belirtilmedi.';
        await interaction.reply({ content: message });
    }
};
