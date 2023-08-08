import {Controller, Get} from "@nestjs/common";


@Controller() // 매개변수 경로 지정 가능
export class HelloController{
    //GET요청 데코레이터
    @Get()
    hello(){
        return "안녕하세요! NestJS로 만든 어플입니다"  
    }
}
