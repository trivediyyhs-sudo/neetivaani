import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, Loader2, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GrievanceData {
  department: string;
  summary: string;
  location: string;
  urgency: "low" | "medium" | "high";
  contactName: string;
  contactPhone: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Namaste! I'm Nitivaani's AI assistant. I'm here to help you file a civic grievance quickly — your complaint will be routed to the right government department automatically.\n\nTo get started, could you describe the issue you're facing?",
};

const URGENCY_COLORS = {
  low: "text-emerald-600 bg-emerald-50 border-emerald-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  high: "text-red-600 bg-red-50 border-red-200",
};

function parseGrievanceData(content: string): { text: string; data: GrievanceData | null } {
  const marker = "GRIEVANCE_READY:";
  const idx = content.indexOf(marker);
  if (idx === -1) return { text: content, data: null };
  const text = content.slice(0, idx).trim();
  try {
    const data = JSON.parse(content.slice(idx + marker.length).trim()) as GrievanceData;
    return { text, data };
  } catch {
    return { text: content, data: null };
  }
}

export default function Submit() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [grievance, setGrievance] = useState<GrievanceData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(() => `NTV-${Date.now().toString(36).toUpperCase()}`);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus();
  }, [isStreaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMsg]);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const json = JSON.parse(line.slice(6));
            if (json.error) {
              fullContent += `\n\n_${json.error}_`;
            } else if (json.content) {
              fullContent += json.content;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: fullContent };
                return next;
              });
            }
          } catch {}
        }
      }

      const { text: cleanText, data } = parseGrievanceData(fullContent);
      if (data) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: cleanText };
          return next;
        });
        setGrievance(data);
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSubmitGrievance = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setGrievance(null);
    setSubmitted(false);
    setInput("");
  };

  if (submitted && grievance) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-nitivaani-emerald/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-nitivaani-emerald" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Grievance Submitted</h2>
          <p className="text-slate-500 mb-6">Your complaint has been registered and routed to the correct department.</p>

          <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3 mb-8 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Ticket ID</span>
              <span className="font-mono font-bold text-nitivaani-navy text-sm">{ticketId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Department</span>
              <span className="text-sm font-semibold text-slate-800">{grievance.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Urgency</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${URGENCY_COLORS[grievance.urgency]}`}>
                {grievance.urgency}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">Summary</span>
              <p className="text-sm text-slate-700 leading-relaxed">{grievance.summary}</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6">You can track the status of this complaint using your ticket ID. Resolution updates are public on our dashboard.</p>

          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-nitivaani-navy text-white hover:bg-nitivaani-navy/90"
            >
              Go Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/50">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2 ml-2">
            <img src="/nitivaani-logo.png" alt="Nitivaani" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-display font-bold text-nitivaani-navy">Nitivaani</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-nitivaani-emerald animate-pulse"></span>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">AI Agent Active</span>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 container mx-auto px-4 lg:px-8 py-8 max-w-2xl flex flex-col gap-4">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-display font-bold text-slate-900">Submit a Grievance</h1>
          <p className="text-slate-500 text-sm mt-1">Our AI will guide you through the process and route your complaint to the right department.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-nitivaani-navy flex-shrink-0 mr-3 flex items-center justify-center mt-1">
                      <img src="/nitivaani-logo.png" alt="" className="w-5 h-5 object-contain" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-nitivaani-navy text-white rounded-br-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                    {!isUser && i === messages.length - 1 && isStreaming && (
                      <span className="inline-block w-1.5 h-4 bg-slate-400 animate-pulse ml-0.5 align-middle rounded-sm" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Grievance confirmation card */}
          {grievance && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-nitivaani-emerald/30 rounded-2xl p-5 shadow-sm"
            >
              <p className="text-xs font-mono font-bold text-nitivaani-emerald uppercase tracking-widest mb-4">Ready to Submit</p>
              <div className="space-y-2.5 mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-900">{grievance.department}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-900">{grievance.location}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Urgency</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${URGENCY_COLORS[grievance.urgency]}`}>
                    {grievance.urgency}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 text-sm">
                  <span className="text-slate-500 block mb-1">Summary</span>
                  <p className="text-slate-800 leading-relaxed">{grievance.summary}</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 text-sm h-10"
                >
                  Start Over
                </Button>
                <Button
                  onClick={handleSubmitGrievance}
                  className="flex-1 bg-nitivaani-emerald hover:bg-nitivaani-emerald/90 text-white text-sm h-10"
                >
                  Confirm & Submit
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {!grievance && (
          <div className="sticky bottom-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg flex items-end gap-2 p-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your issue… (Press Enter to send)"
                rows={1}
                disabled={isStreaming}
                className="flex-1 resize-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none leading-relaxed max-h-32 py-1"
                style={{ minHeight: "24px" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="w-9 h-9 rounded-xl bg-nitivaani-navy text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-nitivaani-navy/90 transition-all"
              >
                {isStreaming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Your complaint is routed by AI and logged immutably. All data stays within India.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
