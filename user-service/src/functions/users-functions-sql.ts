import { Observable } from 'rxjs';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

export interface IGetUserByConditionSql {
  skip?: number;
  limit?: number;
  orderby?: string;
  id?: string;
  email?: string;
}

export interface IPayloadUpdateUser {
  id: string;
  password?: string;
  refresh_token?: string;
  updated_by: {
    id: string;
    email: string;
  };
}

export interface IPayloadDeleteUser {
  id: string;
  deleted_by: {
    id: string;
    email: string;
  };
}

export const getUserByConditionSql = (
  condition: IGetUserByConditionSql,
  databaseService: DatabaseService,
): Observable<any[]> => {
  const skip = condition.skip ? condition.skip : 'NULL';
  const limit = condition.limit ? condition.limit : 'NULL';
  const orderby = condition.orderby ? `'${condition.orderby}'` : 'NULL';
  const id = condition.id ? `'${condition.id}'` : 'NULL';
  const email = condition.email ? `'${condition.email}'` : 'NULL';
  const querySQL = `SELECT * FROM get_users_by_condition(${skip},${limit},${orderby},${id},${email})`;
  return databaseService.query(querySQL);
};

export const registerUserSql = <T extends RegisterUserDto>(
  payload: T,
  databaseService: DatabaseService,
): Observable<any[]> => {
  const querySQL = `SELECT register('${payload.email}','${payload.username}','${payload.password}')`;
  console.log(querySQL);
  return databaseService.query(querySQL);
};

export const countRecords = (
  tableName: string,
  databaseService: DatabaseService,
): Observable<any[]> => {
  const querySQL = `SELECT countRecord('${tableName}')`;
  return databaseService.query(querySQL);
};

export const updateUser = (
  payload: IPayloadUpdateUser,
  databaseService: DatabaseService,
): Observable<any> => {
  const querySQL = `
      SELECT updateUser(
        '${payload.id}',${payload.password ? `'${payload.password}'` : 'NULL'} ,${payload.refresh_token ? `'${payload.refresh_token}'` : 'NULL'}, '${JSON.stringify(payload.updated_by)}'
      )
    `;
  return databaseService.query(querySQL);
};

export const softDelete = (
  payload: IPayloadDeleteUser,
  databaseService: DatabaseService,
): Observable<any> => {
  const query = `SELECT softDelete('${payload.id}', '${JSON.stringify(payload.deleted_by)}')`;
  return databaseService.query(query);
};
