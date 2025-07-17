import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        console.log('init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`client connected: ${client.id}`);

    }

    handleDisconnect(client: any) {
        console.log(`client disconnected: ${client.id}`);
    }

    @SubscribeMessage('send-message')
    handleMessage(@MessageBody() message: string): void {
        console.log('io/message', message);

        this.server.emit('receive-message', {
            message: "Jong Gun",
            from: "server"
        });

        this.server.emit('message', message);
    }

}