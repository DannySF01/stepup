"use client";
import { useState } from "react";

export default function CustomersTable({
  profiles,
}: {
  profiles: any[] | null;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm border rounded-md pr-12 pl-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow focus:border-accent hover:border-accent"
          placeholder="Pesquisar..."
        />
      </div>
      <div>
        {profiles?.map((profile) => (
          <div
            key={profile.id}
            className="grid grid-cols-3 gap-3 p-6 hover:bg-muted/50 cursor-pointer"
          >
            <img
              className="w-12 aspect-square rounded-full object-cover"
              src={profile.avatar_url || ""}
            />
            <p>{profile.name}</p>
            <p>{profile.email || "Sem endereço de email"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
