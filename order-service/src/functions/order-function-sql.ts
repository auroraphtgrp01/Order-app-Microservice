import { Observable, from, last, lastValueFrom, map } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import {
  ICreateOrderPayload,
  queryParamsOrders,
} from 'src/orders/dto/create-order.dto';

export const getProductWithCondition = (
  condition: queryParamsOrders,
  databaseService: DatabaseService,
): Observable<any[]> => {
  const orderby = condition.orderby ? `'${condition.orderby}'` : 'NULL';
  const id = condition.id ? `'${condition.id}'` : 'NULL';
  const name = condition.name ? `'%${condition.name}%'` : 'NULL';
  const skip = condition.skip ? condition.skip : 'NULL';
  const limit = condition.limit ? condition.limit : 'NULL';
  const querySQL = `SELECT * FROM get_product_by_condition(${id}, ${name}, ${orderby}, ${skip}, ${limit})`;
  console.log(querySQL);

  return databaseService.query(querySQL);
};

export const createNewOrder = async (
  payload: ICreateOrderPayload,
  databaseService: DatabaseService,
) => {
  const variants = await lastValueFrom(
    databaseService.queryDatabase('sql/join-variants.sql', [
      JSON.stringify(payload.variants),
    ]),
  );
  const total = variants.reduce((total, item) => {
    return total + item.price * item.quantities;
  }, 0);
  return databaseService.queryDatabase('sql/order-create.sql', [
    payload.userId,
    JSON.stringify(payload.variants),
    total,
  ]);
};

export const getAllOrders = async (databaseService: DatabaseService) => {
  const orders = await lastValueFrom(
    databaseService.query('SELECT * FROM orders'),
  );
  for (let order of orders) {
    for (let variant of order.variants) {
      const variantData = await lastValueFrom(
        databaseService.query(
          `SELECT variants.color, variants.type, variants.price FROM variants WHERE id = '${variant.id}'`,
        ),
      );
      variant.detail = variantData;
    }
  }
  return orders;
};
