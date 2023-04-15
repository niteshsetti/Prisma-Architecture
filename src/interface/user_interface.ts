import { Posts } from "./post_interface";


export interface User {
    id?: number;
    username?: String;
    posts?: Posts[];
}
