"use client";

import { useState } from "react";

export default function Generator() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  //Generate AI content
  const generate = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          tone: "Professional",
          length: "medium",
          cinematicMode: true,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Generation failed");
      }

      setResult(data.data.content);
    } catch (err) {
      console.error(err);
      alert("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = async () => {
    try {
      if (!result) {
        alert("No content to save");
        return;
      }

      setSaving(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic, 
          tone: "Professional",
          length: "medium",
          content: result,
          wordCount: result.split(" ").length,
          readingTime: Math.ceil(result.split(" ").length / 200),
          cinematicMode: true,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Save failed");
      }

      alert(" Saved to history!");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert(" Failed to save");
    } finally {
      setSaving(false);
    }
  };

  //  Download PDF
  const downloadPDF = async () => {
    try {
      if (!result) {
        alert("No content to download");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: result }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${(topic || "blog")
        .slice(0, 30)
        .replace(/\s+/g, "-")}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF ERROR:", err);
      alert("PDF download failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Content Studio </h1>

      {/* Input */}
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
        className="border p-2 w-full mb-3"
      />

      {/* Generate Button */}
      <button
        onClick={generate}
        className="bg-black text-white px-4 py-2 mr-2"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Save Button */}
      <button
        onClick={saveToHistory}
        className="bg-blue-600 text-white px-4 py-2 mr-2"
      >
        {saving ? "Saving..." : "Save"}
      </button>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-4 py-2"
      >
        Download PDF
      </button>

      {/* Result */}
      <div className="mt-5 whitespace-pre-wrap border p-3">
        {result}
      </div>
    </div>
  );
}