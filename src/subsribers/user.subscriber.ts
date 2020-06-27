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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return User
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    await this.sendMessageTelegraf('Insert', event.entity)
  }

  async afterUpdate(event: UpdateEvent<User>): Promise<void> {
    await this.sendMessageTelegraf('Update', event.entity)
  }

  async sendMessageTelegraf(method: string, user: User): Promise<void> {
    const message = JSON.stringify({ method, payload: user })
    return await this.telegrafService.sendMessage(user.telegramUser, message)
  }
}
