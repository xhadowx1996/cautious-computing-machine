import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesSvc: MessagesService) {}

  // POST /messages
  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesSvc.create(dto);
  }
}