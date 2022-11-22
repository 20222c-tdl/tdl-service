import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalCommunityAuthGuard extends AuthGuard('community') {}
