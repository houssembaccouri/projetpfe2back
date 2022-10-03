
import { CategoryEntity } from "src/category/models/category.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('user')
export class UserEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ nullable: true})
firstname: string;

@Column({ nullable: true})
lastname:string;

@Column( {unique: true})
email:string;

@Column({ select: false})
password: string


@Column({type: 'enum', enum: Role, default: Role.USER})
role: Role;

@BeforeInsert()
emailToLowerCase(){
    this.email = this.email.toLowerCase();
}

@OneToMany( () => CategoryEntity , (category: CategoryEntity) => category.trainer)
categories: CategoryEntity[];



}