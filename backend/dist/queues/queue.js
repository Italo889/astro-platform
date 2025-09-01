"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myQueue = void 0;
exports.addJob = addJob;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const connection = new ioredis_1.default(process.env.REDIS_URL || "redis://localhost:6379");
exports.myQueue = new bullmq_1.Queue("myQueue", { connection });
async function addJob(data) {
    await exports.myQueue.add("jobName", data);
}
