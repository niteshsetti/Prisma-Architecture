import { Categories } from "./categories_interface";

export interface Posts{
    id?: Number;
    title?: String;
    created_at?: Date;
    updated_at?: Date;
    content?: String;
    categories?: Categories[];

}