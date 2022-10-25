import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  getStatus(): string {
    return 'User Service is running!';
  }
}
