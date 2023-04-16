import { PrismaClient } from "@prisma/client";
import { User } from "src/interface/user_interface";
import { userNotFoundText } from "../utilities/app_constants";
import { getDataFromCache, setDataTocache } from "../utilities/helper/redis_client";

const { user, } = new PrismaClient();

export async function getUsers() {
    const cacheKey = `all-users`;

     //Trying to get data from redis Cache 
    
    let allUsers = await getDataFromCache(cacheKey);

    if (!allUsers) {
         // If data is not in cache, get it from the database
        allUsers =  await user.findMany({
            select: {
                username: true,
                posts: {
                    include: {
                        categories: true,
                    }
                },
            },
        },);

         // Set the data in Redis cache for future use
        
        await setDataTocache(cacheKey, allUsers, 1500);
    }
    return allUsers;
}

export async function getUserById(id: string) {
    const cacheKey = `user-${id}`;

    let getUser: User | null = await getDataFromCache(cacheKey);
    
    if (!getUser) {
        getUser =  await user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                posts: {
                    include: {
                        categories: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        if (getUser == null) {
            throw new Error(userNotFoundText)
        }
        await setDataTocache(cacheKey, getUser, 1500);
    }

    return getUser;
}

export async function createUser(username: string) {
    return await user.create({ data: { username: username, }, },);
}

module.exports = { getUsers, getUserById, createUser };