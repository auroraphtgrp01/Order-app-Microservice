import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto, queryParamsOrders } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Observable, first, map } from 'rxjs';
import { sendMessageToKafka } from '../../src/utils/sendMessageToKafka';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) { }
  createOrder(createOrderDto: CreateOrderDto) {
    return sendMessageToKafka(
      this.orderClient,
      'create-new-order',
      JSON.stringify(createOrderDto),
    );
  }

  findAllProduct(queryString: queryParamsOrders): Observable<any> {
    return sendMessageToKafka(
      this.orderClient,
      'get-product-with-condition',
      JSON.stringify(queryString),
    );
  }

  findOneProduct(id: string) {
    return sendMessageToKafka(this.orderClient, 'find-one-product', id).pipe(
      map((product) => product[0]),
    );
  }

  getAllOrders() {
    return sendMessageToKafka(this.orderClient, 'get-all-orders', '');
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  initDB() {
    return sendMessageToKafka(this.orderClient, 'init-db-order', '');
  }

  async onModuleInit() {
    this.orderClient.subscribeToResponseOf('get-product-with-condition');
    this.orderClient.subscribeToResponseOf('find-one-product');
    this.orderClient.subscribeToResponseOf('create-new-order');
    this.orderClient.subscribeToResponseOf('get-all-orders');
    this.orderClient.subscribeToResponseOf('init-db-order');
    await this.orderClient.connect();
  }
}
