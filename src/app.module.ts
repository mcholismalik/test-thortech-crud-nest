import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { TelegrafService } from './lib/telegraf/telegraf.service'
import { UserSubscriber } from './subsribers/user.subscriber'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [AppController],
  providers: [TelegrafService, UserSubscriber],
})
export class AppModule {}
