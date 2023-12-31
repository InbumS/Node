/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  // Session 이메일 정보 저장
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
