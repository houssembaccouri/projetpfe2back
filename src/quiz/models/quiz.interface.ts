import { Question } from "src/question/models/question.interface";

export interface Quiz {
    id?:number;
    title?: string;
    discription?:string;
    questions?: Question[];
}