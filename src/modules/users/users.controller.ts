import {
  Controller,
  Param,
  Get,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './../../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: [CreateUserDto] })
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: [UpdateUserDto] })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
