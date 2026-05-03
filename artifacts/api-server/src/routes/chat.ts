import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { z } from "zod";

const router: IRouter = Router();

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
});

const SYSTEM_PROMPT = `You are Nitivaani's AI grievance assistant — a sharp, empathetic guide that helps Indian citizens file civic complaints quickly and correctly.

Your job is to conduct a smart, conversational intake to capture:
1. The nature of the grievance (water, roads, electricity, sanitation, noise, corruption, etc.)
2. The specific location (city, ward, locality, landmark if relevant)
3. How long the issue has been ongoing
4. The urgency level
5. The citizen's contact details (name, mobile number, email — optional)

Rules:
- Keep responses concise and warm. No jargon. Plain Indian English.
- Ask ONE question at a time. Never dump multiple questions.
- When you have enough info, summarize the complaint clearly and ask the citizen to confirm before submitting.
- After confirmation, output a JSON block at the end of your message in this exact format (do NOT add any text after it):
  GRIEVANCE_READY:{"department":"<dept>","summary":"<1-2 sentence summary>","location":"<location>","urgency":"<low|medium|high>","contactName":"<name or empty>","contactPhone":"<phone or empty>"}
- Route to the correct department: Municipal Corporation, PWD, BESCOM/MSEDCL/state electricity board, Water Board, Police, Revenue Department, etc.
- Be encouraging. Citizens often feel powerless. Remind them their complaint is being taken seriously.
- If the user writes in Hindi or any Indian language, respond in the same language.
- Never make up information. If unsure about routing, ask a clarifying question.`;

router.post("/chat", async (req, res) => {
  const parsed = ChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { messages } = parsed.data;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (err) {
    req.log.error({ err }, "Chat stream error");
    res.write(`data: ${JSON.stringify({ error: "AI service unavailable. Please try again." })}\n\n`);
  }

  res.end();
});

export default router;
