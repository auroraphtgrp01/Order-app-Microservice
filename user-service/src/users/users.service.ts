import { Injectable } from '@nestjs/common';
import { queryParamsUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import {
  IPayloadDeleteUser,
  countRecords,
  getUserByConditionSql,
  registerUserSql,
  softDelete,
} from 'src/functions/users-functions-sql';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  IPayloadUpdateUser,
  updateUser,
} from '../functions/users-functions-sql';
import { MESSAGES_RESPONSE } from 'src/constants/messages.constant';
import { RegisterUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(queryString: queryParamsUser): Promise<
    Observable<{
      data: any[];
      totalPage: number;
      limit: number;
      skip: number;
      orderBy: string;
    }>
  > {
    const totalRecord = (
      await lastValueFrom(countRecords('users', this.databaseService))
    )[0].countrecord;
    const totalPage = Math.ceil(totalRecord / queryString.limit) | totalRecord;
    const dataQuery = getUserByConditionSql(queryString, this.databaseService);
    const dataModified = dataQuery.pipe(
      map((data) => {
        return {
          data: data,
          totalPage: totalPage,
          limit: queryString.limit,
          skip: queryString.skip,
          orderBy: queryString.orderby || 'ASC',
        };
      }),
    );
    return dataModified;
  }

  findOne(id: string) {
    return getUserByConditionSql({ id: id }, this.databaseService);
  }

  async update(updateUserDto: UpdateUserDto): Promise<any> {
    const payload: IPayloadUpdateUser = {
      ...updateUserDto,
      updated_by: {
        email: 'minhtuanledng@gmail.com',
        id: 'hellohahaha',
      },
    };
    return await lastValueFrom(updateUser(payload, this.databaseService)).then(
      (res) => {
        return {
          message: MESSAGES_RESPONSE.UPDATED_SUCCESSFULLY,
        };
      },
      (err) => {
        return {
          messages: err.message,
        };
      },
    );
  }

  async remove(id: string): Promise<any> {
    const payload: IPayloadDeleteUser = {
      id,
      deleted_by: {
        email: 'minhtuanledng@gmail.com',
        id: 'hellohahaha',
      },
    };
    return await lastValueFrom(softDelete(payload, this.databaseService)).then(
      (res) => {
        return {
          message: MESSAGES_RESPONSE.DELETE_SUCCESSFULLY,
        };
      },
      (err) => {
        return {
          messages: err.message,
        };
      },
    );
  }

  updateRefreshToken({
    token,
    user,
  }: {
    token: string;
    user: any;
  }): Observable<string> {
    return updateUser(
      {
        id: user.id,
        updated_by: {
          email: user.email,
          id: user.id,
        },
        refresh_token: token,
      },
      this.databaseService,
    );
  }
  async register(registerBody: RegisterUserDto) {
    return registerUserSql(
      {
        ...registerBody,
      },
      this.databaseService,
    );
  }
  async createTableUser() {
    this.databaseService.queryDatabase('sql/user-model.create.sql').subscribe({
      next: (value: any) => {
        this.databaseService
          .queryDatabase('sql/users-function.create.sql')
          .subscribe();
      },
    });
  }
}
