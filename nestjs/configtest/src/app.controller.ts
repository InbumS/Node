import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private Configservice: ConfigService) {}

  @Get()
  getHello(): string {
    //값을 메시지에 할당
    const message = this.Configservice.get('MESSAGE');
    return message;
  }

  @Get('service-url') //service-url로 라우팅 될때 getServiceUrl function execute
  getServiceUrl(): string {
    return this.Configservice.get('SERVICE_URL');
  }

  @Get('db-info')
  getTest(): string {
    console.log(this.Configservice.get('loglevel'));
    console.log(this.Configservice.get('apiVersion'));
    return this.Configservice.get('dbInfo');
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.Configservice.get('redis.hots')}:${this.Configservice.get(
      'redis.port',
    )}`;
  }
}
