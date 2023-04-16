import { Redis } from "ioredis";

//Creating a Redis Client Instance 

const redisClient = new Redis();

//Helper function to get data from Redis .

async function getDataFromCache(key: string): Promise<any>{
    const cachedData = await redisClient.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return null;
}

// Helper function to set data to Redis .

async function setDataTocache(key: string, data: any, expirationTimeSeconds: number = 3600): Promise<any>{
    const serializedData = JSON.stringify(data);
    await redisClient.set(key, serializedData,"EX",expirationTimeSeconds);
}

export { redisClient, getDataFromCache, setDataTocache}