import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websockets/websocket.module';
import { ProductModule } from './routers/product/product.module';

@Module({
  imports: [
    // Module Socket
    WebsocketModule,

    // Module Controller
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
