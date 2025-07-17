import { Controller, Get, Param } from "@nestjs/common";
import { ProductDashboardGateway } from "src/websockets/product-dashboard.gateway";

@Controller('product')
export class ProductController {

    constructor(
        private readonly productDashboardGateway: ProductDashboardGateway
    ) { }

    @Get('send-new-reques/:id')
    findAll(@Param('id') id: string) {
        try {
            // console.log('serverWss', this.productDashboardGateway.server)
            this.productDashboardGateway.server.to(id).emit('new-request-add-product-suucess', {
                message: 'Pls Update it'
            })
        } catch (error) {
            console.log(error)
        }

        return {
            id: `${id}`
        }
    }

}