import { Queue } from "bullmq";
import IORedis from "ioredis";
import redis from "../redis";

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

export const myQueue = new Queue("myQueue", { connection });

export async function addJob(data: any) {
  await myQueue.add("jobName", data);
}
