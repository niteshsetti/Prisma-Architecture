import { PrismaClient } from "@prisma/client";

const { categories } = new PrismaClient();


export async function createCategory(name: string, postId: number) {
    return await categories.create({ data: { name,  post_id:postId } });
}

exports.module = {createCategory}
