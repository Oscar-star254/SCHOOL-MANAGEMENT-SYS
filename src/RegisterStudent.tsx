import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Student = {
  id: number;
  full_name: string;
  admission_no: string;
  class_name: string | null;
};

export default function RegisterStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({
    full_name: "",
    admission_no: "",
    class_name: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadStudents() {
    const res = await fetch("/api/students");
    if (res.ok) setStudents(await res.json());
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Student saved.");
      setForm({ full_name: "", admission_no: "", class_name: "" });
      loadStudents();
    } else {
      setMessage(data.error || "Something went wrong.");
    }
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Register Student</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input
          name="full_name"
          placeholder="Full name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          name="admission_no"
          placeholder="Admission number"
          value={form.admission_no}
          onChange={handleChange}
          required
        />
        <input
          name="class_name"
          placeholder="Class (e.g. Form 1)"
          value={form.class_name}
          onChange={handleChange}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save student"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h3>Students ({students.length})</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.full_name} - {s.admission_no}{" "}
            {s.class_name && `(${s.class_name})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
