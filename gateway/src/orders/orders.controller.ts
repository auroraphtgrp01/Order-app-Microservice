import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, queryParamsOrders } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Observable } from 'rxjs';
import { Public } from '../../src/decorators/auth.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Public()
  @Get('product')
  findAll(@Query() queryString: queryParamsOrders): Observable<any> {
    return this.ordersService.findAllProduct(queryString);
  }

  @Public()
  @Get('init-db')
  createTable() {
    return this.ordersService.initDB();
  }

  @Public()
  @Get('product/:id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneProduct(id);
  }

  @Get('')
  getAll() {
    return this.ordersService.getAllOrders();
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
