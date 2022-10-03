
import { UserEntity } from "src/auth/models/user.entity";
import { QuestionEntity } from "src/question/models/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    discription:string;

    /*@OneToMany( () => QuestionEntity , (question: QuestionEntity) => question.category)
    questions: QuestionEntity[];*/

    
    @ManyToOne(type => UserEntity, (category: UserEntity) => category.categories, {onUpdate: 'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    trainer: CategoryEntity;

}


