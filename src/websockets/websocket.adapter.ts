import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io"
import { ServerOptions, Socket } from "socket.io";

export class WebsocketAdapter extends IoAdapter {
    constructor(app: INestApplicationContext) {
        super(app)
        //this. service = app.get(servce)
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: "*",
                credentials: true
            }
        });

        const authMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
            console.log(socket.handshake);
            // const {authoriztion} = socket.handshake.headers;
            // if (!authoriztion) {
            //     return next(new Error('Unauthorized'))
            // }
            /**
             *Xu ly token o day
             */
            console.log(`Client connected: ${socket.id}`);
            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            })
            next();
        }

        server.use((socket, next) => {
            authMiddleware(socket, next).then(() => { }).catch((err) => { })
        })


        server.of('payment').use((socket, next) => {
            authMiddleware(socket, next).then(() => { }).catch((err) => { })
        });
        server.of('chat').use((socket, next) => {
            authMiddleware(socket, next).then(() => { }).catch((err) => { })
        });
        server.of('/').use((socket, next) => {
            authMiddleware(socket, next).then(() => { }).catch((err) => { })
        });

        return server;
    }
}