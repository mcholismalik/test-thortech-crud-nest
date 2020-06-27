import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
  UpdateEvent,
  Connection,
} from 'typeorm'
import { User } from 'src/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    connection: Connection,
    private readonly usersService: UsersService,
  ) {
    connection.subscribers.push(this)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return User
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    await this.usersService.sendMessageTelegraf(event.entity)
  }

  async afterUpdate(event: UpdateEvent<User>): Promise<void> {
    await this.usersService.sendMessageTelegraf(event.entity)
  }
}
