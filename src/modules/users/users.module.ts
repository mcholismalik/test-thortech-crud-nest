import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../../repositories/user.repository'
import { TelegrafModule } from 'src/lib/telegraf/telegraf.module'
import { UserSubscriber } from 'src/subsribers/user.subscriber'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), TelegrafModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
})
export class UsersModule {}
