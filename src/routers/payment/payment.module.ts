import { Module } from "@nestjs/common";
import { WebsocketModule } from "src/websockets/websocket.module";
import { PaymentController } from "./payment.controller";

@Module({
    imports: [WebsocketModule],
    controllers: [PaymentController],
    providers: [],
    exports: []
})
export class PaymentModule { }