import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { WebsocketModule } from "src/websockets/websocket.module";

@Module({
    imports: [WebsocketModule],
    controllers: [ProductController],
    providers: [],
    exports: []
})
export class ProductModule { }