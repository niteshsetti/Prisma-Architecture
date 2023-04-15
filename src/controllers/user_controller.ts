import { PrismaClient } from "@prisma/client";
import { User } from "src/interface/user_interface";
import { userNotFoundText } from "../utilities/app_constants";

const { user, } = new PrismaClient();

export async function getUsers() {
    return await user.findMany({
        select: {
            username:true,
            posts: {
                include: {
             categories:true,
         }
    },},},);
}

export async function getUserById(id: string) {
    const getUser:User | null = await user.findUnique({
        where: {
            id:parseInt(id),
        },
        include: {
            posts: {
                include: {
                    categories: {
                        select: {
                            name:true
                        }
                    }
                }
            }
        }
    });
    if (getUser == null) {
        throw new Error(userNotFoundText)
    }

    return getUser;
}

export async function createUser(username: string) {
    return await user.create({ data: { username: username, }, },);
}

module.exports = { getUsers, getUserById, createUser };