import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateOrderDto,
  ICreateOrderPayload,
  queryParamsOrders,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import {
  createNewOrder,
  getAllOrders,
  getProductWithCondition,
} from 'src/functions/order-function-sql';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findOne(id: string) {
    return getProductWithCondition({ id: id }, this.databaseService);
  }

  createOrder(createOrder: ICreateOrderPayload) {
    console.log(createOrder);
    return createNewOrder(createOrder, this.databaseService);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  getProductWithCondition(queryString: queryParamsOrders): Observable<any> {
    return getProductWithCondition(queryString, this.databaseService);
  }
  getAllOrders() {
    return getAllOrders(this.databaseService);
  }
  InitDB() {
    return this.databaseService
      .queryDatabase('sql/order-model.create.sql')
      .subscribe({
        next: (value) => {
          this.databaseService
            .queryDatabase('sql/order-function.create.sql')
            .subscribe({
              next: (value) => {
                this.databaseService
                  .queryDatabase('sql/migrate.sql')
                  .subscribe();
              },
            });
        },
      });
  }
}
