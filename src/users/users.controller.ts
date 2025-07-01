import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSvc: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersSvc.create(dto);
  }


  @Get(':id/messages')
  findMessages(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.findMessages(id);
  }
}