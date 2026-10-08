import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});

export default async function handler(req, res) {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "database connected" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}