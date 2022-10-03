import { User } from "src/auth/models/user.interface";
import { Question } from "src/question/models/question.interface";

export interface Category {
    id?:number;
    title?: string;
    discription?:string;
    //questions?: Question[];
    trainer?:User;
}