import dns from "node:dns";
import { MongoClient } from "mongodb";


if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI .env.local file-e nai");
}

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db();