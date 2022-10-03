
import { Category } from "src/category/models/category.interface";
import { Role } from "./role.enum";

export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: Role;
    categories?: Category[];

}