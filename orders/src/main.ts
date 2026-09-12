import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from './common/constants/app.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: [RABBITMQ_URL],
    queue: 'orders_queue',
    queueOptions: {
      durable: true
    },
     socketOptions: {
            connectionOption: {
              ClientProperties: {
                connection_name: 'order-on',
              },
            },
          },
  },
});

  await app.listen();
}
bootstrap();
