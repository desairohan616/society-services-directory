import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const { category } = useParams();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    supabase
      .from("contacts")
      .select("*")
      .eq("category", category)
      .then(({ data }) => setContacts(data || []));
  }, [category]);

  return (
    <div className="p-4">
      {contacts.map((c) => (
        <div key={c.id} className="border p-3 mb-3 rounded">
          <h3 className="font-bold">{c.name}</h3>
          <p>{c.description}</p>
          <div className="flex gap-4 mt-2">
            <a href={`tel:${c.phone}`} className="text-blue-600">
              Call
            </a>
            <a href={`https://wa.me/91${c.phone}`} className="text-green-600">
              WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
