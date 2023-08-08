import {Module} from "@nestjs/common";
import { HelloController } from "./hello.controller";

@Module({
    //배열 형태
    controllers: [HelloController], 
})
export class HelloModule {}