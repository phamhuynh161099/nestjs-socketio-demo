import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ namespace: 'payment' })
export class PaymentGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send-money')
    handleMessage(@MessageBody() message: string): void {
        console.log('io/money', message);

        this.server.emit('receive-money', {
            message: `Jong Gun - ${message}`,
            from: "server"
        });

        this.server.emit('message', message);
    }

}