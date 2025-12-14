import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddContact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: "Doctor",
    description: "",
  });

  const submit = async () => {
    await supabase.from("contacts").insert(form);
    alert("Contact added");
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <select
        className="border p-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="Doctor">Doctor</option>
        <option value="Maid">Maid</option>
        <option value="Food">Food / Tiffin</option>
        <option value="Salon">Salon</option>
        <option value="Electrician">Electrician</option>
        <option value="Plumber">Plumber</option>
        <option value="Grocery">Grocery</option>
        <option value="Others">Others</option>
      </select>

      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={submit} className="bg-black text-white p-2">
        Submit
      </button>
    </div>
  );
}
