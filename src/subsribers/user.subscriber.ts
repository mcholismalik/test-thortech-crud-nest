import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
  UpdateEvent,
  Connection,
} from 'typeorm'
import { User } from 'src/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { TelegrafService } from 'src/lib/telegraf/telegraf.service'

@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    connection: Connection,
    private readonly telegrafService: TelegrafService,
  ) {
    connection.subscribers.push(this)
  }

  listenTo() {
    return User
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    console.log(`After inserted `, event.entity)
    const message = JSON.stringify({ method: 'Insert', payload: event.entity })
    await this.telegrafService.sendMessage(event.entity.telegramUser, message)
  }

  async afterUpdate(event: UpdateEvent<User>): Promise<void> {
    console.log(`After updated `, event.entity)
    const message = JSON.stringify({ method: 'Update', payload: event.entity })
    await this.telegrafService.sendMessage(event.entity.telegramUser, message)
  }
}
