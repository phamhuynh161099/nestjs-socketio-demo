import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { PaymentGateway } from "./payment.gateway";
import { ProductDashboardGateway } from "./product-dashboard.gateway";

@Module({
    providers: [ChatGateway, PaymentGateway, ProductDashboardGateway],
    exports: [ChatGateway, PaymentGateway, ProductDashboardGateway]
})
export class WebsocketModule { }