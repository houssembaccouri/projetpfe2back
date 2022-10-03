import { QuestionEntity } from "src/question/models/question.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    discription:string;

    @OneToMany( () => QuestionEntity , (question: QuestionEntity) => question.quiz)
    questions: QuestionEntity[];

}
