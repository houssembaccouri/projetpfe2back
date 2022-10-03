import { Options } from "@nestjs/common";
import { AnserEntity } from "src/anser/models/anser.entity";
import { CategoryEntity } from "src/category/models/category.entity";
import { Level } from "src/question/models/level.enum";
import { QuizEntity } from "src/quiz/models/quiz.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    question:string;


    @Column({ type:'enum', enum:Level,default: Level.EASY})
    level:Level;

    @ManyToOne(type => QuizEntity, (quiz: QuizEntity) => quiz.questions, {onUpdate: 'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'quiz_id'})
    quiz: QuizEntity;


    @OneToMany( () => AnserEntity , (anser: AnserEntity) => anser.question)
    ansers: AnserEntity[];


    
}
