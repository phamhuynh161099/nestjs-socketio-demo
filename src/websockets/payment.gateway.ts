import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: 'payment' })
export class PaymentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('ChatGateway');

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        this.logger.log('--Initialize ChatGateway!');
    }

    handleConnection(client: Socket, ...args: any[]) {
        /**
         * Tự động join room personal
         */
        //* get fake userId
        let userId = client.data.user.fake_id
        client.join(`personal-${userId}`);

        /**
         * Tham gia public room
         */
        client.join('public-room');
        this.server.to('public-room').emit('new-user-join-room', {
            message: `${userId} join public room`
        })


        this.logger.log(`--Client connected: ${client.id} / personal-${userId}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`--Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('send-money')
    handleMessage(@MessageBody() message: string): void {
        console.log('io/money', message);

        this.server.emit('receive-money', {
            message: `Jong Gun - ${message}`,
            from: "server"
        });

        this.server.emit('message', message);
    }


    @SubscribeMessage('send-message-to-public-room')
    sendMessageToPublicRoom(@MessageBody() message: string,@ConnectedSocket() client: Socket,) {
        console.log('io/money', message);

        this.server.to('public-room').emit('s2c_send-message-something', {
            message: `Jong Gun - ${message}`,
            from: "server"
        });



        client.emit('s2c_send-message-something', {
            message : "Bạn đã gửi tin nhắn thành công"
        });
        return {
            message: 'success'
        }
    }

}