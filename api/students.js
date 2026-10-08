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
      const { full_name, admission_no, class_name } = req.body || {};

      if (!full_name?.trim() || !admission_no?.trim()) {
        return res
          .status(400)
          .json({ error: "Full name and admission number are required." });
      }

      const { rows } = await pool.query(
        "INSERT INTO students (full_name, admission_no, class_name) VALUES ($1, $2, $3) RETURNING *",
        [full_name.trim(), admission_no.trim(), class_name?.trim() || null]
      );
      return res.status(201).json(rows[0]);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    if (e.code === "23505") {
      return res
        .status(409)
        .json({ error: "That admission number already exists." });
    }
    res.status(500).json({ error: e.message });
  }
}
