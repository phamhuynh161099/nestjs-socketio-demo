import { Controller, Get, Param } from "@nestjs/common";
import { PaymentGateway } from "src/websockets/payment.gateway";
import { ProductDashboardGateway } from "src/websockets/product-dashboard.gateway";

@Controller('payment')
export class PaymentController {

    constructor(
        private readonly paymentGateway: PaymentGateway
    ) { }

    @Get('send-to-personal/:id')
    sendToPersonal(@Param('id') id: string) {
        try {
            // console.log('serverWss', this.productDashboardGateway.server)
            this.paymentGateway.server.to(id).emit('send-to-personal', {
                message: 'sent-to-private-room'
            })
        } catch (error) {
            console.log(error)
        }

        return {
            id: `${id}`
        }
    }


    @Get('send-to-public-room')
    sendToPublicRoom() {
        try {
            // console.log('serverWss', this.productDashboardGateway.server)
            this.paymentGateway.server.to('public-room').emit('s2c_send-message-something', {
                message: '>>>> >>>> >>>>'
            })
        } catch (error) {
            console.log(error)
        }

        return {
           status: 'success'
        }
    }


    @Get('get-size-room')
    getSizeRoom() {
        try {
            // console.log('serverWss', this.productDashboardGateway.server)
            
        } catch (error) {
            console.log(error)
        }

        return {
           status: 'success'
        }
    }

}