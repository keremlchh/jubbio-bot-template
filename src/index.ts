import dotenv from 'dotenv';
import { BotClient } from './client/BotClient';

// .env değişkenlerini yüklüyoruz
dotenv.config();

const client = new BotClient();

// Botu başlatıyoruz
client.initialize().catch(error => {
    console.error('[FATAL ERROR] Bot başlatılamadı:', error);
    process.exit(1);
});

// Yakalanmayan hatalar için özel log atıyoruz
process.on('unhandledRejection', (error) => {
    console.error('[UNHANDLED REJECTION]', error);
});
process.on('uncaughtException', (error) => {
    console.error('[UNCAUGHT EXCEPTION]', error);
});
