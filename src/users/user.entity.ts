import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert() //hooks which run after instance of entity is created
  logInsert(){
    console.log(`Inserted user Id ${this.id}`)
  }

  @AfterRemove()
  logDelete(){
    console.log(`Deleted User Id ${this.id}`)
  }
}
