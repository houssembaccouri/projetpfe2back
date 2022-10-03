import { Question } from "src/question/models/question.interface";

export interface Anser{
    id?:number;
    anser?:string;
    istrue?:boolean;
    question?:Question;
}