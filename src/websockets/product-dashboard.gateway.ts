import { Injectable } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@Injectable()
@WebSocketGateway({ namespace: 'product-dashboard' })
export class ProductDashboardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

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
}