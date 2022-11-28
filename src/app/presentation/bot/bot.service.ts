import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit(): any {
    this.botMessage();
  }

  botMessage() {
    process.env.NTBA_FIX_319 = '1';
    const TelegramBot = require('node-telegram-bot-api');

    const token = process.env.TELEGRAM_BOT_TOKEN;

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      const text = msg.text.toString().toLowerCase();
      const chatId = msg.from.id

      switch (text) {
        case '/start':
          bot.sendMessage(chatId, `Hello ${msg.from.first_name} what would you like to know about me?`);
          break;
        default:
          bot.sendMessage(chatId, `I didn't understand this: "${msg.text}"`);
      }
    })
  }
}
