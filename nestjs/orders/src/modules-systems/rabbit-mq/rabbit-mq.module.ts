import { Global, Inject, Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from 'src/common/constants/app.constants';
import { EMAIL_SERVICE } from 'src/common/constants/rabbit-mq.constants';

@Global()
@Module({
  imports: [
    //tạo ra sender để gửi message đến RabbitMQ
    ClientsModule.register([
      {
        name: EMAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL as string],
          queue: 'email_queue',
          queueOptions: {
            durable: true, // nếu server restart/down thì queue sẽ không bị mất
          },
          socketOptions: {
            connectionOption: {
              ClientProperties: {
                connection_name: 'email-send',
              },
            },
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {
  constructor(@Inject(EMAIL_SERVICE) private client: ClientProxy) {}
  async onModuleInit() {
    try {
      const result = await this.client.connect();
      console.log(
        '✅ [RABBITMQ] Connection has been established successfully.',
      );
    } catch (error) {
      console.log('❌ [RABBITMQ] Failed to connect.', error);
    }
  }
}
