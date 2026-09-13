import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/modules-systems/prisma/prisma.service';
import { EMAIL_SERVICE } from 'src/common/constants/rabbit-mq.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const orderNew = await this.prisma.orders.create({
      data: {
        userId: createOrderDto.userId,
        foodId: createOrderDto.foodId,
      },
      include: {
        Users: true,
        Foods: true,
      },
    });
    // emit: vẫn send message đến RabbitMQ để gửi email, nhưng không quan trọng việc nhận phản hồi từ service email
    // @eventpattern để nhận message
    this.client.emit('create_email', orderNew);
    console.log(createOrderDto, orderNew);

    return true;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
