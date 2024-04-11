import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, queryParamsUser } from './dto/users.dto';
import { Observable } from 'rxjs';
import { Public } from '../../src/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  findAll(@Query() queryString: queryParamsUser): Observable<any> {
    return this.usersService.findAll(queryString);
  }
  @Public()
  @Get('/init-db')
  createTable() {
    return this.usersService.createTable();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  deleteAUser(@Param('id') id: string): Observable<any> {
    return this.usersService.deleteAUser(id);
  }
  @Patch()
  updateAUser(@Body() updateUserDto: UpdateUserDto): Promise<Observable<any>> {
    return this.usersService.updateAUser(updateUserDto);
  }
}
