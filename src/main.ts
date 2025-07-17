import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './websockets/websocket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WebsocketAdapter(app));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
