import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './modules-microservices/orders/orders.module';
import { PrismaModule } from './modules-systems/prisma/prisma.module';
import { RabbitMqModule } from './modules-systems/rabbit-mq/rabbit-mq.module';

@Module({
imports: [OrdersModule, PrismaModule, RabbitMqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
