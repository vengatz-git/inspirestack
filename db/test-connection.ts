import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

async function main() {
  const sql = postgres(process.env.DATABASE_URL!);

  const result = await sql`select version()`;

  console.log(result);

  await sql.end();
}

main().catch(console.error);