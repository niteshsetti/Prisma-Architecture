import { PrismaClient } from "@prisma/client";

const { posts } = new PrismaClient();


export async function createPost(title: string, content: string, userId: number) {
    return await posts.create({ data: { title:title, content:content, user_id:userId } });
}

exports.module = {createPost}