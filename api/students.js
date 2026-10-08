import { pool } from "./_db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { rows } = await pool.query(
        "SELECT * FROM students ORDER BY id DESC"
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { full_name, admission_no, class_name } = req.body;
      const { rows } = await pool.query(
        "INSERT INTO students (full_name, admission_no, class_name) VALUES ($1, $2, $3) RETURNING *",
        [full_name, admission_no, class_name]
      );
      return res.status(201).json(rows[0]);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
