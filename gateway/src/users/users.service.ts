import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  RegisterUserDto,
  UpdateUserDto,
  queryParamsUser,
} from './dto/users.dto';
import { Observable } from 'rxjs';
import { sendMessageToKafka } from '../../src/utils/sendMessageToKafka';
import { hashPassword } from '../../src/utils/hashPassword';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}

  findAll(queryString: queryParamsUser): Observable<any> {
    return sendMessageToKafka(
      this.usersClient,
      'get-user-by-condition',
      JSON.stringify(queryString),
    );
  }

  findOne(id: string): Observable<any> {
    return sendMessageToKafka(this.usersClient, 'find-user-by-id', id);
  }

  registerUser(registerBody: RegisterUserDto) {
    return sendMessageToKafka(this.usersClient, 'register-user', registerBody);
  }

  deleteAUser(id: string) {
    return sendMessageToKafka(this.usersClient, 'soft-delete-user', id);
  }

  async updateAUser(updateUserDto: UpdateUserDto) {
    return sendMessageToKafka(this.usersClient, 'update-a-user', {
      ...updateUserDto,
      password: await hashPassword(updateUserDto.password),
    });
  }

  updateRefreshToken(payload: { user: any; token: string }) {
    return sendMessageToKafka(this.usersClient, 'update-refesh-token', payload);
  }

  createTable() {
    return sendMessageToKafka(this.usersClient, 'create-table-user', '');
  }

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf('get-user-by-condition');
    this.usersClient.subscribeToResponseOf('find-user-by-id');
    this.usersClient.subscribeToResponseOf('register-user');
    this.usersClient.subscribeToResponseOf('soft-delete-user');
    this.usersClient.subscribeToResponseOf('update-a-user');
    this.usersClient.subscribeToResponseOf('update-refesh-token');
    this.usersClient.subscribeToResponseOf('create-table-user');
    await this.usersClient.connect();
  }
}
