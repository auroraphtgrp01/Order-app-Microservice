import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ErorrHandlerInterceptor } from './interceptors/errorHandler.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
          clientId: 'api-gateway',
        },
        consumer: {
          groupId: 'order-services',
        },
      },
    },
  );
  app.useGlobalInterceptors(new ErorrHandlerInterceptor());
  await app.listen();
}
bootstrap();
