"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import ParticlesBg from "@/components/layout/ParticlesBg";
import { ToastContainer } from "@/components/ui/Toast";
import { useToast } from "@/hooks/index";
import { generateContent } from "@/lib/api";
import { TONES, LENGTHS, EXAMPLE_TOPICS } from "@/lib/constants";

function renderMarkdown(text: string): string {
  return text
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^([^<\n].+)$/gm, (m) => (m.startsWith("<") ? m : `<p>${m}</p>`));
}

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [cinematic, setCinematic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    content: string;
    wordCount: number;
    readingTime: number;
    tone: string;
    topic: string;
  } | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const [language, setLanguage] = useState("English");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && !typing) {
      setDisplayText("");
      setTyping(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < result.content.length) {
          setDisplayText(result.content.slice(0, i + 1));
          i++;
        } else {
          setTyping(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 8);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [result]);

  const handleGenerate = async () => {
    if (!topic.trim() || topic.length < 5) {
      addToast("Please enter a topic (at least 5 characters)", "warning");
      return;
    }
    setLoading(true);
    setResult(null);
    setDisplayText("");
    try {
      const data = await generateContent({
        topic,
        tone,
        length,
        cinematicMode: cinematic,
        language,          
      });
      setResult(data);
      addToast("Content generated successfully!", "success");
    } catch (err: unknown) {
      console.error(err);
      addToast("Generation failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    addToast("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!result || !outputRef.current) return;

    const html2pdf: any = (await import("html2pdf.js")).default;
    const fileName = (result.topic || topic || "content")
      .slice(0, 30)
      .replace(/\s+/g, "-");

    const tempElement = document.createElement("div");
    tempElement.className = "pdf-content-wrapper";
    tempElement.style.padding = "20px";
    tempElement.style.color = "black";
    tempElement.style.backgroundColor = "white";

    tempElement.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="background: #8b5cf6; color: white; border-radius: 9999px; padding: 3px 12px; font-size: 0.75rem;">${result.tone}</span>
        <span style="margin-left: 10px; color: #64748b; font-size: 0.8rem;">~${result.wordCount} words | ${result.readingTime} min read</span>
      </div>
      <div style="line-height: 1.7; color: black;">
        ${renderMarkdown(result.content)} 
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `${fileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(tempElement).save();
    addToast("Downloaded as PDF", "success");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <ParticlesBg />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            style={{
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem,4vw,2.2rem)",
              color: "#f8fafc",
              marginBottom: "0.4rem",
            }}
          >
            AI Content <span className="gradient-text">Generator</span>
          </h1>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>
            Describe your topic and let AI do the magic
          </p>
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}
          className="gen-grid"
        >
          {/* LEFT PANEL */}
          <motion.div
            className="glass-card"
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: 8,
                  display: "flex",
                  gap: 6,
                }}
              >
                <span>✦</span> Your Topic
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value.slice(0, 500))}
                placeholder="e.g. The future of AI in healthcare..."
                rows={4}
                className="glass-input"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  padding: "14px 16px",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  marginBottom: 10,
                  display: "block",
                }}
              >
                Writing Tone
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`tone-pill${tone === t ? " selected" : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="glass-input"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: "0.9rem",
                  fontFamily: "DM Sans, sans-serif",
                  background: "rgba(0, 0, 0, 0.88)",
                  color: "#006cd8",
                  border: "1px solid rgba(255,255,255,0.08)",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Tamil">Tamil</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  marginBottom: 10,
                  display: "block",
                }}
              >
                Content Length
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 10,
                }}
              >
                {LENGTHS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLength(l.id as any)}
                    className={`length-btn ${length === l.id ? "active" : ""}`}
                    style={{
                      background:
                        length === l.id
                          ? "rgba(139,92,246,0.15)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${length === l.id ? "#8b5cf6" : "transparent"}`,
                      padding: "10px",
                      borderRadius: "10px",
                      color: length === l.id ? "#a78bfa" : "#94a3b8",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: "1.1rem" }}>{l.icon}</div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      {l.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={loading}
              className={loading ? "shimmer" : "glow-pulse"}
              style={{
                background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                color: "white",
                borderRadius: 12,
                height: 54,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              {loading ? "Generating..." : "✦ Generate Content"}
            </motion.button>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            className="glass-card"
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              minHeight: 520,
            }}
          >
            <AnimatePresence mode="wait">
              {!loading && !result && (
                <motion.div
                  key="empty"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="float" style={{ fontSize: "4rem" }}>
                    ✦
                  </div>
                  <h3 style={{ color: "#f8fafc", marginBottom: 8 }}>
                    Your content will appear here
                  </h3>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {[80, 60, 100, 75, 90, 45].map((w, i) => (
                    <div
                      key={i}
                      className="shimmer"
                      style={{ height: 14, width: `${w}%`, borderRadius: 7 }}
                    />
                  ))}
                </motion.div>
              )}

              {!loading && result && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: "1rem",
                  }}
                >
                  <div
                    ref={outputRef}
                    className="pdf-content-wrapper"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex", gap: 8 }}>
                        <span
                          style={{
                            background: "#8b5cf6",
                            color: "white",
                            borderRadius: 9999,
                            padding: "3px 12px",
                            fontSize: "0.75rem",
                          }}
                        >
                          {result.tone}
                        </span>
                        <span
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "#94a3b8",
                            borderRadius: 9999,
                            padding: "3px 12px",
                            fontSize: "0.75rem",
                          }}
                        >
                          ~{result.wordCount} words
                        </span>
                        {/*  ADDED - Language badge */}
                        <span
                          style={{
                            background: "rgba(6,182,212,0.12)",
                            color: "#22d3ee",
                            borderRadius: 9999,
                            padding: "3px 12px",
                            fontSize: "0.75rem",
                            border: "1px solid rgba(6,182,212,0.25)",
                          }}
                        >
                          {language}
                        </span>
                      </div>
                      <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                        📖 {result.readingTime} min read
                      </span>
                    </div>

                    <div
                      className="blog-content"
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        maxHeight: 380,
                        paddingRight: 6,
                        color: "#f8fafc",
                        lineHeight: "1.7",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          renderMarkdown(displayText) +
                          (typing ? '<span class="cursor-blink"></span>' : ""),
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginTop: "auto",
                    }}
                  >
                    <button
                      onClick={handleCopy}
                      style={{
                        background: copied
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(255,255,255,0.05)",
                        color: copied ? "#34d399" : "#94a3b8",
                        padding: "12px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                      }}
                    >
                      {copied ? "✓ Copied" : "⎘ Copy"}
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#94a3b8",
                        padding: "12px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                      }}
                    >
                      📄 Download PDF
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .cursor-blink {
          width: 2px;
          height: 1em;
          background: #8b5cf6;
          display: inline-block;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}