import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../src/orders/orders.controller';
import { OrdersService } from '../../src/orders/orders.service';
import { ClientKafka } from '@nestjs/microservices';

describe('OrdersController', () => {
    let controller: OrdersController;
    let orderService: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [OrdersService, {
                provide: 'ORDER_SERVICE',
                useClass: ClientKafka,
            },],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
        orderService = module.get<OrdersService>(OrdersService);
    });

    describe('findProductByID', () => {
        it('should return the product when a valid ID is provided', async () => {
            const mockProduct = {
                product_id: "9238d63b-24f4-4e69-8dd1-be9220fec2be",
                product_name: "Iphone 15 Pro",
                product_description: "Đây là Iphone 15 Pro",
                image_paths: [
                    "https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-hong-thumb-1-600x600.jpg"
                ],
                variants: [
                    {
                        id: "8c19b0b9-763a-44e8-89a1-47af12253ddf",
                        type: "256GB",
                        color: "Xanh",
                        price: "19220000",
                        quantities: 8
                    },
                    {
                        id: "9c44c8e0-a387-47e4-a573-b97e257819c8",
                        type: "128GB",
                        color: "Đỏ ",
                        price: "17000000",
                        quantities: 11
                    }
                ]
            }

            jest.spyOn(orderService, 'findOneProduct').mockResolvedValue(mockProduct as never);
            const productId = '9238d63b-24f4-4e69-8dd1-be9220fec2be';
            const foundProduct = await controller.findOne(productId);

            expect(foundProduct).toEqual(mockProduct);
        });

        it('should return null when an invalid ID is provided', async () => {
            jest.spyOn(orderService, 'findOneProduct').mockResolvedValue([] as never);

            const productId = 'e236146d-91c8-4b08-b362-2b797ba55dd2';
            const foundProduct = await controller.findOne(productId);

            expect(foundProduct).toEqual([]);
        });
    });

});
