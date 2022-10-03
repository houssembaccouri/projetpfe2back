import { QuestionEntity } from "src/question/models/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AnserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    anser:string;

    @Column()
    istrue:boolean;

    @ManyToOne(type => QuestionEntity, (question: QuestionEntity) => question.ansers, {onUpdate: 'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'question_id'})
    question: QuestionEntity;
}
