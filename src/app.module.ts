import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websockets/websocket.module';
import { ProductModule } from './routers/product/product.module';
import { PaymentModule } from './routers/payment/payment.module';

@Module({
  imports: [
    // Module Socket
    WebsocketModule,

    // Module Controller
    ProductModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
