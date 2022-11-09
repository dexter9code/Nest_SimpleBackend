import { Report } from './../reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default:true})
  admin:boolean

  @OneToMany(()=>Report,(report)=>report.user)  //1.what of assiocation is ex report and its wrap around the function because of circular dependcy at that time Report entity is not load up therefore we need callBack function
  repots:Report[]

  @AfterInsert() //hooks which run after instance of entity is created
  logInsert() {
    console.log(`Inserted user Id ${this.id}`);
  }

  @AfterRemove()
  logDelete() {
    console.log(`Deleted User Id ${this.id}`);
  }
}
