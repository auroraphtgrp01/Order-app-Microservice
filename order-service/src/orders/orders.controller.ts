import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  ICreateOrderPayload,
  queryParamsOrders,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('get-product-with-condition')
  findAll(@Payload() queryString: queryParamsOrders) {
    return this.ordersService.getProductWithCondition(queryString);
  }

  @MessagePattern('find-one-product')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('create-new-order')
  update(@Payload() createOrderDto: ICreateOrderPayload) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @MessagePattern('get-all-orders')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  @MessagePattern('init-db-order')
  initDB() {
    return this.ordersService.InitDB();
  }
}
