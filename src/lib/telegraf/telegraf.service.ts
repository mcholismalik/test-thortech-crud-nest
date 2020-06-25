import { Injectable, OnModuleInit } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { TOKEN } from 'src/config/telegraf.config'

@Injectable()
export class TelegrafService implements OnModuleInit {
  private bot: any

  onModuleInit(): void {
    this.init()
  }

  init(): void {
    this.bot = new Telegraf(TOKEN)
    this.bot.start(ctx => ctx.reply('Welcome to crud api nestjs bot'))
    this.bot.launch()
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    return await this.bot.telegram.sendMessage(chatId, message)
  }
}
