import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  async getUser(userId: string) {
    console.log(userId);
    return 'day la user ser vice';
  }
}
