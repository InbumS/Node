import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  //기본키
  @PrimaryGeneratedColumn()
  id?: number; //?는 객체 생성 시 선택값

  // 중복일 시 Error 발생
  @Column({ unique: true })
  email: string;

  @Column({nullable: true})
  password: string;

  @Column()
  username: string;
  //기본값
  @Column({ default: true })
  createdDt: Date = new Date();

  @Column({nullable: true})
  proverId: string;
}
