import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // For now, return a simple response
    // You can integrate OpenAI or other LLM here later
    const response = await generateResponse(message)

    // Optionally save chat to database
    // await prisma.chatSession.create({ ... })

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
}

async function generateResponse(userMessage: string): Promise<string> {
  // Simple rule-based responses for now
  // You can integrate OpenAI API here later

  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm Naveen's AI assistant. I can help you learn more about Naveen's work, projects, and experiences. What would you like to know?"
  }

  if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
    return "Naveen works on various projects ranging from web applications to hackathon builds. You can check out the 'Geeks' section to see active projects, or 'Hacks' to explore hackathon projects!"
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email")) {
    return "You can reach Naveen at hello@nvganta.com or connect via social media. Check the footer for all contact links!"
  }

  if (lowerMessage.includes("article") || lowerMessage.includes("blog") || lowerMessage.includes("writing")) {
    return "Naveen writes about technology, web development, and his journey. Check out the 'Thoughts' section for posts and long-form articles!"
  }

  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("stack")) {
    return "Naveen works with modern web technologies including Next.js, React, TypeScript, Node.js, MongoDB, and more. His projects showcase full-stack development expertise!"
  }

  // Default response
  return "That's an interesting question! While I'm still learning, I'd recommend exploring the different sections of this site - Thoughts for articles and posts, Geeks for projects, and Hacks for hackathon builds. Is there something specific you'd like to know?"
}

