import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../../repositories/user.repository'
import { User } from '../../entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/udpate-user.dto'
import { TelegrafService } from 'src/lib/telegraf/telegraf.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private telegrafService: TelegrafService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id)
    if (!found) throw new NotFoundException(`User with ID "${id}" not found`)

    return found
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, telegramUser } = createUserDto

    const user = new User()
    user.username = username
    user.password = password
    user.telegramUser = telegramUser
    await user.save()

    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, password } = updateUserDto

    const user = await this.getUserById(id)
    if (username) user.username = username
    if (password) user.password = password
    await user.save()

    return user
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id)
    if (result.affected === 0)
      throw new NotFoundException(`User with ID "${id}" not found`)
  }

  async sendMessageTelegraf(user: User): Promise<void> {
    const message = JSON.stringify({ method: 'Insert', payload: user })
    return await this.telegrafService.sendMessage(user.telegramUser, message)
  }
}
