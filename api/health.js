const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});

module.exports = async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "database connected" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};