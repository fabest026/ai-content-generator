"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";  // Ensure your DB connection is correct
import { aiOuput } from "@/utils/schema";  // The Drizzle schema for aiOuput
import moment from "moment";
import { Button } from "@/components/ui/button";

export interface HistoryItem {
  id: number;
  templateSlug: string;
  aiResponse: string;
  createdAt: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await db.select().from(aiOuput);  // Fetch data from Drizzle
        setHistory(result);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">History</h1>
      <p className="text-sm text-gray-500 mb-5">Search your previously generated AI content</p>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Template</th>
              <th className="px-4 py-2">AI Response</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Words</th>
              <th className="px-4 py-2">Copy</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.templateSlug}</td>
                <td className="border px-4 py-2 truncate">{item.aiResponse.substring(0, 50)}...</td>
                <td className="border px-4 py-2">{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2">{item.aiResponse.split(" ").length}</td>
                <td className="border px-4 py-2">
                  <Button variant={"outline"}
                    onClick={() => navigator.clipboard.writeText(item.aiResponse)}
                    className="text-[#592564] hover:text-[#853296]"
                  >
                    Copy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
