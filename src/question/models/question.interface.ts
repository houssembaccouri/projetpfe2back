import { Quiz } from "src/quiz/models/quiz.interface";
import { Level } from "./level.enum";

export interface Question {
    id?:number;
    question?:string;
    level?:Level;
    quiz?:Quiz;
}