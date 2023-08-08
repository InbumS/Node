import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

// 시작함수 bootstrap이 관례
async function bootstrap(){
    const app = await NestFactory.create(HelloModule);
    //express의 listen 함수
    await app.listen(3000, ()=>{console.log ("서버 시작!");});

}

bootstrap();