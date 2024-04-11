import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { queryParamsUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern('get-user-by-condition')
  async findAll(@Payload() queryString: queryParamsUser) {
    return await this.usersService.findAll(queryString);
  }

  @MessagePattern('find-user-by-id')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('update-a-user')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('soft-delete-user')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern('register-user')
  register(@Payload() registerBody: RegisterUserDto) {
    return this.usersService.register(registerBody);
  }

  @MessagePattern('update-refesh-token')
  updateRefreshToken(@Payload() payload: { user: any; token: string }) {
    console.log(payload);

    return this.usersService.updateRefreshToken(payload);
  }

  @MessagePattern('create-table-user')
  handleGetUser() {
    return this.usersService.createTableUser();
  }
}
