import dotenv from "dotenv";

dotenv.config();

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import { topics } from "./schema";

const client = postgres(process.env.DATABASE_URL!);

const db = drizzle(client, {
  schema,
});

const DEFAULT_TOPICS = [
  { name: "Programming", slug: "programming" },
  { name: "Web Development", slug: "web-development" },
  { name: "Mobile Development", slug: "mobile-development" },
  { name: "UI Design", slug: "ui-design" },
  { name: "UX Design", slug: "ux-design" },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
  },
  { name: "Technology", slug: "technology" },
  { name: "Photography", slug: "photography" },
  { name: "Nature", slug: "nature" },
  { name: "Travel", slug: "travel" },
  { name: "Food", slug: "food" },
  { name: "Architecture", slug: "architecture" },
  {
    name: "Interior Design",
    slug: "interior-design",
  },
  { name: "Gaming", slug: "gaming" },
  { name: "Anime", slug: "anime" },
  { name: "Movies", slug: "movies" },
  { name: "Music", slug: "music" },
  { name: "Books", slug: "books" },
  { name: "Fitness", slug: "fitness" },
  { name: "Science", slug: "science" },
  { name: "DIY", slug: "diy" },
  { name: "Fashion", slug: "fashion" },
  { name: "Art", slug: "art" },
  { name: "Illustration", slug: "illustration" },
];

async function seedTopics() {
  console.log("🌱 Seeding topics...");

  // Connection test
  const existingTopics = await db.select().from(topics);

//   console.log(
//     `📚 Existing topics: ${existingTopics.length}`,
//   );

  await db
    .insert(topics)
    .values(DEFAULT_TOPICS)
    .onConflictDoNothing();

  console.log("✅ Topics seeded.");
}

async function main() {
  await seedTopics();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });