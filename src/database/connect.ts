import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

export default async function getDBClient(): Promise<Client> {
  const client = new Client({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: true,
  });
  await client.connect();
  return client;
}
