import postgres from "postgres";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL env is not set");
}

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export default sql;
