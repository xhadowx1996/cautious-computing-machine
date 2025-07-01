import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: data.content,
        user: { connect: { id: data.userId } },
      },
    });
  }
}