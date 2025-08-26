import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;
